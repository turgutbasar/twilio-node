'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('PhoneNumber', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var opts = {
        phoneNumberSid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers.create(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://messaging.twilio.com/v1/Services/<%= serviceSid %>/PhoneNumbers')(solution);

      var values = {
        PhoneNumberSid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function() {
      var body = JSON.stringify({
          'sid': 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2015-07-30T20:12:31Z',
          'date_updated': '2015-07-30T20:12:33Z',
          'phone_number': '+987654321',
          'country_code': 'US',
          'capabilities': [],
          'url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        phoneNumberSid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid create_with_capabilities response',
    function() {
      var body = JSON.stringify({
          'sid': 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2015-07-30T20:12:31Z',
          'date_updated': '2015-07-30T20:12:33Z',
          'phone_number': '+987654321',
          'country_code': 'US',
          'capabilities': [
              'MMS',
              'SMS',
              'Voice'
          ],
          'url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        phoneNumberSid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid remove request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://messaging.twilio.com/v1/Services/<%= serviceSid %>/PhoneNumbers/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function() {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://messaging.twilio.com/v1/Services/<%= serviceSid %>/PhoneNumbers')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'phone_numbers',
              'url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0'
          },
          'phone_numbers': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'service_sid': 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'sid': 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2015-07-30T20:12:31Z',
                  'date_updated': '2015-07-30T20:12:33Z',
                  'phone_number': '+987654321',
                  'country_code': 'US',
                  'capabilities': [],
                  'url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      });

      holodeck.mock(new Response(200, body));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://messaging.twilio.com/v1/Services/<%= serviceSid %>/PhoneNumbers/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'sid': 'SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2015-07-30T20:12:31Z',
          'date_updated': '2015-07-30T20:12:33Z',
          'phone_number': '12345',
          'country_code': 'US',
          'capabilities': [],
          'url': 'https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.messaging.v1.services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                       .phoneNumbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

