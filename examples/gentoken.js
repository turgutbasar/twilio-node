const AccessToken = require('../lib/index').jwt.AccessToken;
const SpockGrant = AccessToken.SpockGrant;

// Used when generating any kind of tokens
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_SIGNING_KEY_SID;
const twilioApiSecret = process.env.TWILIO_SIGNING_KEY_SECRET;

// Used specifically for creating Chat tokens
const serviceSid = 'ISxx';
const identity = 'bturgut';

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const spockGrant = new SpockGrant({
  serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);

token.addGrant(spockGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
