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
  const query = 'SELECT * FROM job_offer where job_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      res.status(400).json({ message: `Failed to get job with the id {${req.params.id}}!` });
    } else {
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

module.exports = router;
