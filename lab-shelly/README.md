![cf](https://i.imgur.com/7v5ASc8.png) lab-09-single-resource-api (SIMPLE PERSISTENCE)
======
# Overview
* An HTTP server was created using the node http module. It includes the following:
  * An object constructor for creating a simple resource with three properties: an `id` property that is set to a unique **node-uuid**, name, and mood.
  * Body parser for `POST` and `PUT` requests
  * URL parser that uses nodes `url` and `querystring` modules
  * Router Constructor that manages requests to `GET`, `POST`, `PUT`, and `DELETE` requests
  * Routes for doing `CREATE`, `READ`, and `DELETE` operations
  * Storage module with file system persistence that will store resources by their schema type and id

## Instructions
  * Clone this repo and navigate to the lab-shelly directory
  * Download the dependencies
  * Run nodemon server in terminal
  * Use server endpoints for requests

## Server Endpoints
### `/api/cat`
* `POST` request
  * Create a resource by specifying the name and mood.
  ```
  HTTP POST :3000/api/cat name="milo" mood="hungry"
  ```
* `GET` request
  * Get a resource by passing an `?id=<uuid>` in the query string.
  ```
  HTTP GET :3000/api/cat?id=12345
  ```
* `DELETE` request
  * Delete a resource by passing in an `?id=<uuid>` in the query string. It should return 204 status with no content in the body
  ```
  HTTP DELETE :3000/api/cat?id=12345
  ```
* `PUT` request
  * Update a resource by passing in a valid `?id=<uuid>` in the query string and specifying the new name and mood.
  ```
  HTTP PUT :3000/api/cat?id=12345 name="eva" mood="grumpy"
  ```

## Tests
Tests were written to ensure that the `/api/cat` endpoint responds as described for each condition below::

  * 404 response for routes that have not been registered
  * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `GET` - test 200, response body for a request made with a valid id
  * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `POST` - test 200, response body for a post request with a valid body
  * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
  * `PUT` - test 202, response body for a put request with a valid  id
  * `DELETE` - test 404, responds with 'not found' for valid request made with an id that was not found
  * `DELETE` - test 204, response for a delete request with a valid id
