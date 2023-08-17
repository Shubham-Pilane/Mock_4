const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const {connection}=require("./db")
const {TravelModel}=require("./models/travelModel")
const app=express()
app.use(express.json())

//post data req
app.post("/adddata",async(req,res)=>{
  const{name,email,destination,travelers,budget}=req.body;
 try {
   const newTravel=new TravelModel({
    name,
    email,
    destination,
    travelers,
    budget,
   })
   await newTravel.save()
   res.status(201).json(newTravel)
 } catch (error) {
  res.status(400).json({msg: "Falied to add the data"})
 }
})
 
//get the data
app.get("/",async(req,res)=>{
  try {
    const data= await TravelModel.find()
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({msg: "Falied to get the data"})
  }
})

//delete the data
app.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params
  try {
  await TravelModel.findByIdAndDelete(id)
    res.status(201).json({msg : "Data sucessfully deleted"})
  } catch (error) {
    res.status(400).json({msg:error.message})
  }
})

//filter the data
app.get("/filterdata",async(req,res)=>{
  const{destination}=req.query
  // console.log(destination)
  try {
    const data= await TravelModel.find({destination})
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({msg: "Falied to get FilterData !"})
  }
})

//sort the data

app.get("/sortdata",async(req,res)=>{
  try {
    const data= await TravelModel.find().sort({budget:1})
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({msg: "Falied to get SortedData !"})
  }
})



const port=process.env.port

app.listen(port,async()=>{
  try {
     await connection
     console.log("connected to Database !")
  } catch (error) {
    console.log(error)
  }
  console.log(`Server runnning on port ${port}`)
})