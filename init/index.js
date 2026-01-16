const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const { init } = require('../models/user.js');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(() =>{
    console.log('connected to db');
})
.catch((err) =>{
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB = async () =>{
    await Listing.deleteMany({});
    // console.log(initData.data[0].image);
    initData.data = initData.data.map((obj) =>({
        ...obj,
        owner:"695df33ee6f41b70161dece4"
    }))
    await Listing.insertMany(initData.data);
    console.log('data was intialised')
}

initDB();