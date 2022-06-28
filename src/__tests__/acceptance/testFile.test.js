const testlab = require('@loopback/testlab');
const axios = require('axios');

describe('1st test attempt', async () => {
  describe('Testing /apis', async () => {
    it('GET /apis', async () => {
      const res = await axios.get("http://localhost:8080/apis");

      testlab.expect(res.data[0]).to.hasOwnProperty("id");
      testlab.expect(res.data[0]).to.hasOwnProperty("apiname");
      testlab.expect(res.data[0]).to.hasOwnProperty("apitype");
      testlab.expect(res.data[0]).to.hasOwnProperty("domain");
      testlab.expect(res.data[0]).to.hasOwnProperty("userid");
    });
  });
});
