const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// function to check if user and plant exist
exports.userPlantExists = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    return response.status(400).send("Please send a POST request");
  } else {
    const userRef = admin.firestore().collection("users").doc(request.body.userID);
    userRef.get().then((user) => {
      if (user.exists) {
        const plantRef = admin.firestore().collection("users").doc(request.body.userID).collection("plants").doc(request.body.plantID);
        plantRef.get().then((plant) => {
          if (plant.exists) {
            response.status(200).send("user and plant exist");
          } else {
            response.status(400).send("plant does not exist");
          }
        }).catch((err) => {
          response.status(500).send(err);
        });
      } else {
        response.status(400).send("user does not exist");
      }
    }).catch((err) => {
      response.status(500).send(err);
    });
  }
});


// function to get plant settings
exports.getPlantSettings = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    return response.status(400).send("Please send a POST request");
  } else {
    const plantRef = admin.firestore().collection("users").doc(request.body.userID).collection("plants").doc(request.body.plantID);
    plantRef.get().then((plant) => {
      if (plant.exists) {
        response.status(200).send(plant.data().settings);
      } else {
        response.status(400).send("plant does not exist");
      }
    }).catch((err) => {
      response.status(500).send(err);
    });
  }
});


// function to log data to plant
exports.logSensorData = functions.https.onRequest((request, response) => {
  if (request.method !== "POST") {
    return response.status(400).send("Please send a POST request");
  } else {
    const plantRef = admin.firestore().collection("users").doc(request.body.userID).collection("plants").doc(request.body.plantID);
    // add new log
    plantRef.collection("logs").set({
      time: request.body.time,
      reservoir: request.body.reservoir,
      temperature: request.body.temperature,
      humidity: request.body.humidity,
    }).then(() => {
      plantRef.update({
        reservoir: request.body.reservoir,
        temperature: request.body.temperature,
        humidity: request.body.humidity,
      }).then(() => {
        response.status(200).send("data logged ok");
      }).catch((err) => {
        response.status(500).send(err);
      });
    }).catch((err) => {
      response.status(500).send(err);
    });
  }
});
