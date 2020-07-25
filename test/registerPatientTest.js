//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const Patient = require('../models/patient');


const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const baseUrl = 'http://localhost:8000';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBjODk2N2FiNGIyZjM1Njg4ZjU0MmIiLCJ1c2VybmFtZSI6ImRyX3NhbHVua2UiLCJuYW1lIjoiRHIuIFIuIFAuIFNhbHVua2hlXG4iLCJkZXBhcnRtZW50IjoiRm9yZW5zaWNzIiwiX192IjowLCJpYXQiOjE1OTU2NzA0MjgsImV4cCI6MTU5NTg0MzIyOH0.ChyffzkWg-hUCts5q70GlZQtysPRTXQlf7PUv2ZFTn8';
chai.use(chaiHttp);

//Our parent block
describe('Patients', () => {
	beforeEach((done) => { //Before each test we empty the database
		Patient.remove({}, (err) => { 
		   done();		   
		});		
  });
describe('/patients/register', () => {
      it('it should not register a patient without phone number', (done) => {
      	let patient = {
          name: "J.R.R. Tolkien",
          age: "40",
          sex: "female"
      	}
      	chai.request(server)
          .post('/api/v1/patients/register')
          .send(patient)
          .set({ "Authorization": `Bearer ${token}` })
          .end((err, res) => {
            console.log(res.body);
      	  	res.should.have.status(500);
      	  	res.body.should.be.a('object');
      	  	res.body.should.have.property('message').equal("Phone number is missing, please retry");
            done();
          });
      });
      it('it should register a new patient ', (done) => {
        let patient = {
          phone: "91021891121",
          name: "J.R.R. Tolkien",
          age: "40",
          sex: "female"
        }
        chai.request(server)
          .post('/api/v1/patients/register')
          .set({ "Authorization": `Bearer ${token}` })
          .send(patient)
          .end((err, res) => {

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').includes("New Patient registered");
            res.body.patient_details.should.have.property('_id');
            res.body.patient_details.should.have.property('phone');
            res.body.patient_details.should.have.property('name');
            res.body.patient_details.should.have.property('age');
            res.body.patient_details.should.have.property('sex');
            done();
          });
      });
    });






  
//  /*
//   * Test the /GET route
//   */
//   describe('/GET book', () => {
// 	  it('it should GET all the books', (done) => {
// 			chai.request(server)
// 		    .get('/book')
// 		    .end((err, res) => {
// 			  	res.should.have.status(200);
// 			  	res.body.should.be.a('array');
// 			  	res.body.length.should.be.eql(0);
// 		      done();
// 		    });
// 	  });
//   });
//  /*
//   * Test the /POST route
//   */
//   describe('/POST book', () => {
// 	  it('it should not POST a book without pages field', (done) => {
// 	  	let book = {
// 	  		title: "The Lord of the Rings",
// 	  		author: "J.R.R. Tolkien",
// 	  		year: 1954
// 	  	}
// 			chai.request(server)
// 		    .post('/book')
// 		    .send(book)
// 		    .end((err, res) => {
// 			  	res.should.have.status(200);
// 			  	res.body.should.be.a('object');
// 			  	res.body.should.have.property('errors');
// 			  	res.body.errors.should.have.property('pages');
// 			  	res.body.errors.pages.should.have.property('kind').eql('required');
// 		      done();
// 		    });
// 	  });
// 	  it('it should POST a book ', (done) => {
// 	  	let book = {
// 	  		title: "The Lord of the Rings",
// 	  		author: "J.R.R. Tolkien",
// 	  		year: 1954,
// 	  		pages: 1170
// 	  	}
// 			chai.request(server)
// 		    .post('/book')
// 		    .send(book)
// 		    .end((err, res) => {
// 			  	res.should.have.status(200);
// 			  	res.body.should.be.a('object');
// 			  	res.body.should.have.property('message').eql('Book successfully added!');
// 			  	res.body.book.should.have.property('title');
// 			  	res.body.book.should.have.property('author');
// 			  	res.body.book.should.have.property('pages');
// 			  	res.body.book.should.have.property('year');
// 		      done();
// 		    });
// 	  });
//   });
//  /*
//   * Test the /GET/:id route
//   */
//   describe('/GET/:id book', () => {
// 	  it('it should GET a book by the given id', (done) => {
// 	  	let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
// 	  	book.save((err, book) => {
// 	  		chai.request(server)
// 		    .get('/book/' + book.id)
// 		    .send(book)
// 		    .end((err, res) => {
// 			  	res.should.have.status(200);
// 			  	res.body.should.be.a('object');
// 			  	res.body.should.have.property('title');
// 			  	res.body.should.have.property('author');
// 			  	res.body.should.have.property('pages');
// 			  	res.body.should.have.property('year');
// 			  	res.body.should.have.property('_id').eql(book.id);
// 		      done();
// 		    });
// 	  	});
			
// 	  });
//   });
//  /*
//   * Test the /PUT/:id route
//   */
//   describe('/PUT/:id book', () => {
// 	  it('it should UPDATE a book given the id', (done) => {
// 	  	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
// 	  	book.save((err, book) => {
// 				chai.request(server)
// 			    .put('/book/' + book.id)
// 			    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
// 			    .end((err, res) => {
// 				  	res.should.have.status(200);
// 				  	res.body.should.be.a('object');
// 				  	res.body.should.have.property('message').eql('Book updated!');
// 				  	res.body.book.should.have.property('year').eql(1950);
// 			      done();
// 			    });
// 		  });
// 	  });
//   });
//  /*
//   * Test the /DELETE/:id route
//   */
//   describe('/DELETE/:id book', () => {
// 	  it('it should DELETE a book given the id', (done) => {
// 	  	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
// 	  	book.save((err, book) => {
// 				chai.request(server)
// 			    .delete('/book/' + book.id)
// 			    .end((err, res) => {
// 				  	res.should.have.status(200);
// 				  	res.body.should.be.a('object');
// 				  	res.body.should.have.property('message').eql('Book successfully deleted!');
// 				  	res.body.result.should.have.property('ok').eql(1);
// 				  	res.body.result.should.have.property('n').eql(1);
// 			      done();
// 			    });
// 		  });
// 	  });
//   });
});
  