require('dotenv').config();
const mongoose = require('mongoose');

const dbState =[{
    value : 0,
    label : "Disconnected"
},{
    value : 1,
    label : "Connected"
},{
    value : 2,
    label : "Connecting"
},{
    value : 3,
    label : "Disconnecting"
}]

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const state = Number(mongoose.connection.readyState);
    console.log(`MongoDB is ${dbState.find(e => e.value === state).label}`);
}

module.exports = connectDB;