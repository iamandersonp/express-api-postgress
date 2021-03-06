const express = require('express');
const cors = require('cors');
const passport = require('passport');
const routerApi = require('./routers');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./midleware/error.handlers');

const whitelist = [
  'http://localhost',
  'http://localhost:8080'
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No Permitido'));
    }
  }
};

const app = express();
app.use(express.json());
app.use(cors(options));

const port = process.env.PORT || 3001;

require('./utils/auth');
app.use(passport.initialize());
routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/', (req, resp) => {
//   resp.send('Hello World');
// });

app.listen(port, () => {
  console.log(
    `Server is listening on http://localhost:${port}`
  );
});
