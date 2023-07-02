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

  console.log(await getMessagesByThread())
  console.log(await getMessageContent('18289f8d58e2a1ac'))
}

export async function sendMail() {
  const subject = 'Parking Ticket Test';
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: Oscar McGoldrick <oscar.mcgoldrick99@gmail.com>',
    'To: Oscar McGoldrick <oscar.mcgoldrick99@gmail.com>',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    'This is a message just to say hello.',
    'So... <b>Hello!</b>  🤘❤️😎',
  ];
  const message = messageParts.join('\n');

  // The decodedBodyds to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  // send an email via the gmail api
    const gmail = google.gmail({version: 'v1', auth: oauth2Client})
    const response = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  })
  return response.data.threadId
}

export async function getMail() {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const res = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['INBOX'],
    maxResults: 10, // You can modify this value to retrieve more or fewer messages
  });

  const messages = res.data.messages;

  return messages
}

export async function getMessageContent(messageId: string) {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
  });

  const message = res.data;
  const body = message.payload.parts[0].parts[0].parts[0].body.data
  const decodedBody = Buffer.from(body, 'base64').toString('utf-8');

  return decodedBody;
}

export async function getProfile() {
      const gmail = google.gmail({version: 'v1', auth: oauth2Client})
    const profile = await gmail.users.getProfile({
      userId: 'me'
    })
    return profile
}

export async function getMessagesByThread() {
  const gmail = google.gmail({version: 'v1', auth: oauth2Client})
  const messages = await gmail.users.messages.list({
    userId: 'me',
    q: `from:Jessica.Dickson@ccc.govt.nz`
  })

  return messages.data.messages[0]
}