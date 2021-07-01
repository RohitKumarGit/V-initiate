const admin = require('firebase-admin')
var serviceAccount = require("./twitter-clone-40897-firebase-adminsdk-r5epx-fb76ccf12f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twitter-clone-40897.firebaseio.com"
  });
module.exports = {
    auth : function(req,res,next){
        const token = req.headers['authorization']
        
        admin
  .auth()
  .verifyIdToken(token)
  .then((decodedToken) => {
      console.log("allowd")
    next()
    // ...
  })
  .catch((error) => {
    // Handle error
    console.log(req.url,"not allowd")
    res.status(400).send({error:error})
  });
        
    }
}