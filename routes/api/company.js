const express = require('express');
const router = express.Router();
const dbConn = require('../../db');

// Get all companies
router.get('/', (req, res) => {
  dbConn.query('SELECT * FROM company', (qErr, result, qFields) => {
    if (qErr) {
      return res.json({ message: 'Failed to get all companies!' });
    }
    res.json({ message: 'All companies fetched!', result });
  })
});

// Get single company
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM company where c_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      res.status(400).json({ message: `Failed to get company with the id {${req.params.id}}!` });
    } else {
      res.json({ message: `Company with the id {${req.params.id}}`, result });
    }
  })
});

// Create company
router.post('/', (req, res) => {
  const newCompany = {
    ...req.body,
  };

  if (!newCompany.name) {
    return res.status(400).json({ message: 'Please include a company name' });
  } else if (!newCompany.email) {
    return res.status(400).json({ message: 'Please include a company email' });
  } else if (!newCompany.pass) {
    return res.status(400).json({ message: 'Please include a company password' });
  } else if (!newCompany.country) {
    return res.status(400).json({ message: 'Please include a company country' });
  } else if (!newCompany.city) {
    return res.status(400).json({ message: 'Please include a company city' });
  } else if (!newCompany.phone) {
    return res.status(400).json({ message: 'Please include a company phone number' });
  } else if (!newCompany.details) {
    return res.status(400).json({ message: 'Please include info about the company' });
  }

  const sql = "INSERT INTO company (name, email, pass, country, city, phone, details, video) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  dbConn.query(sql, [newCompany.name, newCompany.email, newCompany.pass, newCompany.country, newCompany.city, newCompany.phone, newCompany.details, newCompany.video], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error adding company!' });
    }
    res.json({ message: `Company with the id ${result.insertId} was inserted!`, newCompany });
    // res.redirect('/');
  });
});

// Update company
router.put('/:id', (req, res) => {
  const newCompany = {
    c_id: req.params.id,
    ...req.body,
  };

  if (!newCompany.name) {
    return res.status(400).json({ message: 'Please include a company name' });
  } else if (!newCompany.email) {
    return res.status(400).json({ message: 'Please include a company email' });
  } else if (!newCompany.pass) {
    return res.status(400).json({ message: 'Please include a company password' });
  } else if (!newCompany.country) {
    return res.status(400).json({ message: 'Please include a company country' });
  } else if (!newCompany.city) {
    return res.status(400).json({ message: 'Please include a company city' });
  } else if (!newCompany.phone) {
    return res.status(400).json({ message: 'Please include a company phone number' });
  } else if (!newCompany.details) {
    return res.status(400).json({ message: 'Please include info about the company' });
  }

  const sql = "UPDATE job_offer SET name = ?, email = ?, pass = ?, country = ?, city = ?, phone = ?, details = ? WHERE job_id = ?;";

  dbConn.query(sql, [newCompany.name, newCompany.email, newCompany.pass, newCompany.country, newCompany.city, newCompany.phone, newCompany.details, newCompany.video, newCompany.c_id], (err, result) => {
    if (err) {
      return res.status(400).json({ message: `Error updating company with id ${newCompany.c_id}!` });
    }
    res.json({ message: `Company with the id ${newCompany.c_id} was updated!`, newCompany });
  });
});

// Delete company
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM company where c_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      return res.status(400).json({ message: `Failed to delete job with the id {${req.params.id}}!` });
    }
    res.json({ message: `Company with the id {${req.params.id}} was deleted successfully!`, result });
  })
});

module.exports = router;
