![cf](https://i.imgur.com/7v5ASc8.png) lab-09-single-resource-api (SIMPLE PERSISTENCE)
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
    * please write the code from lab-08 to this new directory (make a copy as a starting point)
    * it's in your best interests to retype it as practice
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Resources
Here are some npm modules that you may find useful for this project, it is not required for you to use them.  
* [del](https://github.com/sindresorhus/del) - a npm module that makes deleting files easy
* [mkdirp](https://github.com/substack/node-mkdirp) - like `mkdir -p` but Node.js

# Directions
* make these directories to organize your code
 * lib
 * test
 * model
 * route
 * data // to hold your resources
* refactor the **storage** module to have file system persistence

## Bonus
* **2pts** - have the **storage** module check for the type sub-directory, and create it if it does not exist
