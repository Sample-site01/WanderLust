const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedin, isOwner, validateListing} = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});
router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    isloggedin,
      upload.single('listing[image][url]'),
    validateListing,
  
    wrapAsync(listingsController.createListing),
  );
  

// //  //New Route
router.get("/new", isloggedin, listingsController.renderNewform);

router
  .route("/:id")
  .get(wrapAsync(listingsController.showListings))
  .put(
    isloggedin,
    isOwner,
     upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingsController.updateListing),
  )
  .delete(isloggedin, isOwner, wrapAsync(listingsController.destroylisting));

//edit route
router.get(
  "/:id/edit",
  isloggedin,
  isOwner,
  wrapAsync(listingsController.renderEditForm),
);

module.exports = router;
