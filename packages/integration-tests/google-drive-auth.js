const googleAuth = require('google-auth-library');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

module.exports = () => {
  return new Promise((resolve, reject) => {
    const credentials = JSON.parse(process.env.GDRIVE_CREDENTIALS);
    const clientSecret = credentials.client_secret;
    const clientId = credentials.client_id;
    const redirectUrl = credentials.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
    oauth2Client.credentials = JSON.parse(process.env.GDRIVE_USER_CREDENTIALS);
    resolve(oauth2Client);
  });
}
