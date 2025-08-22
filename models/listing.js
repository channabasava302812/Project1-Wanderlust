const mongoose = require("mongoose");
const Review = require("./review.js");
const { listingSchema } = require("../schema");
const { string, required } = require("joi");
const schema = mongoose.Schema;

const newSchema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
       type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

newSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("listing",newSchema);
module.exports = Listing;
