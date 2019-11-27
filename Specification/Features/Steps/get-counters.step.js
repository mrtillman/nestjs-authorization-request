const { setWorldConstructor, Given, When, Then } = require('cucumber');
const GetCountersFeature = require('../get-counters.feature');
const expect = require('expect');

setWorldConstructor(GetCountersFeature);

Given("an access token", function() {
  this.usecase.token = "TokenValue";
});

When("I request counters", async function() {
  this.result = await this.usecase.execute();
});

Then("I should receive counter data", function() {
  expect(this.result.length).toBe(3);
});
