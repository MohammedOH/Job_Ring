const express = require('express');
const router = express.Router();
const dbConn = require('../../db');

// Get all students by page
router.get('/', (req, res) => {
  dbConn.query('SELECT std_id, std_name, email, country, city, phone, picture, gender, birthdate, cv FROM student', (qErr, result, qFields) => {
    if (qErr) {
      return res.json({ message: 'Failed to get all students!' });
    }
    res.json({ message: 'All students fetched!', result });
  })
});

// Get single job
router.get('/:id', (req, res) => {
  const query = 'SELECT std_id, std_name, email, country, city, phone, picture, gender, birthdate, cv FROM student WHERE std_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      res.status(400).json({ message: `Failed to get student with the id {${req.params.id}}!` });
    } else {
      res.json({ message: `Student with the id {${req.params.id}}`, result });
    }
  })
});

// Create student
router.post('/', (req, res) => {
  const newStudent = {
    ...req.body,
  };

  if (!newStudent.name) {
    return res.status(400).json({ message: 'Please include a student name' });
  } else if (!newStudent.email) {
    return res.status(400).json({ message: 'Please include a student email' });
  } else if (!newStudent.pass) {
    return res.status(400).json({ message: 'Please include a student password' });
  } else if (!newStudent.country) {
    return res.status(400).json({ message: 'Please include a student country' });
  } else if (!newStudent.city) {
    return res.status(400).json({ message: 'Please include a student city' });
  } else if (!newStudent.phone) {
    return res.status(400).json({ message: 'Please include a student phone number' });
  } else if (!newStudent.gender) {
    return res.status(400).json({ message: 'Please include a student gender' });
  } else if (!newStudent.birthdate) {
    return res.status(400).json({ message: 'Please include a student birthdate' });
  }

  const sql = "INSERT INTO student (std_name, email, pass, country, city, phone, picture, gender, birthdate, cv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  dbConn.query(sql, [newStudent.name, newStudent.email, newStudent.pass, newStudent.country, newStudent.city, newStudent.picture, (newStudent.gender.toLowerCase() === 'male') ? 'M' : 'F', newStudent.birthdate, newStudent.cv], (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error adding student!' });
    }
    res.json({ message: `Student with the id ${result.insertId} was inserted!`, newCompany });
    // res.redirect('/');
  });
});

// Update student
router.put('/:id', (req, res) => {
  const newStudent = {
    std_id: req.params.id,
    ...req.body,
  };

  if (!newStudent.name) {
    return res.status(400).json({ message: 'Please include a student name' });
  } else if (!newStudent.email) {
    return res.status(400).json({ message: 'Please include a student email' });
  } else if (!newStudent.pass) {
    return res.status(400).json({ message: 'Please include a student password' });
  } else if (!newStudent.country) {
    return res.status(400).json({ message: 'Please include a student country' });
  } else if (!newStudent.city) {
    return res.status(400).json({ message: 'Please include a student city' });
  } else if (!newStudent.phone) {
    return res.status(400).json({ message: 'Please include a student phone number' });
  } else if (!newStudent.gender) {
    return res.status(400).json({ message: 'Please include a student gender' });
  } else if (!newStudent.birthdate) {
    return res.status(400).json({ message: 'Please include a student birthdate' });
  }

  const sql = "UPDATE student SET name = ?, email = ?, pass = ?, country = ?, city = ?, phone = ?, picture = ?, gender = ?, birthdate = ?, cv = ? WHERE std_id = ?;";

  dbConn.query(sql, [newStudent.name, newStudent.email, newStudent.pass, newStudent.country, newStudent.city, newStudent.phone, newStudent.picture, (newStudent.gender.toLowerCase() === 'male') ? 'M' : 'F', newStudent.birthdate, newStudent.cv, newStudent.std_id], (err, result) => {
    if (err) {
      return res.status(400).json({ message: `Error updating student with id ${newStudent.std_id}!` });
    }
    res.json({ message: `Student with the id ${newStudent.std_id} was updated!`, newStudent });
  });
});

// Delete student
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM student where std_id = ?';

  dbConn.query(query, [req.params.id], (qErr, result, qFields) => {
    if (qErr) {
      return res.status(400).json({ message: `Failed to delete student with the id {${req.params.id}}!` });
    }
    res.json({ message: `Student with the id {${req.params.id}} was deleted successfully!`, result });
  })
});


// Get company page
router.get('/page/:page', (req, res) => {
  dbConn.query(`SELECT std_id, std_name, email, country, city, phone, picture, gender, birthdate, cv FROM student LIMIT 5 OFFSET ?;`, [req.params.page * 5], (qErr, result, qFields) => {
    if (qErr)
      return res.status(400).json({ message: `Failed to get page number ${req.params.page}!` });

    if (!result || result.length == 0)
      return res.status(400).json({ message: `Page ${req.params.page} is empty!` });

    res.json({ message: `Student page {${req.params.page}} fetched!`, result });
  })
});

module.exports = router;
