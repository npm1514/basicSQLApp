const pg = require('pg');
const password = require('./password');

module.exports = {
  read: function(req, res){
    pg.connect('postgres://nmarucci:' + password + '@localhost', function(err, client, done) {
      if(err){
        console.log(err)
      } else {
        client.query(`select * from thingy order by id;`, function(err, result) {
          if(err){
            res.send(err);
          }
          res.send(result.rows)
        });
      }
    });
  },
  create: function(req, res){
    pg.connect('postgres://nmarucci:' + password + '@localhost', function(err, client, done) {
      if(err){
        console.log(err)
      } else {
        var values = `insert into thingy(email,first,last) values('` + ((req.body.email) ? req.body.email : "") + `','` + ((req.body.first) ? req.body.first : "") + `','` + ((req.body.last) ? req.body.last : "") + `');`;
        client.query(values, function(err, result) {
          if(err){
            res.send(err);
          }
          res.send(req.body);
        });
      }
    });
  },
  update: function(req, res){
    pg.connect('postgres://nmarucci:' + password + '@localhost', function(err, client, done) {
      if(err){
        console.log(err)
      } else {
        client.query(`update thingy set email='`+ req.body.email +`', first='`+ req.body.first +`', last='`+ req.body.last +`' where id=` + req.params.id, function(err, result) {
          res.send(result)
        });
      }
    });
  },
  delete: function(req, res){
    pg.connect('postgres://nmarucci:' + password + '@localhost', function(err, client, done) {
      if(err){
        console.log(err)
      } else {
        client.query(`delete from thingy where id=` + req.params.id, function(err, result) {
          res.send(result)
        });
      }
    });
  }
}
