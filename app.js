var express = require('express');
var helmet = require('helmet');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var path = require('path');
var app = express();


app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(helmet.contentSecurityPolicy({
//     directives:
//     {
//         defaultSrc : ['self'],
//         styleSrc: ['style.com']
//     }
// } 
// ));
// app.use(helmet.ieNoOpen());
// app.use(helmet.hsts({ force: True}));
// app.use(helmet.dnsPrefetchControl());

app.get('/',function(req,res){
    res.render('contact.ejs');
})

app.post('/send',function(req,res){
    const message = req.body.message;
    console.log(req.body);
    async function main() {
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: 'supernicky659@gmail.com', 
            pass: '9438002199Ni.',
        },
        });
        let info = await transporter.sendMail({
        from: '"From Nikhil using node" supernicky659@gmail.com',
        to: req.body.email,
        subject: "Hello", 
        text: "Hello world", 
        html: message,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.redirect('contact');
    }
    main().catch(console.error);
})

app.listen('3000',function(){
    console.log("Server started on port 3000")
});