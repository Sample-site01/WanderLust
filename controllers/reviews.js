
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const mongoose=require("mongoose");

module.exports.createReview=async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        
        // Ensure the listing actually exists before pushing a review
        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        let newReview = new Review(req.body.review);
        newReview.author = req.user._id; // Set the author of the review to the current user
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        
    req.flash("success", "New Review created!");

       res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
module.exports.deleteReview=async(req,res)=>{
  let{id,reviewId}=req.params;

 

  await Listing.findByIdAndUpdate(id,{$pull: {reviews: new mongoose.Types.ObjectId(reviewId)}});
  await Review.findByIdAndDelete(reviewId);
  
    req.flash("success", "Review deleted!");
res.redirect(`/listings/${id}`);
};





