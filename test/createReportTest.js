//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Report = require('../models/report');
const Status = require('../models/status');
const jwt = require('jsonwebtoken'); 
const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');
const server = require('../index');
const should = chai.should();
const baseUrl = 'http://localhost:8000';
let token = '';
chai.use(chaiHttp);

//Our parent block
describe('Patients', () => {
  try{
    beforeEach(async() => { 
      //Before each test we empty the database
      await Patient.remove({});
      await Doctor.remove({});
      await Report.remove({});
      // register a doctor and  to used for testing
      let doctor = {
        username: "test_doctor",
        password: "12345",
        name: "Dr. Test Doctor",
        department: "Test Department"
      }
      doctor= await Doctor.create(doctor);
      token = await jwt.sign( doctor.toObject(), 'random_string',{
        expiresIn: '2 days'
       });
    });
  }
  catch(err){
    console.log(err);
  }
  
describe('/patients/register', () => {

   
      //Test 1
      try{
        it('it should not create a report if pateint id in url is not registered', async() => {
            let id  =  crypto.randomBytes(12).toString('hex');
             console.log(id);
            let res =  await chai.request(baseUrl)
            .post(`/api/v1/patients/${id}/create_report`)
            .send({status: 0})
            .set({ "Authorization": `Bearer ${token}` });      
            res.body.should.have.property('message').includes("Error in finding patient");
           
          
            
  
        });

      }
      catch(err){
        console.log(err);
      }
    });
    //   //Test 2
    //   try{
    //     it('it should not register a patient with a phone already registered', async() => {
    //       let patient1 =  new Patient({
    //         phone: "91021891121",
    //         name: "J.R.R. Tolkien",
    //         age: "40",
    //         sex: "female"
    //       });
    //       await patient1.save();
    //       let patient2 =  {
    //         phone: "91021891121",
    //         name: "J.R.R. Tolkien",
    //         age: "40",
    //         sex: "female"
    //       };
    //       let res =  await chai.request(server)
    //       .post('/api/v1/patients/register')
    //       .send(patient2)
    //       .set({ "Authorization": `Bearer ${token}` });      
          
    //       res.should.have.status(500);
    //       res.body.should.have.property('message').includes("Patient is already register");
          
            
  
    //     });

    //   }
    //   catch(err){
    //     console.log(err);
    //   }
      
    //   //Test 3
    //   it('it should register a new patient when all mandatory details are present and phone number is unique', (done) => {
    //     let patient = {
    //       phone: "91021891121",
    //       name: "J.R.R. Tolkien",
    //       age: "40",
    //       sex: "female"
    //     }
    //     chai.request(server)
    //       .post('/api/v1/patients/register')
    //       .set({ "Authorization": `Bearer ${token}` })
    //       .send(patient)
    //       .end((err, res) => {

    //         res.should.have.status(200);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('message').includes("New Patient registered");
    //         res.body.patient_details.should.have.property('_id');
    //         res.body.patient_details.should.have.property('phone');
    //         res.body.patient_details.should.have.property('name');
    //         res.body.patient_details.should.have.property('age');
    //         res.body.patient_details.should.have.property('sex');
    //         done();
    //       });
    //   });
    // });

});
  