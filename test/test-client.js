import assert from 'assert';
import ImgixClient from '../src/main';
import { VERSION } from '../src/constants';

describe('Imgix client:', function describeSuite() {
  describe('The constructor', function describeSuite() {
    it('initializes with correct defaults', function testSpec() {
      let client = new ImgixClient({ domain: 'test.imgix.net' });
      assert.strictEqual(null, client.settings.secureURLToken);
      assert.strictEqual(true, client.settings.useHTTPS);
    });

    it('initializes with a token', function testSpec() {
      var client = new ImgixClient({
        domain: 'my-host.imgix.net',
        secureURLToken: 'MYT0KEN'
      });
      assert.strictEqual("my-host.imgix.net", client.settings.domain);
      assert.strictEqual("MYT0KEN", client.settings.secureURLToken);
      assert.strictEqual(true, client.settings.useHTTPS);
    });

    it('initializes in insecure mode', function testSpec() {
      var client = new ImgixClient({
        domain: 'my-host.imgix.net',
        secureURLToken: 'MYT0KEN',
        useHTTPS: false
      });
      assert.strictEqual("my-host.imgix.net", client.settings.domain);
      assert.strictEqual("MYT0KEN", client.settings.secureURLToken);
      assert.strictEqual(false, client.settings.useHTTPS);
    });

    it('errors with invalid domain - appended slash', function testSpec() {
      assert.throws(function() {
        new ImgixClient({
          domain: 'my-host1.imgix.net/',
        });
      }, Error);
    });

    it('errors with invalid domain - prepended scheme ', function testSpec() {
      assert.throws(function() {
        new ImgixClient({
          domain: 'https://my-host1.imgix.net',
        });
      }, Error);
    });

    it('errors with invalid domain - appended dash ', function testSpec() {
      assert.throws(function() {
        new ImgixClient({
          domain: 'my-host1.imgix.net-',
        });
      }, Error);
    });

    it('accepts a single domain name', function testSpec() {
      var expectedUrl = 'https://my-host.imgix.net/image.jpg?ixlib=js-' + VERSION;
      var client = new ImgixClient({ domain: 'my-host.imgix.net' });
      assert.strictEqual("my-host.imgix.net", client.settings.domain);
      assert.strictEqual(expectedUrl, client.buildURL('image.jpg'));
    });

    it('errors when domain is any non-string value', function testSpec() {
      assert.throws(function() {
        new ImgixClient({ domain: ['my-host.imgix.net', 'another-domain.imgix.net'] });
      }, Error);
    });

    it('errors when no domain is passed', function testSpec() {
      assert.throws(function() {
        new ImgixClient({});
      }, Error);
    });
  });
});
