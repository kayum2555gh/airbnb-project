const Listing= require("../models/listing");
const Review= require("../models/review");

module.exports.createReview = async(req,res)=>{

    let listing = await Listing.findById(req.params.id);
    // console.log(req.params.id);
    // console.log(listing)
    let newReview = new Review(req.body.review);
    // console.log(newReview);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New added");

    
    res.redirect(`/listings/${listing._id}`);
    // res.send("new revies save");
}


module.exports.destroyReview=async (req,res)=>{
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Listing deleted");
    
    res.redirect(`/listings/${id}`);

}