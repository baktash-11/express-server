const express = require('express');
const path = require ('path');
const mongoose = require('mongoose');
const fileUpolad = require('express-fileupload');
const User = require('./models/User');

// mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpolad());
app.get('/', (req, res)=>{
    // res.sendFile(path.resolve(__dirname, './views/my_html.html'))
    res.render('my_html')
});


app.post('/post/user', (req, res)=>{
    console.log(req.body);
    // User.create(req.body);
    let img = req.files.pic;
    img.mv(path.resolve(__dirname, 'public/imgs', img.name = 'profile.png'), async(error)=>{
        await User.create({...req.body, pic:'/img'+ img.name});
        
        res.redirect('/');
    });
    // res.sendFile(path.resolve(__dirname, './views/my_html.html'))
});
app.listen(3000);