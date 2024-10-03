const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')





//setting up database 
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,

})

//checking database connection setup
db.connect((err)=>{
    if(err){
        console.log("Error connecting to DB", threadId)
    }
    console.log(`Backend running on port: ${port} and id: ${db.threadId}`)
   
})


const app = express()
app.use(express.json());
dotenv.config();

app.set('view engine', 'ejs')
app.set('views', __dirname +'/views')



// question 1
// all patients endpoint
app.get('/patient', (req, res)=>{
    db.query('SELECT * FROM patients', (err, results)=>{
        if (err){
            console.error(err)
            res.status(500).send('Error populating data from DB')
        }else{
            res.render('patients', {results:results})
        }
    });
});

//question 2
//patient's by first name
app.get('/patient/firstname', (req, res)=>{
    db.query('SELECT first_name FROM patients', (err, results)=>{
        if (err){
            console.error(err)
            res.status(500).send('Error populating data from DB')
        }else{
            res.render('patients_firstName', {results:results})
        }
    });
});

//question 3
//provider's endpoint
app.get('/provider', (req, res)=>{
    db.query('SELECT * FROM providers', (err, results)=>{
        if(err){
            console.error(err)
            res.status(500).send(("Error retrieving provider's details"))
        }else{
            res.render('providers', {results:results})
        }
    });
});

// question 4
//provider's specialty endpoint
app.get('/provider/specialty', (req,res)=>{
    db.query('SELECT provider_specialty FROM providers', (err, results)=>{
        if (err){
            console.error(err)
            res.status(500).send('Error retrieving provider data')
        }else{
            res.render('providers_specialty', {results:results})
            
        }
    });
});


const port = 3000
app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`)
    console.log('Sending to browser...')
})