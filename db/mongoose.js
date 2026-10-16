import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/battle-royal';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection is open');
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection has occurred error', err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close().then(function() {
    console.log(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});

module.exports = {
  mongoose
};
