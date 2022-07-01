const testlab = require('@loopback/testlab');
const axios = require('axios');
describe('List all APIs tests', async () => {
  describe('Test group 1 tests', async () => {
    it('Test 2', async () => {
      const res = await axios.get("http://localhost:8080/apis");
      testlab.expect(res.data[0]).to.hasOwnProperty("id");
      testlab.expect(res.data[0]).to.hasOwnProperty("apiname");
      testlab.expect(res.data[0]).to.hasOwnProperty("apitype");
      testlab.expect(res.data[0]).to.hasOwnProperty("domain");
      testlab.expect(res.data[0]).to.hasOwnProperty("userid");
    });
  });
});
