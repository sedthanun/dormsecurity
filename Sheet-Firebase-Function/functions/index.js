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
<<<<<<< HEAD
exports.copyPetrolToSheet = functions.database.ref("/studentbook").onUpdate(async change => {
  let data = change.after.val();
=======
>>>>>>> e68e7bc996d1a46148b76009c13059e009bb64c5

exports.updateToSheet = functions.database.ref("/studentbook/{documentId}").onWrite((change, context) => {
  let data = change.after.val();
  console.log(data)
  // Convert JSON to Array following structure below
  /* 
  [
    ['COL-A', 'COL-B'],
    ['COL-A', 'COL-B']
  ]
  */
<<<<<<< HEAD
  var itemArray = [];
  var valueArray = [];
  Object.keys(data).forEach((key, index) => {
    itemArray.push(key);
    itemArray.push(data[key]);
    valueArray[index] = itemArray;
    itemArray = [];
  });
=======

  var valueArray = [[null, data.name, data.room, data.stuid, data.status, data.time]];
  var countArray = []
  countArray.push(valueArray)
  console.log(valueArray);

>>>>>>> e68e7bc996d1a46148b76009c13059e009bb64c5

  let maxRange = valueArray.length + 1;

  // Do authorization
<<<<<<< HEAD
  await jwtClient.authorize();
  
  // Create Google Sheets request
  let request = {
    auth: jwtClient,
    spreadsheetId: "1u9g5P4Q8sCsAAANk2cIzLP75rrESv5QqpVeHA1-RWRU",
    range: "Petrol!A2:B" + maxRange,
=======
  jwtClient.authorize();

  // Create Google Sheets request
  let request = {
    auth: jwtClient,
    spreadsheetId: "1u9g5P4Q8sCsAAANk2cIzLP75rrESv5QqpVeHA1-RWRU",//https://docs.google.com/spreadsheets/d/{yyyyy}/
    range: "Petrol!A2:F" + maxRange,
>>>>>>> e68e7bc996d1a46148b76009c13059e009bb64c5
    valueInputOption: "RAW",
    
    requestBody: {
      values: valueArray
    }
  };

  // Update data to Google Sheets
<<<<<<< HEAD
  await sheets.spreadsheets.values.update(request, {});
});
=======
  sheets.spreadsheets.values.append(request, {});
});
>>>>>>> e68e7bc996d1a46148b76009c13059e009bb64c5
