# poc_sony_mobile_backend
Backend Application for PoC task in Sony

### How to run
First, create a '.env' file. An example is shown below.

```
NODE_ENV=development
PORT=1337

DB_CLIENT=pg
DB_CONNECTION=postgres://username:password@localhost:5432/sony_poc_db
DB_CONNECTION_TEST=postgres://username:password@localhost:5432/sony_poc_db_test
```

Then run it from the terminal

```bash
  $ npm i
  $ npm i nodemon -g # install nodemon if not present
  $ npm start
```

###Sample API endpoints

```
http://localhost:3005/api/v1/countries
http://localhost:3005/api/v1/channels
http://localhost:3005/api/v1/channels/1
http://localhost:3005/api/v1/channels/1/feeds
http://localhost:3005/api/v1/channels/programs/
http://localhost:3005/api/v1/channels/1/programs/
http://localhost:3005/api/v1/channels/1/programs/1
http://localhost:3005/api/v1/channels/1/programs/episodes
http://localhost:3005/api/v1/channels/1/programs/episodes
```

Some endpoints allow query string parameters such as
- http://localhost:3005/api/v1/channels/1/programs/episodes?distinct=true&sort=episode_desc
- http://localhost:3005/api/v1/channels/programs?featured=true&limit=5&offset=10
- http://localhost:1337/api/v1/channels/1/feeds?startTime=1519911699&endTime=1519931689

