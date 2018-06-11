const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
//const ejs = require('ejs');
//const engine = require('ejs-mate');


const jade = require('jade');
const nodemailer = require('nodemailer');

const port = 4040;

const app = express();


app.use(express.static(__dirname+'/public'));
//middleware settings
//app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('view engine', 'ejs');




//for logging requests from client side
app.use(logger('dev'));

//for parsing data to the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function (req, res) {
  res.render('index');
})

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/contact', function (req, res) {
  res.render('contact');
})

app.post('/contact/send', function (req, res) {

    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    auth: {
      user: '15103140ashish@gmail.com',
      pass: 'ashish2@jiit'
    }
  });

    const mailOptions = {
    from: '15103140ashish@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

//server listening at port 4040//
app.listen(port, function (err) {
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("server has been started!!");

  }
})