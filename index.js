const express = require('express');
const routerApi = require('./routers');
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./midleware/error.handlers');

const app = express();
app.use(express.json());
const port = 3001;

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, resp) => {
  resp.send('Hello World');
});

app.listen(port, () => {
  console.log(
    `Server is listening on http://localhost:${port}`
  );
});
