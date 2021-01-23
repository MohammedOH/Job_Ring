const express = require('express');
const router = express.Router();
const dbConn = require('../../db');

// Get all jobs
router.get('/', (req, res) => {
  dbConn.query('SELECT * FROM job_offer', (qErr, result, qFields) => {
    if (qErr) {
      return res.json({ message: 'Failed to get all jobs!' });
    }
    res.json({ message: 'All job offers fetched!', result });
  })
});

// Get single job
router.get('/:id', (req, res) => {
  const query = 'SELECT c_id, job_id, job_title, description, video, date_posted, status, (SELECT job_type from job_type AS jt WHERE jt.jt_id = jo.job_type  LIMIT 1) AS job_type, salary, (SELECT COALESCE(JSON_ARRAYAGG((SELECT title FROM skill AS s WHERE s.s_id = js.s_id)), \'[]\') FROM  job_skills AS js WHERE js.job_id = jo.job_id AND js.c_id = jo.c_id) AS job_skills, (SELECT COUNT(*) FROM job_view AS jv WHERE jv.c_id = jo.c_id AND jv.job_id = jo.job_id) AS job_views FROM job_offer AS jo WHERE job_id = 1 ORDER BY date_posted desc, job_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      res.status(400).json({ message: `Failed to get job with the id {${req.params.id}}!` });
    } else {
      result[0].job_skills = JSON.parse(Buffer.from(result[0].job_skills).toString());
      res.json({ message: `Job offer with the id {${req.params.id}}`, result });
    }
  })
});

// Create job
router.post('/', (req, res) => {
  const newJobOffer = {
    ...req.body,
  };

  if (!newJobOffer.companyId) {
    return res.status(400).json({ message: 'Please include a company id to the job offer' });
  } else if (!newJobOffer.jobTitle) {
    return res.status(400).json({ message: 'Please include a job title to the job offer' });
  } else if (!newJobOffer.description) {
    return res.status(400).json({ message: 'Please include a job description to the job offer' });
  } else if (!newJobOffer.jobType) {
    return res.status(400).json({ message: 'Please include a job status to the job offer' });
  } else if (!newJobOffer.salary) {
    return res.status(400).json({ message: 'Please include a salary to the job offer' });
  }

  const sql = "INSERT INTO job_offer (c_id, job_title, description, video, date_posted, status, job_type, salary) VALUES (?, ?, ?, ?, now(), ?, ?, ?)";
  dbConn.query(sql, [newJobOffer.companyId, newJobOffer.jobTitle, newJobOffer.jobDescription, newJobOffer.jobVideo, newJobOffer.jobStatus, newJobOffer.jobType, newJobOffer.jobSalary], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error adding job offer!' });
    }
    res.json({ message: `Job with the id ${result.insertId} was inserted!`, newJobOffer });
    // res.redirect('/');
  });
});

// Update job offer
router.put('/:id', (req, res) => {
  const newJobOffer = {
    jobId: req.params.id,
    ...req.body,
  };

  if (!newJobOffer.jobTitle) {
    return res.status(400).json({ message: 'Please include a job title to the job offer' });
  } else if (!newJobOffer.description) {
    return res.status(400).json({ message: 'Please include a job description to the job offer' });
  } else if (!newJobOffer.jobType) {
    return res.status(400).json({ message: 'Please include a job status to the job offer' });
  } else if (!newJobOffer.salary) {
    return res.status(400).json({ message: 'Please include a salary to the job offer' });
  }

  const sql = "UPDATE job_offer SET job_title = ?, description = ?, video = ?, status = ?, job_type = ?, salary = ? WHERE job_id = ?;";

  dbConn.query(sql, [newJobOffer.jobTitle, newJobOffer.jobDescription, newJobOffer.jobVideo, newJobOffer.jobStatus, newJobOffer.jobType, newJobOffer.jobSalary, newJobOffer.jobId], (err, result) => {
    if (err) {
      return res.status(400).json({ message: `Error updating job offer with id ${newJobOffer.jobId}!` });
    }
    res.json({ message: `Job with the id ${newJobOffer.jobId} was updated!`, newJobOffer });
  });
});

// Delete job offer
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM job_offer where job_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      return res.status(400).json({ message: `Failed to delete job with the id {${req.params.id}}!` });
    }
    res.json({ message: `Job offer with the id {${req.params.id}} was deleted successfully!`, result });
  })
});

// Get job page
router.get('/page/:page', (req, res) => {
  dbConn.query(`SELECT c_id, job_id, job_title, description, video, date_posted, status, (SELECT job_type from job_type AS jt WHERE jt.jt_id = jo.job_type  LIMIT 1) AS job_type, salary, (SELECT COALESCE(JSON_ARRAYAGG((SELECT title FROM skill AS s WHERE s.s_id = js.s_id)), '[]') FROM  job_skills AS js WHERE js.job_id = jo.job_id AND js.c_id = jo.c_id) AS job_skills, (SELECT COUNT(*) FROM job_view AS jv WHERE jv.c_id = jo.c_id AND jv.job_id = jo.job_id) AS job_views FROM job_offer AS jo ORDER BY date_posted desc, job_id LIMIT 5 OFFSET ?;`, [req.params.page * 5], (qErr, result, qFields) => {
    if (qErr)
      return res.status(400).json({ message: `Failed to get page number ${req.params.page}!` });

    if (!result || result.length == 0)
      return res.status(400).json({ message: `Page ${req.params.page} is empty!` });

    for (let i in result) {
      result[i].job_skills = JSON.parse(Buffer.from(result[i].job_skills).toString());
    }

    res.json({ message: `Job offers page {${req.params.page}} fetched!`, result });
  })
});

module.exports = router;
