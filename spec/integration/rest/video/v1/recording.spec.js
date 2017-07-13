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


var client;
var holodeck;

describe('Recording', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.video.v1.recordings('RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://video.twilio.com/v1/Recordings/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'status': 'processing',
          'date_created': '2015-07-30T20:00:00Z',
          'sid': 'RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'source_sid': 'MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'size': 0,
          'url': 'https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'type': 'audio',
          'duration': 0,
          'container_format': 'mka',
          'codec': 'OPUS',
          'grouping_sids': {
              'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
          },
          'links': {
              'media': 'https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.video.v1.recordings('RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
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

      var promise = client.video.v1.recordings.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var url = 'https://video.twilio.com/v1/Recordings';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'recordings': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://video.twilio.com/v1/Recordings?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://video.twilio.com/v1/Recordings?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'recordings'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.video.v1.recordings.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_results response',
    function() {
      var body = JSON.stringify({
          'recordings': [
              {
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'status': 'completed',
                  'date_created': '2015-07-30T20:00:00Z',
                  'sid': 'RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'source_sid': 'MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'size': 23,
                  'type': 'audio',
                  'duration': 10,
                  'container_format': 'mka',
                  'codec': 'OPUS',
                  'grouping_sids': {
                      'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                      'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                  },
                  'url': 'https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'media': 'https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media'
                  }
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://video.twilio.com/v1/Recordings?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://video.twilio.com/v1/Recordings?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'recordings'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.video.v1.recordings.list();
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

      var promise = client.video.v1.recordings('RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        sid: 'RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://video.twilio.com/v1/Recordings/<%= sid %>')(solution);

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

      var promise = client.video.v1.recordings('RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

