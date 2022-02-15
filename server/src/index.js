const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const admin = require("firebase-admin");
const db = require("./utils/db").db;
const port = process.env.PORT || 5000;
const validateId = require("./utils/helper").validateId;
const validateBusinessData = require("./utils/helper").validateBusinessData;
const validateLicenseData = require("./utils/helper").validateLicenseData;
const jsonParser = bodyParser.json();

const test = true;

// firebase backend authentication verification: 
// https://github.com/firebase/functions-samples/blob/main/authenticated-json-api/functions/index.js
// const authenticate = async (req, res, next) => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//       res.status(403).send('Unauthorized');
//       return;
//     }
//     const idToken = req.headers.authorization.split('Bearer ')[1];
//     try {
//       const decodedIdToken = await admin.auth().verifyIdToken(idToken);
//       req.user = decodedIdToken;
//       next();
//       return;
//     } catch(e) {
//       res.status(403).send('Unauthorized');
//       return;
//     }
// };

// app.use(authenticate);

app.get('/api/playlist/read', (req, res) => {
    const tokenOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {grant_type: "client_credentials"},
        headers: {
            Authorization: `Basic ${Buffer.from("83b06404a505464ab5e20e4298402d7b:22e65771656a4e759a78dc5c57882eab").toString('base64')}`
        },
    };
    request.post(tokenOptions, (err, httpResponse, body) => {
        const playlistOptions = {
            url: `https://api.spotify.com/v1/playlists/${req.query.playlistId}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(body).access_token}`,
            },
        };
        
        request.get(playlistOptions, (err, httpResponse, body) => {
            return res.status(200).json({name: JSON.parse(body).name, owner: JSON.parse(body).owner.display_name, songs: JSON.parse(body).tracks.items.length});
        });
    });
});

// Create a new playlist
app.post('/api/playlist/create', jsonParser, (req, res) => {
  (async () => {
  try {
    const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
    let err = validateId(uid);
    if (err != "") return res.status(400).send(err);
    const usersDocRef = db.collection('users').doc(uid);
    const usersDoc = await usersDocRef.get();
    let userData = usersDoc.data();
    let spotifyId = req.body.spotifyId;

    const data = {
      count: req.body.count,
      name: req.body.name,
      owner: req.body.owner,
      spotifyId: spotifyId
    };
    
    let playlistId = db.collection("playlists").doc().id;
    // add the playlist to the playlists collection. 
    let docRef = db.collection("playlists").doc(playlistId);
    await docRef.create(data);

    // then add this playlist to the user's doc. 
    userData["playlists"].push(playlistId);
    await usersDocRef.update(userData);
    return res
      .status(200)
      .send(
          `Success! Spotify playlist ${spotifyId} has been added to user ${uid}.`
      );
  } catch (error) {
      console.log(error);
      res.set("Content-Type", "text/plain");
      return res.status(500).send(error);
    }
  })();
});

// Create a new business
app.post("/api/create/business", jsonParser, (req, res) => {
    (async () => {
      try {
        res.set("Content-Type", "text/plain");
        // Check whether the given user id is valid.
        const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
        let err = validateId(uid);
        if (err != "") return res.status(400).send(err);

        const data = {
          country: req.body.country,
          location: req.body.location,
          name: req.body.name,
          size: req.body.size,
          type: req.body.type
        };

        // Check whether the given metadata is valid.
        err = validateBusinessData(data);
        if (err != "") return res.status(400).send(err);

        ///////////////// Create Business /////////////////
        
        let newId = db.collection("businesses").doc().id;
      
        data["id"] = newId; // for convenience of retrieval
        data["licenses"] = [];
        
        let docRef = db.collection("businesses").doc(newId);
        await docRef.create(data);

        ///// Add Business to the user in user database /////
        docRef = db.collection('users').doc(uid);
        const doc = await docRef.get();
        // Check whether the given uid exists in the user database
        if (!doc.exists) {
            return res
            .status(400)
            .send(
                `ERROR! User with id ${uid} does not exist.`
            );
        }
        
        // if the uid does exist, we add this business to this user's businesses.
        let userData = doc.data();
        userData["businesses"].push(newId);
        await docRef.update(userData);
        
        return res
            .status(200)
            .send(
                `Success! Business with id ${data.id} has been added to user ${uid}.`
            );
      } catch (error) {
        console.log(error);
        res.set("Content-Type", "text/plain");
        return res.status(500).send(error);
      }
    })();
});

