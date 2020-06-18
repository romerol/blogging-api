# blogging-api

API that allows to:
- create a blog post (title should be unique)
- list all the blog posts
- delete a given blog post by its Id
- search blog posts by title and content
- create an author with their name, email and password

To do next:
- authenticate an author with JWT
- add security on create blog post and auto-assign author in post based on JWT.

## Requirements

- Node.js >= 12.16.3
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
The tests will run in port 8081 by default.