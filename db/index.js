const mongoose = require('mongoose');
const { DB_USERNAME, DB_PW } = process.env;

const { Schema } = mongoose;

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PW}@ds031915.mlab.com:31915/snakegame`, { useNewUrlParser: true });

const db = mongoose.connection;

const highScoreSchema = new Schema({
  initials: String,
  score: Number,
  isWall: Boolean,
  speed: Number
});

const HighScore = mongoose.model('highscores', highScoreSchema);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('db connected');
});

module.exports = {
  HighScore
};
