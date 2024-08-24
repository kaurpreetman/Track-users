const mongoose=require('mongoose');
mongoose.connect(`mongodb://localhost:27017/testapp`);

const userScheme=new mongoose.Schema({
    name:String,
    email:String,
    image:String
})

module.exports=mongoose.model('user',userScheme);