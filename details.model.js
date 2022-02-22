const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Details = new Schema({
    userName: { type: String },
    email: { type: String },
    phoneNumber: { type: Number },
    website: { type: String },
    contactName: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    notes: { type: String },
    typeOfBusiness: { type: String },
    catageryOfBusiness: { type: Array },
    comissionPercentage: { type: Number },
    activeFrom: { type: Date },
    criticalAccount: { type: Boolean },
    paymentOption: { type: Array },

}, {
    collection: 'details'
});

module.exports = mongoose.model('Details', Details);