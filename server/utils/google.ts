const {google} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  "607422315781-dlrhdddnoefbe9o5h6725p57oj951o24.apps.googleusercontent.com",
  "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",
  "http://localhost:5173/auth"
);

export function getAuthURL() {
 return oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  /** Pass in the scopes array defined above.
    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: ['https://www.googleapis.com/auth/gmail.send'],
  // Enable incremental authorization. Recommended as a best practice.
  include_granted_scopes: true
})
}

export async function getToken(code) {
  let {tokens} = await oauth2Client.getToken(code)
  console.log('utils', tokens)
  oauth2Client.setCredentials(tokens)
}

