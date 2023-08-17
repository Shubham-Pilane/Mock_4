const mongoose=require("mongoose")

const travelSchema=mongoose.Schema({
   name:String,
   email:String,
   destination : String,
   travelers:Number,
   budget :Number

})
// {
//     "name":"Shubham",
//     "email": "abc@123",
//     "destination":"mumbai",
//     "travelers":50,
//     "budget":50000
// }
const TravelModel=mongoose.model("travel",travelSchema)

module.exports={
    TravelModel
}


