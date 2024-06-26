const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    img:{

        url: String,
        filename:String,
    },
    price:{
        type:Number, 
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry:{
        type:{
            type: String,
            enum: ['Point'],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    },
    // category:{
    //     type:String,
    //     enum:["mountains","snowflake","farms"]
    // }
});



listingSchema.post("findOneAndDelete", async(LListing) =>{
    if(LListing){
        await Review.deleteMany({ _id : {$in: LListing.review}})
    }
    
})

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;