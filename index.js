const express = require('express');
const cors = require('cors');
const routerApi = require('./routers');
const {
  logErrors,
  errorHandler,
  boomErrorHandler
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

routerApi(app);
app.use(logErrors);
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
