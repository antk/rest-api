###Running locally

####Install homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

####Install Git (if not already installed)

`$ brew install git`

####Install NodeJs (also installs npm)

`$ brew install node`

####Install MongoDB
```
$ brew install mongodb
$ sudo mkdir /data/db
$ sudo chown -R $USER /data/db
```

####Clone this repo

`$ git clone git@bitbucket.org:antk/runnerapi.git`

####Install Dependencies

`$ npm install`

####Start MongoDB
`$ mongod #starts with defaults - db at /data/db and port=27017`

####Start the server

`$ node app.js`

####Hit the server with some test curls

#####Add runners
```
$ curl -H "Content-Type: application/json" -d '{"firstName":"Peter", "lastName": "Parker", "email": "test1@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add

$ curl -H "Content-Type: application/json" -d '{"firstName":"Eddie", "lastName": "Brock", "email": "test2@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add

$ curl -H "Content-Type: application/json" -d '{"firstName":"Flash", "lastName": "Thompson", "email": "test3@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add
```

#####Get all runners
`$ curl http://localhost:3000/runners`

#####Get a single runner (get a uid from the curl result above)
`$ curl http://localhost:3000/runners/uid`

#####Update a runner's info (get a uid from the all runners curl result)
`$ curl -H "Content-Type: application/json" -X PUT -d '{"firstName":"UpdateFirst", "lastName":"UpdateLast"}' http://localhost:3000/runners/update/uid`

#####Delete a runner (get a uid from the all runners curl result)
`$ curl -X DELETE http://localhost:3000/runners/remove/uid`


#####Resources
* [https://expressjs.com/en/starter/installing.html](https://expressjs.com/en/starter/installing.html)
* [https://devcenter.heroku.com/articles/mean-apps-restful-api#create-a-restful-api-server-with-node-js-and-express](https://devcenter.heroku.com/articles/mean-apps-restful-api#create-a-restful-api-server-with-node-js-and-express)
* [https://github.com/mongodb/node-mongodb-native?_ga=1.156492092.662319545.1469055597](https://github.com/mongodb/node-mongodb-native?_ga=1.156492092.662319545.1469055597)
* [http://wesleytsai.io/2015/07/26/mongodb-server-directory-permission-denied/](http://wesleytsai.io/2015/07/26/mongodb-server-directory-permission-denied/)