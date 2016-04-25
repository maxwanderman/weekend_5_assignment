var pg = require('pg');


if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/toDoList';
}

function initializeDB(){
  pg.connect(connectionString, function(err, client,done){
    if(err){
      console.log('Error connecting to DB!', err);
      process.exit(1);
    }  else {
      var query = client.query(
      'CREATE TABLE IF NOT EXISTS toDo (' +
      'id SERIAL PRIMARY KEY,' +
      'task varchar(255) NOT NULL,' +
      'completed BOOLEAN NOT NULL);');

      query.on('end', function(){
      console.log('successfully added task');
      done();
      });
      query.on('error', function() {
      console.log('error creating task schema!');
      process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
