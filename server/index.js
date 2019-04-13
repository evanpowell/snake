require ('dotenv').config();

const express = require('express');
const path = require('path');

const dbQuery = require('../db/queries');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/highscores', (req, res) => {
  const { isWall, speed } = req.query;

  const settings = {
    isWall: isWall === 'true',
    speed: Number(speed)
  }

  dbQuery.getHighScoresBySettings(req.query).then((highScores) => {
    res.send(highScores);
  });
});

app.post('/highScore', (req, res) => {
  dbQuery.createHighScore(req.body).then(() => {
    res.send('highScore successfuly created');
  });
});

app.delete('/highScore', (req, res) => {
  const id = req.query.id;
  
  dbQuery.deleteHighScore(id).then(() => {
    res.send('highScore successfully deleted');
  });
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
