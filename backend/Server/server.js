const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./router/user.route');
const contactRoutes = require('./router/contact.route');
const Port = 3000;

const app = express();
connectDB(); 
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/contact', contactRoutes);

app.listen(Port, () => {
    console.log(`Server Started On - http://localhost:${Port}`);
});