// Create a new license for a business
app.post("/api/create/license", jsonParser, (req, res) => {
    (async () => {
      try {
        res.set("Content-Type", "text/plain");
        // Check whether the given user id is valid.
        const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
        let err = validateId(uid);
        if (err != "") return res.status(400).send(err);
  
        const data = {
          businessId: req.body.businessId,
          cmo: req.body.cmo,
          price: req.body.price,
          type: req.body.type,
          validity: req.body.validity
        };

        // Check whether the given metadata is valid.
        err = validateLicenseData(data);
        if (err != "") return res.status(400).send(err);

        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        data.date = m + '/' + d + '/' + y;

        ///////////////// Create License /////////////////
        
        let newId = db.collection("licenses").doc().id;
        data.id = newId;
        let docRef = db.collection("licenses").doc(newId);
        await docRef.create(data);

        ///// Add License to the business in business database /////
        docRef = db.collection('businesses').doc(data.businessId);
        let doc = await docRef.get();
        // Check whether the given uid exists in the user database
        if (!doc.exists) {
            return res
            .status(400)
            .send(
                `ERROR! Business with id ${data.businessId} does not exist.`
            );
        }
        
        // if the uid does exist, we add this license to this user's licenses.
        let businessData = doc.data();
        businessData["licenses"].push(newId);
        await docRef.update(businessData);
        
        ///// Add License to the user in user database /////
        docRef = db.collection('users').doc(uid);
        doc = await docRef.get();
        // Check whether the given uid exists in the user database
        if (!doc.exists) {
            return res
            .status(400)
            .send(
                `ERROR! User with id ${uid} does not exist.`
            );
        }
        
        // if the uid does exist, we add this license to this user's licenses.
        let userData = doc.data();
        userData["licenses"].push(newId);
        await docRef.update(userData);

        return res
            .status(200)
            .send(
                `Success! License with id ${newId} has been added to business ${data.businessId}.`
            );
      } catch (error) {
        console.log(error);
        res.set("Content-Type", "text/plain");
        return res.status(500).send(error);
      }
    })();
});

// Read all businesses of the user or a business if the user gives an id.
app.get("/api/read/business", (req, res) => {
    (async () => {
      try {
        const usersRef = db.collection("users");
        const businessesRef = db.collection("businesses");
        const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
        let err = validateId(uid);
        if (err != "") return res.status(400).send(err);

        const usersDoc = await usersRef.doc(uid).get();
        const givenId = req.query.business_id;
        if (!givenId){
          let businessIds;
          let businesses = [];
          businessIds = usersDoc.data().businesses;
          if (businessIds && businessIds.length > 0){ // this user has businesses.
              const snapshot = await businessesRef.where(admin.firestore.FieldPath.documentId(), "in", businessIds).get();
              snapshot.forEach(doc => {
                businesses.push(doc.data());
              })
              // successful query
              return res
                .set("Content-Type", "application/json")
                .status(200)
                .send(businesses);       
          }
          else { // this user does not have businesses.
            return res
              .set("Content-Type", "text/plain")
              .status(400)
              .send(`This user does not have businesses.`);
          }
        } 
        else {
          // check whether business id is valid.
          err = validateId(givenId);
          if (err != "") {
            res.set("Content-Type", "text/plain").status(400).send(err);
          }
          const business = await businessesRef.doc(givenId).get();
          return res
                .set("Content-Type", "application/json")
                .status(200)
                .send(business.data());    
        }
      } catch (error) {
        console.log(error);
        return res.set("Content-Type", "text/plain").status(500).send(error);
      }
    })();
});

