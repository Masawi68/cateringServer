const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
  
app.post('/submit-contact', async (req, res) => {
    const formData = req.body;
    const query =
      'INSERT INTO contact_us (first_name, last_name, email, phone_number, message) VALUES ($1, $2, $3, $4, $5)';
    const values = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone, 
      formData.message,
    ];
    
  try {
    await pool.query(query, values);
    res.json({
      success: true,
      message: 'Form data submitted successfully',
    });
  } catch (error) {
    console.error('Error executing query', error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
  }
}); 


app.post('/submit-getintouch', async (req, res) => {
  console.log('Received data:', req.body)
  const formData = req.body;
  const query =
    'INSERT INTO getintouch (first_name, last_name, email, phone_number, message) VALUES ($1, $2, $3, $4, $5)';
  const values = [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phone, 
    formData.message,
  ];
  
try {
  await pool.query(query, values);
  res.json({
    success: true,
    message: 'Form data submitted successfully',
  });
} catch (error) {
  console.error('Error executing query', error);
  res
    .status(500)
    .json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
}
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  