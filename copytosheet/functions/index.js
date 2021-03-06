"use strict";

const functions = require("firebase-functions");

// Firebase Admin initialization
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dormsecurity.firebaseio.com"
});

// Get Google Sheets instance
const { google } = require("googleapis");
const sheets = google.sheets("v4");

// Create JWT
const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"] // read and write sheets
});

// Get data from RTDB

exports.copyToSheet = functions.database.ref("/studentbook").onUpdate((change, context) => {
  let data = change.after.val();
  console.log(data)
  // Convert JSON to Array following structure below
  /* 
  [
    ['COL-A', 'COL-B', 'COL-C', 'COL-D', 'COL-E']
  ]
  */

  var valueArray = []
  Object.keys(data).forEach(key => {
    let item = data[key]
    valueArray.push([null, item.name, item.stuid, item.room, item.status, item.time]);
  });

  let maxRange = valueArray.length + 1;

  // Do authorization
  jwtClient.authorize();

  // Create Google Sheets request
  let request = {
    auth: jwtClient,
    spreadsheetId: "1u9g5P4Q8sCsAAANk2cIzLP75rrESv5QqpVeHA1-RWRU",//https://docs.google.com/spreadsheets/d/{yyyyy}/
    range: "History!A2:F" + maxRange,
    valueInputOption: "RAW",
    requestBody: {
      values: valueArray
    }
  };

  // Update data to Google Sheets
  sheets.spreadsheets.values.update(request, {});
});
