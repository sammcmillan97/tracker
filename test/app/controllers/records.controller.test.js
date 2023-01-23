const  { app } = require('../../testApp');
const { sequelize } = require('../../../models');
const should = require('should');
const request = require('supertest');

describe('Record end point testing', function(){
    let userId;
    let categoryId;

    before('Mock db connection and load app', async function() {
        try {   
            await sequelize.sync({ force: true })
            await sequelize.authenticate();
        } catch(err) {
            console.log(err)
        }
        const userReq = {
            email : "sammcmillan97@gmail.com",
            username: "sammcmillan97",
            firstName: "Sam",
            lastName : "McMillan",
            password : "password"
        }
        await request(app)
        .post('/users')
        .send(userReq)
        .then((res) => {
            userId = res.body.id
        });

        const categoryReq = {
            name : "Test"
        }
        await request(app)
        .post('/categories')
        .send(categoryReq)
        .then((res) => {
            categoryId = res.body.id
        })
    });

    describe('POST /records', function() {

        it('Should create a new record and return 201. Should get the record and return 200', async function(){
            const req = {
                userId : userId,
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "10",
                productivity : "10",
                categoryId : categoryId
            }

            await request(app)
                .post('/records')
                .send(req)
                .expect(201)
                .expect('Content-Type', /json/)
                .then((res) => {
                    res.body.should.have.property('userId').equal(userId);
                    res.body.should.have.property('description').equal("Test description");
                    res.body.should.have.property('notes').equal("Test notes");
                    res.body.should.have.property('start').equal("2022-11-21T18:25:43.511Z");
                    res.body.should.have.property('end').equal("2022-11-22T20:25:43.511Z");
                    res.body.should.have.property('enjoyment').equal(10);
                    res.body.should.have.property('productivity').equal(10);
                    res.body.should.have.property('categoryId').equal(categoryId);
                    return res;
                });
            await request(app)
                .get('/records/')
                .expect(200)
                .expect('Content-Type', /json/)
                .then((res) => {
                    (res.body.length).should.equal(1);
                });    
        });

        it('Should attempt to post a new record and return a 400 due to missing body parameters', async function() {
            const req = {
                userId : userId,
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "10",
                productivity : "10",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(400)
            .then((res) => {
                res.text.should.equal("Request body missing required parameters")
            });
        });


        it('Should attempt to post a new record and return a 400 due to enjoyment being out of upper bounds', async function() {
            const req = {
                userId : userId,
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "11",
                productivity : "10",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(400)
            .then((res) => {
                res.text.should.equal("Enjoyment must be 0 - 10");
            });
        });

        it('Should attempt to post a new record and return a 400 due to enjoyment being out of lower bounds', async function() {
            const req = {
                userId : userId,
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "-1",
                productivity : "10",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(400)
            .then((res) => {
                res.text.should.equal("Enjoyment must be 0 - 10");
            });
        });

        it('Should attempt to post a new record and return a 400 due to invalid user ID format', async function() {
            const req = {
                userId : "Invalid user ID format",
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "5",
                productivity : "5",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(400)
            .then((res) => {
                res.text.should.equal("Invalid user ID format");
            });
        });

        it('Should attempt to post a new record and return a 404 due to user not being found', async function() {
            const req = {
                userId : "479ab090-6f6a-11ed-9e2e-197e7892078b",
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2022-11-22T20:25:43.511Z",
                enjoyment : "5",
                productivity : "5",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(404)
            .then((res) => {
                res.text.should.equal("User not found");
            });
        });


        it('Should attempt to post a new record and return a 400 due to end before start', async function() {
            const req = {
                userId : userId,
                description : "Test description",
                notes : "Test notes",
                start : "2022-11-21T18:25:43.511Z",
                end : "2021-11-22T20:25:43.511Z",
                enjoyment : "5",
                productivity : "5",
                categoryId : categoryId
            }
            await request(app)
            .post('/records')
            .send(req)
            .expect(400)
            .then((res) => {
                res.text.should.equal("Start date must be before end date");
            });
        });
    });
});
