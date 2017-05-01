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
  .then(jsonItem) //return item object to cat-routes.js
  .catch(console.error); //reject promise if file error

  return Promise.resolve();
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    resolve(fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(data => {
      try {
        return JSON.parse(data.toString()); //buffer -> string -> JSON
      } catch (err) {
        return reject(err); //issue with parsing data
      }
    })
    .catch(err => reject(err)));
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
};

exports.updateItem = function(schema, id, name, mood) {
  debug('#putItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(data => {
      let jsonItem = JSON.parse(data.toString());
      jsonItem.name = name; //update with new name
      jsonItem.mood = mood; //update with new mood

      jsonItem = JSON.stringify(jsonItem); //in order to pass into the call

      fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
        .then(jsonItem)
        .catch(console.err); //file or data issue then catch error
      resolve(); //resolve promise
    })
    .catch(console.err); //read file issue then catch error
  });
};
