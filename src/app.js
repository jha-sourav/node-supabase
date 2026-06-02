const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const supabase = require('./config/supabase');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    const { data,error } = supabase.from('users').select('*');
    if (error) {
        console.log('❌ Error:', error.message);
        res.json({
            success: false,
            message: 'Error: ' + error.message
        })
    } else {
        console.log('Supabase Connected!');
        console.log(data)
        res.json({
            success: true,
            message: 'Supabase Connected'
        })
    }
})

module.exports = app;