// Read all licenses of a given business id or read all licenses of a user if business id not given.
app.get("/api/read/license", (req, res) => {
  (async () => {
    try {
      const usersRef = db.collection("users");
      const licensesRef = db.collection("licenses");
      const businessId = req.query.business_id;
      // TODO: Change to get
      const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;

      let err = validateId(uid);
      if (err != "") return res.status(400).send(err);

      const usersDoc = await usersRef.doc(uid).get();
      let licenseIds;
      let licenses = [];
      licenseIds = usersDoc.data().licenses;
      if (licenseIds && licenseIds.length > 0){
        let filteredLicenses = (!businessId) ? licensesRef.where(admin.firestore.FieldPath.documentId(), "in", licenseIds)
        : licensesRef.where(admin.firestore.FieldPath.documentId(), "in", licenseIds).where(
          "businessId", "==", businessId
        );
        const snapshot = await filteredLicenses.get();
        snapshot.forEach(doc => {
          let data = doc.data();
          // data["licenseId"] = doc.id;
          licenses.push(data);
        });
        return res
          .set("Content-Type", "application/json")
          .status(200)
          .send(licenses);          
      }
      else { // this user does not have businesses.
        return res
          .set("Content-Type", "text/plain")
          .status(400)
          .send(`This user does not have businesses.`);
      }
    } catch (error) {
      console.log(error);
      return res.set("Content-Type", "text/plain").status(500).send(error);
    }
  })();
});

// Given a business id, delete a business from a user as well as the user's licenses with this business.
app.delete("/api/delete/business", jsonParser, (req, res) => {
  (async () => {
    try {
      // Check whether the given id is valid.
      const businessId = req.query.id;
      const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
      const err = validateId(businessId);
      if (err != "") return res.status(400).send(err);

      // Check whether the uid exists.
      const usersRef = db.collection("users").doc(uid);
      const usersDoc = await usersRef.get();
      if (!usersDoc.exists) {
        return res
            .set("Content-Type", "text/plain")
            .status(404)
            .send(`The uid '${uid}' does not exist.`);
      }

      // Check whether the user owns the business.
      if (!usersDoc.data().businesses.includes(businessId)) {
        return res
            .set("Content-Type", "text/plain")
            .status(401)
            .send(`The uid '${uid}' does not own the business.`);
      }
   
      // now let's first delete the licenses associated with the business. 
      const businessesRef = db.collection("businesses").doc(businessId);
      const businessesDoc = await businessesRef.get();
      let businessesLicenses = businessesDoc.data().licenses; // get the all licenses for this business
      const licensesRef = db.collection("licenses"); // get reference to licenses database
      
      if (businessesLicenses && businessesLicenses.length > 0){
        // filter out the licenses that are under this business
        let filteredLicensesQuery = licensesRef.where(admin.firestore.FieldPath.documentId(), "in", businessesLicenses);
        const snapshot = await filteredLicensesQuery.get();
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
      }

      // after deleting the licenses associated with the business,
      // we can safely delete the user's business in the businesses collection.
      await businessesRef.delete();

      // then we remove the business from the user's list of businesses.
      // we also the subsequent removed licenses from the user's list of licenses.
      let userData = usersDoc.data();
      userData["businesses"].splice(userData["businesses"].indexOf(businessId), 1);
      userData["licenses"] = userData["licenses"].filter(n => !businessesLicenses.includes(n))
      await usersRef.update(userData);

      return res
      .set("Content-Type", "text/plain")
      .status(200) 
      .send(
          `Business with id ${businessId} has been deleted.`
      );
    } catch (error) {
      console.log(error);
      return res.set("Content-Type", "text/plain").status(500).send(error);
    }
  })();
});

