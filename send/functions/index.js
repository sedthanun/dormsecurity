const functions = require("firebase-functions");

// Firebase Admin initialization
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dormsecurity.firebaseio.com/"// https://console.firebase.google.com/u/0/project/{xxxxx}/overview
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
exports.copyToSheet = functions.database.ref("/studentbook/{documentId}").onCreate((snapshot, contex) => {
  let data =  snapshot._data;

  // Convert JSON to Array following structure below
  /* 
  [
    ['COL-A', 'COL-B', 'COL-C', 'COL-D', 'COL-E']
  ]
  */
  var valueArray = [[null, data.name, data.room, data.stuid, data.status, data.time]]; 
  var countArray = []
  countArray.push(valueArray)

  
  let maxRange = countArray.length + 1;

  // Do authorization
  jwtClient.authorize();
  
  // Create Google Sheets request
  let request = {
    auth: jwtClient,
    spreadsheetId: "1u9g5P4Q8sCsAAANk2cIzLP75rrESv5QqpVeHA1-RWRU",//https://docs.google.com/spreadsheets/d/{yyyyy}/
    range: "History!B2:F" + maxRange,
    valueInputOption: "RAW",
    requestBody: {
      values: valueArray
    }
  };
  
  // Update data to Google Sheets
  sheets.spreadsheets.values.append(request, {});
});

