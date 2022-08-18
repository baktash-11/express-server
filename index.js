const express = require('express');
const path = require('path');
const fileUpolad = require('express-fileupload');
const mongoose = require('mongoose');
const _model = require('./models/NewModel');

const app = express();

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpolad());

app.use(express.static('public'))
app.get('/', (erq, res)=>{
    // res.send('Hello world')
    // res.sendFile(path.resolve(__dirname, './views/index.html'));
    res.render('index')
});

// saving the image in public folder
app.post('/posts/save', (req, res)=>{
    console.log(req.body);
    console.log(req.files);
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/imgs', image.name="new.png"), async(error)=>{
        // await _model.create(req.body);

        //saving image in database 
        await _model.create({...req.body, image:'/imgs'+ image.name});
        res.redirect('/');
    });
});


// app.post('/posts/save', (req, res)=>{
//     console.log(req.body);
//     _model.create(req.body);
//     res.redirect('/');
// });


app.listen(4000, ()=>console.log(`http://localhost:4000`));