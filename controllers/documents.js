require('dotenv').config();
const router = require('express').Router();
const axios = require('axios');
const {google} = require('googleapis');

router.get('/', (req, res) => {
    // oauth2Client.setCredentials(localStorage.getItem('googleToken'));
    const oauth2Client = new google.auth.OAuth2(
        process.env.TECHIRE_GOOGLE_CLIENT_ID,
        process.env.TECHIRE_GOOGLE_CLIENT_SECRET, 
        process.env.GOOGLE_AUTH_CLIENT_REDIRECT);

    //oauth2Client.setCredentials(req.headers['authorization']);
    console.log(req.headers.authorization);
    const drive = google.drive({
        'version': 'v3',
        'auth': req.headers['authorization']
    })

    drive.files.list({
    })
    .then(result => {
        console.log('RESULT', result)
        res.send(result);
    })
    .catch(err => {
        console.log(err)
    })
   
})

module.exports = router;