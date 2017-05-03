'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));

  let jsonItem = JSON.stringify(item);

  fs.writeFileProm(`${__dirname}/../data/cat/${item.id}.json`, jsonItem)
  .then(jsonItem)
  .catch(console.error);

  return Promise.resolve();
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(data => {
    try {
      return JSON.parse(data.toString());
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(() => {})
  .catch((err) => err);
};

exports.updateItem = function(schema, id, name, mood) {
  debug('#putItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));
  let jsonItem;

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then(data => {
    jsonItem = JSON.parse(data.toString());
    jsonItem.name = name;
    jsonItem.mood = mood;

    jsonItem = JSON.stringify(jsonItem);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
    .then(() => jsonItem)
    .catch(err => console.error(err));
  })
  .catch(console.err);
};
