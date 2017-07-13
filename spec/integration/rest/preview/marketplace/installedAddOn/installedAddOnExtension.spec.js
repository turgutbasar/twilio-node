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
var serialize = require(
    '../../../../../../lib/base/serialize');  /* jshint ignore:line */


var client;
var holodeck;

describe('InstalledAddOnExtension', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions('XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        installedAddOnSid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= installedAddOnSid %>/Extensions/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'sid': 'XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'installed_add_on_sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'Incoming Voice Call',
          'product_name': 'Programmable Voice',
          'unique_name': 'voice-incoming',
          'enabled': true,
          'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions/XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions('XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
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

      var opts = {
        enabled: true
      };
      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions('XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        installedAddOnSid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= installedAddOnSid %>/Extensions/<%= sid %>')(solution);

      var values = {
        Enabled: serialize.bool(true),
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'sid': 'XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'installed_add_on_sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'Incoming Voice Call',
          'product_name': 'Programmable Voice',
          'unique_name': 'voice-incoming',
          'enabled': false,
          'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions/XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var opts = {
        enabled: true
      };
      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions('XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update(opts);
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

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        installedAddOnSid: 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://preview.twilio.com/marketplace/InstalledAddOns/<%= installedAddOnSid %>/Extensions')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'extensions': [
              {
                  'sid': 'XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'installed_add_on_sid': 'XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'Incoming Voice Call',
                  'product_name': 'Programmable Voice',
                  'unique_name': 'voice-incoming',
                  'enabled': true,
                  'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions/XFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'extensions'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions.list();
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
          'extensions': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://preview.twilio.com/marketplace/InstalledAddOns/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Extensions?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'extensions'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.preview.marketplace.installedAddOns('XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                              .extensions.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

