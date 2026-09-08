const express = require('express');
const cors = require('cors');
const app = express();
const customerRoutes = require('./customersroute');
const orderRoutes = require('./ordersroute');

app.use(cors());
app.use(express.json());
app.use('/api', customerRoutes);
app.use('/api',orderRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
