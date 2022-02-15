// utilities for loading firebase cloud firestore database.
const admin = require("firebase-admin");
const serviceAccount = require("../permissions.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://try-studio-274003.firebaseio.com",
  });
const db = admin.firestore();

module.exports.db = db;