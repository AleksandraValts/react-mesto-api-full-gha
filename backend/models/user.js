const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const User = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Deniska',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'BadBoy',
  },
  avatar: {
    type: String,
    default: 'https://sun9-52.userapi.com/impf/nwGRgZjkjYUdJep7ceOoris3DUSmIPg-ofhueA/QgAXVUN0mVE.jpg?size=880x880&quality=96&sign=ff58d15733b9da28c5ac19aa8f560377&type=album',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

User.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', User);
