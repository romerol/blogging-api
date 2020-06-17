# blogging-api

API that allows to:
- create a blog post
- list blog posts
- delete a given blog post

## Requirements

- Node.js >= 8
- MongoDB >= 3.4.10 listening in port 27017

## Usage

- Install dependencies with `npm i`
- Run `npm start` to start the server in localhost listening in port: 8080

A database called `blog-db` will be created in the running mongo instance in localhost once a blog post is created.

## Docs UI

After running the API with `npm start` the URL `http://localhost:8080/api-docs/` will be available to check:
- available endpoints
- the different models
- and the possibility to try the endpoints in the UI.

Trying the endpoints with the "docs UI" will hit a mongo database called `blog-db` that will be created automatically once a blog post is created.

## Testing

- Run the unit and integration tests with `npm test`
- The integration tests will use a database called `blog-db_test` that will be created automatically. 

The API can be tested by running the unit and integration tests OR by using the Docs UI.
