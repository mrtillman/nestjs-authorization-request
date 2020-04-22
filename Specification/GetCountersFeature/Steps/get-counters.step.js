const { setWorldConstructor, Given, When, Then } = require('cucumber');
const World = require('../../world');
const expect = require('expect');

setWorldConstructor(World);

Given("an access token", function() {
  this.usecase.token = "access_token";
});

When("I request counters", async function() {
  this.result = await this.usecase.execute();
});

Then("I should receive counter data", function() {
  expect(this.result.value.length).toBe(3);
});
