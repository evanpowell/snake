const { HighScore } = require('./index');

const getHighScoresBySettings = ((settingsObj) => {
  return new Promise((resolve, reject) => {
    const query = HighScore.find(settingsObj);
    query.exec((err, highScores) => {
      if (err) {
        reject(err);
      } else {
        resolve(highScores);
      }
    });
  });
});

const createHighScore = ((highScore) => {
  return HighScore.create(highScore);
});

const deleteHighScore = ((scoreId) => {
  return new Promise((resolve, reject) => {
    const query = HighScore.deleteOne({ id: scoreId });
    query.exec((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});

module.exports = {
  getHighScoresBySettings,
  createHighScore,
  deleteHighScore
};
