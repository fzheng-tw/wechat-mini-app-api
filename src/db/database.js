import mongoose from 'mongoose';
import {databaseURL} from '../config';

const open = function () {
  console.log('connect to: ' + databaseURL);
  mongoose.connect(databaseURL);

  const connection = mongoose.connection;
  connection.on('error', console.log.bind(console, 'mongoose connect error \n'))
  connection.on('open', function () {
    console.log('connect successfully')
  });
  connection.on('close', function () {
    console.log('connect close');
  });
};

const close = function (cb) {
  mongoose.connection.close(cb);
};

module.exports = {open: open, close: close};
