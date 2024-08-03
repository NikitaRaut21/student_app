import express from 'express';
import mongoose from 'mongoose'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//connect mongodb

const connectDB=async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    if(conn){
        console.log(`mongodb connected sucessfully✅`);
    }
   
};
connectDB();

//schema
const schemaData = mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamps:true
})
const userModel=mongoose.model("user",schemaData)


//read
app.get('/',async(req,res)=>{
    const data = await userModel.find({})
    res.json({
        success:true,data:data

    })
})
//create data
app.post("/create", async(req,res)=>{
console.log(req.body)
const data = new userModel(req.body)
await data.save()
res.send({
    success:true,
    message:"data saved successfully",
    data:data
})
})
//update data 
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { _id,...rest}=req.body
    console.log(rest)
    const data=await userModel.updateOne({_id:_id},rest)
    res.send({
        success:true,
        message:"data updated sucessfully",
        data:data
    })
})

//delete data
app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id
    console.log(id)
    const data= await userModel.deleteOne({_id:id})
    res.send({
        success:true,
        message:"data deleted successfully",
        data:data
    })

})

const PORT = process.env.PORT ||5000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
