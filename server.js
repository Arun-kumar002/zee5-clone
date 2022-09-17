import mongoose  from "mongoose";
import express  from "express";
import {port,mongoUrl} from './config/index';
import MoviesRoute from './routes/auth/movies';
import {engine} from 'express-handlebars';
import methodOverride from 'method-override';
import CollectionSchema from '../zee5/Model/Collection_Auth';


const app=express()

//set viewengines
app.engine('handlebars',engine())
app.set('view engine','handlebars')

app.use(express.urlencoded())
//method override
app.use(methodOverride("_method"))
//ends here

//dbconnecion
let dbconnect=async ()=>{
    try
    {
      await mongoose.connect(mongoUrl)
        console.log('db connected');
    }catch(err){
        console.log(err);
    }
}
//static
app.use(express.static(__dirname+'/public'))

//router connection mount
app.get('/', async (req,res)=>{
    let collectionMovies= await CollectionSchema.find({}).lean();
    console.log(collectionMovies);
    res.render('home',{collectionMovies})
    // res.render('home')
})

//mount routes
app.use('/movies',MoviesRoute)



//port listen
app.listen(port,err=>{
    if(err) throw err;
    console.log('port no 5000');
})
dbconnect()