//a fresh start at server

const path = require('path');
const express = require ('express');
const fileUpolad = require('express-fileupload');
const user = require('./models/User');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});


const app = express();

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpolad());


app.set('view engine', 'ejs');
app.get('/',(req, res)=>{
    res.send('<a href="/doc">lets get in</a>');
}); 
app.get('/doc', (req, res)=>{
    res.render('my_html');
})

// app.post('/post/user', (req, res)=>{
//     let image = req.files.pic;
//     image.mv(path.resolve(__dirname,'./public/imgs',image.name='profile.png'), async(error )=>{
//         await console.log(req.body);
//         // console.log(req.files);
//         // user.create(req.body);

//     })
//     res.redirect('/');
// })





app.post('/post/user', function(req, res){
    let image = req.files.pic;
    image.mv (path.resolve(__dirname, './public/imgs', image.name='profile.png'), async(error)=>{
        await user.create({... req.body,image:'/imgs/'+image.name});
        
        res.redirect('/doc');
    });
});
app.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
});