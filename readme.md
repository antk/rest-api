###Running locally

####Install homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

####Install Git (if not already installed)

`$ brew install git`

####Install NodeJs (also installs npm)

`$ brew install node`

####Clone this repo

`$ git clone git@bitbucket.org:antk/runnerapi.git`

####Install Dependencies

`$ npm install`

####Start the server

`$ node app.js`

####Hit the server with some test curls

#####Add runners
`
$ curl -H "Content-Type: application/json" -d '{"firstName":"Peter", "lastName": "Parker", "email": "test1@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add
`
`
$ curl -H "Content-Type: application/json" -d '{"firstName":"Eddie", "lastName": "Brock", "email": "test2@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add
`
`
$ curl -H "Content-Type: application/json" -d '{"firstName":"Flash", "lastName": "Thompson", "email": "test3@test.com", "distance":0, "time":0, "userName": "test_username", "tokens": 0, "superTokens":0, "bugsSquashed":0}' http://localhost:3000/runners/add
`

#####Get all runners
`$ curl http://localhost:3000/runners`

#####Get a single runner (get a uid from the curl result above)
`$ curl http://localhost:3000/runners/uid`

#####Update a runner's info (get a uid from the all runners curl result)
`$ curl -H "Content-Type: application/json" -X PUT -d '{"firstName":"UpdateFirst", "lastName":"UpdateLast"}' http://localhost:3000/runners/update/uid`

#####Delete a runner (get a uid from the all runners curl result)
`$ curl -X DELETE http://localhost:3000/runners/remove/uid`