// Given a license id, delete a license from a business.
app.delete("/api/delete/license", jsonParser, (req, res) => {
  (async () => {
    try {
      // Check whether the given id is valid.
      const licenseId = req.query.id;
      const uid = test ? "pK9cr35PnFepzbxNsuKwt6rtLhE3" : req.user.uid;
      let err = validateId(uid);
      if (err != "") return res.status(400).send(err);

      // Check whether the uid exists.
      const usersRef = db.collection("users").doc(uid);
      const usersDoc = await usersRef.get();
      if (!usersDoc.exists) {
        return res
            .set("Content-Type", "text/plain")
            .status(404)
            .send(`The uid '${uid}' does not exist.`);
      }

      // Check whether the user owns the license.
      if (!usersDoc.data().licenses.includes(licenseId)) {
        return res
            .set("Content-Type", "text/plain")
            .status(401)
            .send(`The uid '${uid}' does not own the business.`);
      }
   
      // now let's first delete the license in the business collection.
      let businessQuery = db.collection("businesses").where("licenses", "array-contains", licenseId);
      const snapshot = await businessQuery.get()
      snapshot.forEach(doc => {
          // get into the business object, and update the licenses array. 
          let businessData = doc.data();
          businessData["licenses"].splice(businessData["licenses"].indexOf(licenseId), 1);
          doc.ref.update(businessData);
      });

      // after deleting the license in the business collection.
      // we can safely delete the user's license in the licenses collection.
      const licensesRef = db.collection("licenses").doc(licenseId);
      await licensesRef.delete();

      // then we remove the license from the user's list of licenses.
      let userData = usersDoc.data();
      userData["licenses"].splice(userData["licenses"].indexOf(licenseId), 1);
      await usersRef.update(userData);
      
      return res
      .set("Content-Type", "text/plain")
      .status(200)
      .send(
          `License with id ${licenseId} has been deleted.`
      );
    } catch (error) {
      console.log(error);
      return res.set("Content-Type", "text/plain").status(500).send(error);
    }
  })();
});

// Given the id of the country, return the corresponding questionnaire based on the country.
app.get("/api/questions", jsonParser, (req, res) => {
  (async () => {
    try {
      const country = req.query.country;

      // firstly, find the corresponding country of the business
      const questionRef = db.collection("questions").doc(country);
      const questionDoc = await questionRef.get();
      const questionnaire = questionDoc.data().questionnaire;
      
      let questions = []
      for (let key of Object.keys(questionnaire)) {
        questions.push(key)
      }
      questions.sort();

      // return the total value. 
      return res
      .set("Content-Type", "application/json")
      .status(200)
      .send(questions);
    } catch (error) {
      console.log(error);
      return res.set("Content-Type", "text/plain").status(500).send(error);
    }
  })();
});

// Calculate the price of an order, 
// based on length, the given answers of the questionnaire and location of the business.
app.get("/api/license/price", jsonParser, (req, res) => {
  (async () => {
    try {
      const data = {
        businessId: req.query.business_id,
        answer: JSON.parse(req.query.answer),
        length: req.query.length
      };

      // base price for a license
      let baseRate = 6;
      
      // multiplicative factor 
      let factor = 2;

      // firstly, find the corresponding country of the business
      const businessesRef = db.collection("businesses").doc(data.businessId);
      const businessesDoc = await businessesRef.get();
      const country = businessesDoc.data().country; 

      // we accumulate the rates factor based on answer to each question.
      const questionsRef = db.collection("questions").doc(country);
      const questionsDoc = await questionsRef.get();

      const questionnaire = questionsDoc.data().questionnaire;
      
      for (let key of Object.keys(questionnaire)) {
        const currAns = data.answer[key] == true ? 0 : 1;
        factor += questionnaire[key][currAns];
      }

      factor = factor + Math.log(data.length);
      const total = baseRate * factor;

      // return the total value. 
      return res
      .set("Content-Type", "text/plain")
      .status(200)
      .send(total.toFixed(2));
    } catch (error) {
      console.log(error);
      return res.set("Content-Type", "text/plain").status(500).send(error);
    }
  })();
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
