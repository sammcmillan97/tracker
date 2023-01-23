const { app } = require('../../testApp');
const { sequelize } = require('../../../models');
const should = require('should');
const request = require('supertest');
const { after } = require('mocha');


describe('User end point testing', function(){

    before('Mock db connection and load app', async function() {
        try {   
            await sequelize.sync({ force: true })
            await sequelize.authenticate();
        } catch(err) {
            console.log(err)
        }
    });

    describe('POST /users', function() {

        it('Should create a new user and return 201. Should get the user and return 200', async function(){
            const req = {
                email : "sammcmillan97@gmail.com",
                username: "sammcmillan97",
                firstName: "Sam",
                lastName : "McMillan",
                password : "password"
            }

            const userPost = await request(app)
                .post('/users')
                .send(req)
                .expect(201)
                .expect('Content-Type', /json/)
                .then((res) => {
                    res.body.should.have.property('email').equal("sammcmillan97@gmail.com");
                    res.body.should.have.property('firstName').equal("Sam");
                    res.body.should.have.property('lastName').equal("McMillan");
                    res.body.should.have.property('username').equal("sammcmillan97");
                    return res;
                });
            await request(app)
                .get('/users/' + userPost.body.id)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((res) => {
                    res.body.should.have.property('email').equal("sammcmillan97@gmail.com");
                    res.body.should.have.property('firstName').equal("Sam");
                    res.body.should.have.property('lastName').equal("McMillan");
                    res.body.should.have.property('username').equal("sammcmillan97");
                });
        });

        it('Should not create a user and return 400 (Incorrect email)', async function(){
            const req = {
                email : "sammcmillan97gmail.com",
                username: "sammcmillan97",
                firstName: "Sam",
                lastName : "McMillan",
                password : "password"
            }
            await request(app)
                .post('/users')
                .send(req)
                .expect(400, )
                .then((res) => {
                res.text.should.equal("Invalid email format");
                });
        });

        it('Should not create a user and return 400 (Missing body parameter)', async function(){
            const req = {
                username: "sammcmillan@97.com",
                firstName: "Sam",
                lastName : "McMillan",
                password : "password"
            }
            await request(app)
                .post('/users')
                .send(req)
                .expect(400, )
                .then((res) => {
                res.text.should.equal("Request body missing required parameters");
                });
        });

        it('Should not create a user and return 400 (Incorrect first name length)', async function(){
            const req = {
                email : "sammcmillan97@gmail.com",
                username: "sammcmillan97",
                firstName: "A VERY LONG LONG LONG LONG LONG LONG LONG LONG LONG NAME",
                lastName : "McMillan",
                password : "password"
            }
            await request(app)
                .post('/users')
                .send(req)
                .expect(400, )
                .then((res) => {
                res.text.should.equal("Invalid first name format: First name must have a length between 1 and 30 characters and contain no special characters");
            });
        });

        it('Should not get a user and return a 404 not found', async function(){
            await request(app)
                .post('/users/0d1ca9d0-6ebd-11ed-802a-57aa9c599c3d')
                .expect(404);
            });
        });
});    