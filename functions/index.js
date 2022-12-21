const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
const admin = require('firebase-admin');
admin.initializeApp();
exports.showConfigDiff = functions.remoteConfig.onUpdate((versionMetadata, context) => {
    functions.logger.info("Remote config update: " + JSON.stringify(versionMetadata) + ", context: " + JSON.stringify(context), {structuredData: true});
    
  });