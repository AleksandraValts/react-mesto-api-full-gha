const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validate');
const error = require('./middlewares/error');
const NotFound = require('./errors/NotFound (404)');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3001 } = process.env;

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(errorLogger);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => next(new NotFound('Страницы не существует')));
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
