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

```bash
  $ npm i
  $ npm i nodemon -g # install nodemon if not present
  $ npm start
```