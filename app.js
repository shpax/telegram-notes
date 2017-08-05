const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const createTelegramBot = require('./controllers/Telegram');
const patterns = require('./controllers/Telegram/patterns');
const NotesModel = require('./models/NotesModel');

const notesModel = new NotesModel(config.mysql);
const app = express();

const tg = createTelegramBot({ botId: config.bot.id, notesModel });
//apply pattens from controllers/Telegram/patterns
patterns.applyAll(tg);

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/notes-bot', (req, res, next) => {
  const { message } = req.body;
  // start handling messages
  if (message) tg.handleMessage(message);

  res.status(200).end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(200);
  console.log(res.locals);
  res.end();
});

module.exports = app;
