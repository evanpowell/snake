const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/highscores', (req, res) => {
  // query db for highscores based on wall and speed settings
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
