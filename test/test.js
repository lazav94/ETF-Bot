var assert = require('assert');
require('dotenv').config();
const apiai = require('../server/api/_lib/apiaiHandler');

// apiai('123', )
  describe('espb', () => {
    it('should return course_esbp', async function ()  {
      const apiaiResult = await apiai('Koliko espb nosi PSZ?');
      assert.equal(apiaiResult, 'course_espb', 'wtf');
    });
  });


