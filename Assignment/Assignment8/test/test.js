/* 
   Feng Li
   ITMD462 Test.js 
*/   

process.env.NODE_ENV = 'test';



let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Reminders', () => {

// post new user
  describe('/POST user', () => {
    it('should post a new user', (done) => {
      let newuser =
      {'user' : {
        "name" : "Feng",
        "email" : "fengli738@gmail.com"
      }}
      chai.request(server)
      .post('/users')
      .send(newuser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
  });
// test get 
  describe('/GET/:userid ', () => {
    it('should have the user by given id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        //res.body.should.have.property('id').eql(userId);
        done();
      });
    });
    it('should not have the user by the given id', (done) => {
      let userId = 5;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("There is no userid: " + userId);
        done();
      });
    });
  });

  describe('/POST reminder', () => {
    let newremind  =   {"reminder" : {
      "title" : "Reminder fffff",
      "description" : "This is the reminders"
    }}
    it('should have a new reminder by given id', (done) => {
      let userId = 1;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
    it('should not create a reminder by given id', (done) => {
      let userId = 5;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  describe('/GET/ reminders', () => {
    it('should get all reminders by userid', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('should not get all reminders with given userid', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  describe('/GET/:userId/reminders/:reminderId users', () => {
    it('Should get reminder from the given id', (done) => {
      let userId = 1;
      let remindId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        done();
      });
    });
    it('Should not get reminder from the given id', (done) => {
      let userId = 1;
      let remindId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("reminderId not found: " + remindId);
        done();
      });
    });
  });

  describe('/DELETE/:userId/reminders/:reminderId', () => {
    it('should delete a reminder', (done) => {
      let userId = 1;
      let remindId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('can not delete a reminder', (done) => {
      let userId = 1;
      let remindId = 3;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + remindId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("reminderId not found: " + remindId);
        done();
      });
    });
  });

  describe('/DELETE/:userId/reminders', () => {
    it('should delete all reminders with  given userid', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('should not delete reminders', (done) => {
      let userId = 2;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

  describe('/DELETE/:userId', () => {
    it(' should delete a user with that id', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it(' should not delete a user with that id', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("userId not found: " + userId);
        done();
      });
    });
  });

});