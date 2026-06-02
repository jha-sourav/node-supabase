const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const supabase = require('./config/supabase');
const apiRoutes = require('./routes/api');


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Apis are working'
    })
})

module.exports = app;