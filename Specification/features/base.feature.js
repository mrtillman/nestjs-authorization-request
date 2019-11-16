const counters = [
  {
    "_id": "5d16c0cd11ee4a3d6f44b045",
    "name": "alcohol",
    "value": 0,
    "skip": 1,
  },
  {
    "_id": "5d16c0cd11ee4a3d6f44b046",
    "name": "tobacco",
    "value": 0,
    "skip": 1,
  },
  {
    "_id": "5d16c0cd11ee4a3d6f44b047",
    "name": "firearms",
    "value": 0,
    "skip": 1,
  }
];

module.exports = class BaseFeature {
  constructor(){
    this.counters = counters;
  }
};
