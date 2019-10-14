require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const {google} = require('googleapis');

 /** THIS ROUTE IS NOT IN USE, BUT SHOULD BE SAVED
  *  FOR VNEXT.
  */
router.get('/', (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.TECHIRE_GOOGLE_CLIENT_ID,
        process.env.TECHIRE_GOOGLE_CLIENT_SECRET, 
        process.env.GOOGLE_AUTH_CLIENT_REDIRECT);

    //oauth2Client.setCredentials(req.headers['authorization']);
    // console.log(req.headers.authorization);
    const drive = google.drive({
        'version': 'v3',
        'auth': req.headers['authorization']
    })

    drive.files.list({
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err)
    })
   
})

module.exports = router;