'use strict';

const debug = require('debug')('http:cat');
const uuid = require('uuid/v4');

module.exports = function(name, mood) {
  debug('#Cat');
  if(!name) throw new Error('Expected name');
  if(!mood) throw new Error('Expected content');
  this.name = name;
  this.mood = mood;
  this.id = uuid();
};
