const router = require('express').Router();
let Listing = require('../models/listing.model');

router.route('/').get((req, res) => {
  // returns all listings as json
  Listing.find()
    .then(listings => res.json(listings)) 
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const owner = req.body.owner;
    const condition = req.body.condition;
    const location = req.body.location;
    const price = req.body.price;
    const category = req.body.category;
    const listingId = req.body.listingId;


    const newListing = new Listing({
      title,
      description,
      owner,
      condition,
      location,
      price,
      category,
      listingId
    });

  newListing.save()
    .then(() => res.data)
    .catch(err => res.status(400).json('Error: ' + err));

    console.log('This is for title: ', newListing.title)

    // new: testing the id print
    console.log('new instantiation of listing, print the id pls...')
    console.log(newListing._id)
    newListing.listingId = newListing._id
    console.log('now i print the saved var...')
    console.log(newListing.listingId)
    res.redirect("/listings/" + newListing.listingId)
  });



// Took the outline from /exercises.js
router.route('/:id').get((req, res) => {
  Listing.findById(req.params.id)
    .then(listing => res.json(listing))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Listing.findByIdAndDelete(req.params.id)
    .then(() => res.json('Listing deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Listing.findById(req.params.id)
    .then(listing => {
      listing.title = req.body.title;
      listing.description = req.body.description;
      listing.owner = req.body.owner;
      listing.condition = req.body.condition;
      listing.location = req.body.location;
      listing.price = req.body.price;
      listing.category = req.body.category;
      listing.date = Date.parse(req.body.date);

      listing.save()
        .then(() => res.json('Listing updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;