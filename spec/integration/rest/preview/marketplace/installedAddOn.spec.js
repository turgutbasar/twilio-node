'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */
var serialize = require(
    '../../../../../lib/base/serialize');  /* jshint ignore:line */


var client;
var holodeck;

describe('InstalledAddOn', function() {
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
        availableAddOnSid: 'XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        acceptTermsOfService: true
      };
      var promise = client.preview.marketplace.installedAddOns.create(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var url = 'https://preview.twilio.com/marketplace/InstalledAddOns';

      var values = {
        AvailableAddOnSid: 'XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        AcceptTermsOfService: serialize.bool(true),
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
          'sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'VoiceBase High Accuracy Transcription',
          'description': 'Automatic Transcription and Keyword Extract...',
          'configuration': {
              'bad_words': true
          },
          'unique_name': 'voicebase_high_accuracy_transcription_1',
          'date_created': '2016-04-07T23:52:28Z',
          'date_updated': '2016-04-07T23:52:28Z',
          'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'extensions': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions',
              'available_add_on': 'https://preview.twilio.com/marketplace/AvailableAddOns/XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          }
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        availableAddOnSid: 'XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        acceptTermsOfService: true
      };
      var promise = client.preview.marketplace.installedAddOns.create(opts);
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

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= sid %>')(solution);

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

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'VoiceBase High Accuracy Transcription',
          'description': 'Automatic Transcription and Keyword Extract...',
          'configuration': {
              'bad_words': true
          },
          'unique_name': 'voicebase_high_accuracy_transcription',
          'date_created': '2016-04-07T23:52:28Z',
          'date_updated': '2016-04-07T23:52:28Z',
          'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'extensions': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions',
              'available_add_on': 'https://preview.twilio.com/marketplace/AvailableAddOns/XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid update request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'VoiceBase High Accuracy Transcription',
          'description': 'Automatic Transcription and Keyword Extract...',
          'configuration': {
              'bad_words': true
          },
          'unique_name': 'voicebase_high_accuracy_transcription_2',
          'date_created': '2016-04-07T23:52:28Z',
          'date_updated': '2016-04-07T23:52:28Z',
          'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'extensions': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions',
              'available_add_on': 'https://preview.twilio.com/marketplace/AvailableAddOns/XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.marketplace.installedAddOns.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var url = 'https://preview.twilio.com/marketplace/InstalledAddOns';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'installed_add_ons': [
              {
                  'sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'VoiceBase High Accuracy Transcription',
                  'description': 'Automatic Transcription and Keyword Extract...',
                  'configuration': {
                      'bad_words': true
                  },
                  'unique_name': 'voicebase_high_accuracy_transcription',
                  'date_created': '2016-04-07T23:52:28Z',
                  'date_updated': '2016-04-07T23:52:28Z',
                  'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'extensions': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions',
                      'available_add_on': 'https://preview.twilio.com/marketplace/AvailableAddOns/XBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                  }
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://preview.twilio.com/marketplace/InstalledAddOns?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://preview.twilio.com/marketplace/InstalledAddOns?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'installed_add_ons'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'installed_add_ons': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://preview.twilio.com/marketplace/InstalledAddOns?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://preview.twilio.com/marketplace/InstalledAddOns?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'installed_add_ons'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

