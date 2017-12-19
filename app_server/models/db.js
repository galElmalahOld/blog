let mongoose = require('mongoose');
console.log(process.env.NODE_ENV);

let dbURI = 'mongodb://localhost/Blog';
if (process.env.NODE_ENV === 'production'){
  dbURI=process.env.MONGODB_URI;
  console.log(dbURI);
}

mongoose.connect(dbURI, {useMongoClient:true});

// connection events for verification 

mongoose.connection.on('connected',  () => {
  console.log('Mongoose connected to ' + dbURI);
  });

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
  });

mongoose.connection.on('disconnected',  () => {
  console.log('Mongoose disconnected');
  });

let gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

/*
 using the gracefull shutdown 
 w =>hen the program terminate, nodemon restert it 
 or when heroku shuts down.
 killing the signals of each operation and closing the DB
*/

// nodemon
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart.',() => {
    process.kill(process.pid,'SIGUSR2');
  });
});

// App terminate
process.on('SIGINT',  () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// Heroku shuts down
process.on('SIGTERM', ()  =>{
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

require('./posts')