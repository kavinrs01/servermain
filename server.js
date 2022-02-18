const express = require("express");
var mongo = require("mongodb");
var cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const port = 4000;

app.use(cors());

let detailsInServer = [];
let selectedKeyValue;
let selectedRowDetails;
let selectedIndexValue;
let isEditing;

app.get("/", (req, res) => {
  res.send(JSON.stringify(detailsInServer));
});

app.post(`/createMerchant/:details`, (req, res) => {
  detailsInServer.push(JSON.parse(req.params.details));
  res.send("Hello Kavin!");
});

app.post(`/expandMerchant/:key`, (req, res) => {
  selectedKeyValue = JSON.parse(req.params.key);
  selectedRowDetails = detailsInServer?.find(
    (detail) => detail.key === selectedKeyValue
  );
  selectedIndexValue = detailsInServer.indexOf(selectedRowDetails);

  res.send("Hello Kavin!");
});

app.get("/expandMerchantPageLoad", (req, res) => {
  res.send(JSON.stringify(selectedRowDetails));
});

app.post(`/deleteMerchant`, (req, res) => {
  detailsInServer.splice(selectedIndexValue, 1);

  res.send("Hello Kavin!");
});

app.post(`/editMerchant`, (req, res) => {
  isEditing = true;

  res.send("Hello Kavin!");
});

app.get("/editMerchantPageLoad", (req, res) => {
  res.send(JSON.stringify(isEditing));
});

app.get("/selectedRowDetails", (req, res) => {
  res.send(JSON.stringify(selectedRowDetails));
});

app.post(`/updateMerchant/:updateDetails`, (req, res) => {
  detailsInServer[selectedIndexValue]= (JSON.parse(req.params.updateDetails));
isEditing=false
  res.send("Hello Kavin!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
