const express = require('express');
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Questin = require('./models/Question');



const app = express();
// body parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handlebars Middelware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Index Route
app.get('/', (req, res) => {
    res.render('index');
});
// get all Questions
app.get('/quiz', (req, res) => {
    Questin.find({})
        .then(questins => {
            res.render('quiz', {
                questins: questins
            });
        })
});
var score = 0;
app.post('/quiz/:id', (req, res) => {
    Questin.findOne({_id: req.params.id})
        .then(questin => {
            if(req.body.answer == questin.answer ){
                score++;
            }
            res.redirect('/quiz');
        });
});
//finish the Quis
app.get('/finish', (req, res)=> {
    res.send("Your score is " + score)
});
//finish the course
app.get('/again', (req, res)=> {
    score = 0;
    res.redirect('/quiz');
});


// Map mongodb to use global promise -- get rid of warning 
mongoose.Promise = global.Promise; 
//connect to mongoose
mongoose.connect('mongodb://localhost/Quiz',{
    useMongoClient: true
})
 .then(() =>  {console.log('MongoDB connected..')})
 .catch((err) => {console.log(err)});


//set the port 
const port = process.env.port || 3000;
app.listen(port,() => {
    console.log(`app is listing on port ${port}`);
});