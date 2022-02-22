const express = require("express");
let Details = require("./details.model");
const bodyParser = require("body-parser");

var cors = require("cors");

const app = express();

const port = 4000;

const mongoose = require("mongoose");
const config = require("./DB.js");
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(cors());

app.get("/", (req, res) => {
  Details.find((err, detail) => {
    if (err) {
      console.log(err);
    } else {
      res.json(detail);
    }
  });
});

app.post(`/createMerchant/:details`, (req, res) => {
  let details = new Details(JSON.parse(req.params.details));
  details.save();
  res.send("submited sucessfully");
});

app.get("/expandMerchantPageLoad/:_id", (req, res) => {
  Details.findById(req.params._id, function (err, detail) {
    res.json(detail);
  });
});

app.post(`/deleteMerchant/:id`, (req, res) => {
  Details.findByIdAndRemove({ _id: req.params.id }, function (err, detail) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

app.get("/selectedRowDetails/:_id", (req, res) => {
  Details.findById(req.params._id, function (err, detail) {
    res.json(detail);
  });
});

app.post(`/updateMerchant/:updateDetails/:id`, (req, res) => {
  let selectedRowDetails = JSON.parse(req.params.updateDetails);
  Details.findById(req.params.id, function (err, detail) {
    if (!detail) res.status(404).send("data is not found");
    else {
      detail.userName = selectedRowDetails.userName;
      detail.email = selectedRowDetails.email;
      detail.phoneNumber = selectedRowDetails.phoneNumber;
      detail.website = selectedRowDetails.website;
      detail.contactName = selectedRowDetails.contactName;
      detail.contactPhone = selectedRowDetails.contactPhone;
      detail.contactEmail = selectedRowDetails.contactEmail;
      detail.notes = selectedRowDetails.notes;
      detail.typeOfBusiness = selectedRowDetails.typeOfBusiness;
      detail.catageryOfBusiness = selectedRowDetails.catageryOfBusiness;
      detail.comissionPercentage = selectedRowDetails.comissionPercentage;
      detail.activeFrom = selectedRowDetails.activeFrom;
      detail.criticalAccount = selectedRowDetails.criticalAccount;
      detail.paymentOption = selectedRowDetails.paymentOption;

      detail.save();
      res.send("updated sucessfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
