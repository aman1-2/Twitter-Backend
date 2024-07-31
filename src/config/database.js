const mongoose = require('mongoose');

const { DB_URL } = require('./serverConfig');

const dbconnect = async () => {
    await mongoose.connect(DB_URL)
    console.log("MongoDB connected Successfully.");
}

module.exports = dbconnect;