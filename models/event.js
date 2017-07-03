var mongoose=require("mongoose");

var eventSchema=new mongoose.Schema({
    name:String,
    description:String,
    activity:String,
    people:Number,
    lng: Number,
    lat: Number,
    icon: String,
    time: String,
    street: String
});

module.exports=mongoose.model('Event',eventSchema);
