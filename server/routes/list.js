var router = require('express').Router();
var path = require('path');
var pg = require('pg');


var connectionString = require('../db/connection').connectionString;

router.get('/', function(request, response) {
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT * FROM toDo');
      var results = [];
      query.on('error', function(err){
        console.log(err);
        done();
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});


router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      console.log('got the stuff');
      var result = [];
      console.log(request.body);
      var task = request.body.task;
      var completed = request.body.completed;
      console.log(request.body);

      var query = client.query('INSERT INTO toDo (task, completed) VALUES ($1, $2)' +
      'RETURNING id, task, completed', [task, completed]);

      query.on('row', function(row){
        result.push(row);
      });
      query.on('end', function() {
        done();
        response.send(result);
      });

      query.on('error', function(error) {
        console.log('error running query:', error);
        done();
        response.status(500).send(error);

      });
    }
  });
});

router.delete('/:id', function(request, response){
  console.log(request.params.id);
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    }else {
      var id = request.params.id;
      console.log(request.params.id);
      var query = client.query('DELETE FROM toDo WHERE id =' + id + 'RETURNING *');
      var results = [];
      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.put('/', function(request, response){
  console.log(request.body); //this will be your task

  var id = request.body.id;
  var complete = request.body.completed;

  //connect to pg and update completed value

  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    }else {
      var query = client.query('UPDATE toDo SET completed = true WHERE id =' + id);
      var results = [];
      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
      });
      query.on('row', function(rowData){
        results.push(rowData);
      });
      query.on('end', function(){
        // response.sendStatus(200);
        response.send(results);
        done();
      });
    }
  });
});

module.exports = router;
