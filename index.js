const express = require('express');
const server = express();
const {connect} = require('./db');
const bodyParser = require('body-parser');

const portfolioRoutes = require('./routes/portfolios')

// server.get('/test', (req, res) => {     return res.json({message: 'test is
// working!'}); })

// Synchronizes connection to DB and server listening on port
async function runServer() {
    
   await connect();

   server.use(bodyParser.json());
   server.use('/api/v1/portfolios', portfolioRoutes);
   server.use('/api/v1/blogs', require('./routes/blogs'));

   server.get('', (req, res) => {
       res.sendFile('index.html', {root: __dirname})
   })
   
   const PORT = parseInt(process.env.PORT, 10) || 3001;
   server.listen(PORT, (err) => {
       if (err) 
           console.error(err);
       console.log('Server ready on port ', PORT);
   })
}

runServer();


