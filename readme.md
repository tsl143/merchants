# merchants

## Frontend

An app built in react-redux which 
- shows a list of merchants
- adds a merchant
- edits a merchant
- removes a merchant
- shows bids (pre-sorted - also sortable in popup for bids.length > 3)

### Get started
| Command                     | Description              |
|-----------------------------|--------------------------|
| `yarn install`              | Install all dependencies |
| `yarn go`                   | Starts dev server 		 |
| `yarn build`                | build for Deployment 	 |
| `yarn test`                 | run test cases 			 |


App has a basic UI and few validations on the add/edit form

Project consist of few test cases written in 
- enzyme
- JEST

This project is also hosted on github page of this repo

## Backend

Backend mocks API and uses
- json-server
- heroku

the `json-server` is used to mock the CRUD operations on `db.json` and is deployed on `https://intense-tor-76305.herokuapp.com`
A copy of data is also stored in `server/db.json` in this repo.
