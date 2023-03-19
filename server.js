const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const { getSystemErrorMap } = require('util');
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , 'public')));


async function sendMail()
{



let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});



let info = await transporter.sendMail({
    from: 'shaharalamo31@gmail.com',
    to: 'piroolostore@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  });

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

console.log("Message sent: %s", info.messageId);


  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}



function saveData(data,file, cate ) {
   
    function ifError(err){
        if(err){
            console.log(err);
            return;
        }
    }

    const jasonData = JSON.stringify(data, null ,2);

    
    if (fs.existsSync(file)) {
    // path exists
    console.log("exists:", file);
    } else {
    console.log("DOES NOT exist:", file);
    fs.writeFile(__dirname + '/' + cate + '/' + file + '.json', jasonData, ifError);
    
    }

}

app.get('/', (req, res) =>{
    res.render('index');
});
app.get('/upload', (req, res) =>{
    res.render('uploadpage');
});
app.post('/article', (req, res) =>{
    let koteret = req.body.koteret;
    let tochen = req.body.article;
    let tmuna = req.body.picture;
    let sug = req.body.category;
    let cotev = req.body.author;
    let taarich = req.body.uploadDate;

    console.log(sug);

     saveData(req.body, koteret, sug )
    
    res.render('article', {koteret, tochen, tmuna, sug, cotev, taarich});
});


app.listen(3000, () => {
    console.log('plugged to port 3000. server is running');
});
