const express=require('express');
const app=express();

const userModel=require("./models/userModel");

const path=require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.render("index");
});
app.get("/edit/:id",async (req,res)=>{
    let user=await userModel.findOne({_id:req.params.id});
    res.render("edit",{user});
})
app.get('/read', async (req, res) => {
    let users=await userModel.find();
    res.render("read",{users})
});

app.get('/delete/:id', async (req, res) => {
    let user=await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
});
app.post('/create', async (req, res) => {
    let {name,email,image}=req.body;
    const user = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read");
});
app.post('/update/:id',async (req,res)=>{
    let {name,email,image}=req.body;
    let user=await userModel.findOneAndUpdate({_id:req.params.id},{image,email,name},{new:true});
   res.redirect("/read");

})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});