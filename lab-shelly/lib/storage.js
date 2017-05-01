'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;
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
    // let schemaName = storage[schema];
    // if(!schemaName) return reject(new Error('schema not found'));
    // let item = schemaName[id];
    // if(!item) return reject(new Error('item not found'));
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
    //
    // let schemaName = storage[schema];
    // if(!schemaName) return reject(new Error('schema not found'));

    // let item = schemaName[id];
    // if(!item) return reject(new Error('item not found'));
    fs.unlink(`${__dirname}/../data/${schema}/${id}.json`, function(err) {
      if (err) {
        return console.error(err);
      }
      resolve();
    });
  });
};

// exports.updateItem = function(schema, id, name, mood) {
//   debug('#putItem');
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('schema required'));
//     if(!id) return reject(new Error('id required'));
//
//     // let schemaName = storage[schema];
//     // if(!schemaName) return reject(new Error('schema not found'));
//     //
//     // let item = id;
//     // // if(!item) return reject(new Error('item not found'));
//     //
//     // item.name = name;
//     // item.mood = mood;
//
//     // let jsonItem = JSON.stringify(item);
//
//     resolve(fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
//     .then(data => {
//
//       let jsonItem = JSON.parse(data.toString());
// //updated the name and mood with user input
//
//       jsonItem.name = name;
//       jsonItem.mood = mood;
//
//       jsonItem = JSON.stringify(jsonItem);
//
//       fs.writeFileProm(`${__dirname}/../data/${schema}/${id}.json`, jsonItem)
//       .then(console.log('jsonitem: ', jsonItem))
//       .catch(console.err);
//     })
//     .catch(console.err));
//   });
// };
