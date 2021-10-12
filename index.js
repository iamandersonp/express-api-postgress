const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, resp) =>
{
  resp.send('Hello World')
})

app.listen(port, () =>
{
  console.log(`Server is listening on http://localhost:${port}`)
})
