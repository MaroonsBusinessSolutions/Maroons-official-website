const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require ('path');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

//view engine setup

app.engine('handlebars', exphbs());
// app.engine(
//   "exphbs",
//   expressHbs({
//     extname: "exphbs",
//     defaultLayout: "main-layout",
//     layoutsDir: "views/layouts/"
//   })
// );
app.set('view engine', 'handlebars');

//body parser middlewear
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('contact-us',{
      layout: false,
      name: req.body.name,
      quote: req.body.quote
      });
    
});

app.post('/send',(req, res) => {
  // console.log(req.body);
  const output = ` 
  <p> You have a new contact request</p>
  <h3> Contact Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Company: ${req.body.company}</li>
  <li>Email: ${req.body.email}</li>
  <li>Phone: ${req.body.phone}</li>
  <li>Phone: ${req.body.your_message}</li>
  </ul>
  <h3>
  Message
  </h3>
  <p>${req.body.message}</p>
  `;
  async function main() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "kavya2345789@gmail.com", // generated ethereal user
      pass: "jklm3456@@", // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"nodemailer contact" <kavya2345789@gmail.com>', // sender address
    to: "komal.sutar@maroonsb2b.com, aravind.r@maroonsb2b.com, eliteaces1410@gmail.com, gowthamnair@maroonsb2b.com", // list of receivers
    subject: "Node contact request", // Subject line
    // text: "Hello world?", // plain text body
    html: output, // html body
  });

  transporter.sendMail(info, (error, info) =>{ 
    if(error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent!!'})
  });
  }
  main().catch(console.error);

});

app.listen(3000, () => 
console.log('Server running on port no 3000'));

  
module.exports = app;