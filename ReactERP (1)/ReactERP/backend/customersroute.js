const express = require('express');
const router = express.Router();
const db = require('./db');

// ADD CUSTOMER
router.post('/customersroute', (req, res) => {
  const { customerID, companyName, address, state, city, mobileNumber, email, fax } = req.body;
  const sql = 'INSERT INTO customerdet (CustomerID,CompanyName,Address,State,City,MobileNo,Email,Fax) VALUES (?,?,?,?,?,?,?, ?)';
  db.query(sql, [customerID, companyName, address, state, city, mobileNumber, email, fax], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Customer created!');
  });
});


// SELECT ALL CUSTOMERS
router.get('/customersroute',(req,res) => {
  db.query('SELECT * FROM customerdet', (err,results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// UPDATE CUSTOMERS USING ID
router.put('/customersroute/:id',(req,res) => {
  const {companyName, address, state, city, mobileNumber, email, fax} = req.body;
  const sql =`UPDATE customerdet SET CompanyName=?, Address=?, State=?, City=?, MobileNo=?, email=?, fax=?
              WHERE CustomerID=?`;
  db.query(sql,[companyName, address, state, city, mobileNumber, email, fax, req.params.id], (err, result) => {
    if(err) return res.status(500).send(err);
    res.send('Customer Updated!');
  });
});


// DELETE CUSTOMER USING ID
router.delete('/customersroute/:id',(req, res) => {
  const sql = 'DELETE FROM customerdet WHERE CustomerID=?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Customer Deleted!');
  });
});

module.exports = router;