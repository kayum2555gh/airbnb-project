const  express = require("express");
const router  = express.Router();
const Listing = require('../models/listing');

const wrapAsync = require("../utils/wrapAsync");
const { listingSchema} = require("../schema.js");

const ExpressError = require("../utils/ExpressError.js");

const { isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController= require("../controllers/listings.js");
const multer = require("multer");


const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// new
router.get('/new', isLoggedIn,wrapAsync(listingController.renderNewForm));

router
.route('/')
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single("listing[image]"),validateListing,
    
    wrapAsync(listingController.createListing));



router
.route("/:id") 
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner, 
    upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));    


// show route


// edit route
router.get('/:id/edit', isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

// update route


// delete route



// reviews
// post route


module.exports = router;