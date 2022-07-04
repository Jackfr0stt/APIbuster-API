const testlab = require('@loopback/testlab');
    const axios = require('axios');
describe('List all apis tests', async () => {
      describe('Test group 1 tests', async () => {
it('Test 1', async () => {
        const res = await axios.get("http://localhost:8080/apis");
testlab.testlab.expect(res.data[0]).to.hasOwnProperty("test_groupId");
});
it('Test 2', async () => {
        const res = await axios.get("http://localhost:8080/apis");
testlab.expect(res.data[0]).to.hasOwnProperty("apiName");
});

});
});