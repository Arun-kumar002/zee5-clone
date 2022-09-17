import express from 'express';
import productSchema from "../../Model/Auth";


let route=express.Router()

route.get('/create-movie',(req,res)=>{
    res.render('movies/movies')
})

//fetch data from db
route.get('/allmovies',async (req,res)=>{
    let allmovies= await productSchema.find({}).lean();
    res.render('movies/allmovies',{allmovies})
})


//fetch data from db end

//update movie dynamically
route.get('/update/:id',async(req,res)=>{
    let updatemovie= await productSchema.findOne({_id:req.params.id}).lean();
     res.render('movies/update-movie',{updatemovie})
});
//update 


route.post('/create-movie', async (req,res)=>{
    // console.log(req.body)
    let {title,year,url,category,language,generes,Rating,casting,certificate}=req.body;
    console.log(req.body);
    let payload={title,year,url,category,language,generes,Rating,casting,certificate};
    let data=await new productSchema(payload).save()
    console.log(data);
    res.end('ok movie list created')
    console.log('db created');
})

//update redirect

route.put('/update/:id', async(req,res)=>{
    await productSchema.updateOne({_id:req.params.id},{$set:req.body});
    res.redirect('/movies/allmovies',301,{})
})

//update movie dynamically
route.delete('/:id', async(req,res)=>{
    await productSchema.deleteOne({_id:req.params.id});
    res.redirect('/movies/allmovies',301,{})
})

//movie collection starts here
import CollectionSchema from '../../Model/Collection_Auth';

route.get('/collection',(req,res)=>{
    res.render('movies/collectionMovie')
})
route.post('/collection',async(req,res)=>{
    let {url,title}=req.body;
    let payload={url,title};
    await new CollectionSchema(payload).save()
    console.log('upload db finished');
    res.end('ok collection created')

})


//movie collection ends here
export default route;
