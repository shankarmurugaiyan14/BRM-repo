const express = require('express');
const router = express.Router();
const db = require('./db');


//  // First: Get CustomerID based on customerName
//   const lookupSql ='SELECT CustomerID FROM customerdet WHERE CompanyName = ? LIMIT 1';
//   db.query(lookupSql, [customerName], (err, result) => {
//     if (err) return res.status(500).send(err);
//     if (result.length === 0) return res.status(404).send("Customer not found");

//     const customerId = result[0].CustomerID;


// GET ALL ORDERS
router.get('/ordersroute',(req,res) => {
  db.query(' SELECT ord.orderId, cus.CompanyName AS customerName, ord.product, ord.quantity, ord.price FROM orderdetails ord ' +
           ' INNER JOIN customerdet cus ON cus.customerId=ord.customerId ', (err,results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


//SELECT CUSTOMER LIST FOR DROPDOWN
router.get('/customers',(req,res) => {
    db.query('SELECT customerId, CompanyName AS customerName FROM customerdet',(err,results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });




//==============================ADD ORDERS==========================================
router.post('/ordersroute', (req, res) => {
  const { customerName, product, quantity, price } = req.body;

  // First: Get CustomerID based on customerName
    const lookupSql ='SELECT CustomerID FROM customerdet WHERE CompanyName = ? LIMIT 1';
    db.query(lookupSql, [customerName], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("Customer not found");

      const customerId = result[0].CustomerID;
 
  // Then: Insert into orders table
  const insertSql = 'INSERT INTO orderdetails (customerId, product, quantity, price) VALUES (?,?,?,?)';
  db.query(insertSql, [customerId, product, quantity, price], (err2, result) => {
    if (err2) return res.status(500).send(err2);
    res.send('Order created!');
    });
  });
});
//====================================================================================



//============================== UPDATE ORDERS USING ID==============================
router.put('/ordersroute/:id',(req,res) => {
  const {customerName, product, quantity, price} = req.body;

// First: Get CustomerID based on customerName
  const lookupSql ='SELECT CustomerID FROM customerdet WHERE CompanyName = ? LIMIT 1';
  db.query(lookupSql, [customerName], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Customer not found");

    const customerId = result[0].CustomerID;
      
    const updateSql =`UPDATE orderdetails SET customerId=?, product=?, quantity=?, price=?
                WHERE orderId=?`;
    db.query(updateSql,[customerId, product, quantity, price, req.params.id], (err2, result) => {
      if(err2) return res.status(500).send(err2);
      res.send('Order Updated!');
    });
  });
});
//====================================================================================


//============================== DELETE ORDERS USING ID==============================
router.delete('/ordersroute/:id',(req, res) => {
  const sql = 'DELETE FROM orderdetails WHERE orderId=?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Order Deleted!');
  });
});
//====================================================================================



module.exports = router;