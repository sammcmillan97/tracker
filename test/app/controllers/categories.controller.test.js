const  { app } = require('../../testApp');
const { sequelize } = require('../../../models');
const should = require('should');
const request = require('supertest');

describe('Categories end point testing', function(){

    before('Mock db connection and load app', async function() {
        try {   
            await sequelize.sync({ force: true })
            await sequelize.authenticate();
        } catch(err) {
            console.log(err)
        }

    });

    describe('POST /Categories', function() {

        it('Should create a new category and return 201. Should get the new category and return 200', async function() {
            const req = {
                name : "Test"
            }
            const category = await request(app)
                .post('/categories')
                .send(req)
                .expect(201)
                .then((res) => {       
                    return res;             
                })
            await request(app)
                .get('/categories/' + category.body.id)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((res) => {
                    res.body.should.have.property('name').equal("Test");
                });
            });

            it('Should attempt to make a new category and return 400 because the name length is out of lower bound', async function() {
                const req = {
                    name : ""
                }
                await request(app)
                    .post('/categories')
                    .send(req)
                    .expect(400)
                    .then((res) => {       
                        res.text.should.equal("Invalid name format: Name must have a length between 1 and 30 characters and contain no speical characters");        
                    })
            });

            it('Should attempt to make a new category and return 400 because the name length is out of upper bound', async function() {
                const req = {
                    name : "REALLY REALLY REALLY LONG LONG LONG LONG LONG category name"
                }
                await request(app)
                    .post('/categories')
                    .send(req)
                    .expect(400)
                    .then((res) => {       
                        res.text.should.equal("Invalid name format: Name must have a length between 1 and 30 characters and contain no speical characters");        
                    })
            });

            it('Should attempt to create a category with the same name and return 400', async function() {
                const req = {
                    name : "Test"
                }
                await request(app)
                    .post('/categories')
                    .send(req)
                    .expect(400)
                    .then((res) => {       
                        res.text.should.equal("name must be unique");                  
                    })
            });

            it('Should attempt to make a new category and return 400 because the name length is out of lower bound', async function() {
                const req = {
                }
                await request(app)
                    .post('/categories')
                    .send(req)
                    .expect(400)
                    .then((res) => {       
                        res.text.should.equal("Request body missing required parameters");        
                    })
            });
        });

        describe('GET /Categories/id', function() {
            let categoryId
            before('Create a category', async function() {
                const req = {
                    name : "Get"
                }
                await request(app)
                .post('/categories')
                .send(req)
                .expect(201)
                .then((res) => {       
                    categoryId = res.body.id           
                })
            });
            
            it('Should get the category created', async function() {
                await request(app)
                    .get('/categories/' + categoryId)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((res) => {
                        res.body.should.have.property('name').equal("Get");
                    });
            });

            it('Should attempt to get a category but return 400 because of invalid ID format', async function() {
                await request(app)
                    .get('/categories/' + "Invalid format")
                    .expect(400)
                    .then((res) => {
                        res.text.should.equal("Invalid user ID format")
                    });
            });

            it('Should attempt to get a category but return 404 because the category doesnt exist', async function() {
                await request(app)
                    .get('/categories/' + "479ab090-6f6a-11ed-9e2e-197e7892078b")
                    .expect(404)
                    .then((res) => {
                        res.text.should.equal("Category not found");
                    });
            });

        });

        describe('GET /Categories', function() {
            
            before('Mock db connection and load app', async function() {
                try {   
                    await sequelize.sync({ force: true })
                } catch(err) {
                    console.log(err)
                }
            });

            it('Should get the category created', async function() {
                await request(app)
                    .get('/categories')
                    .expect(404)
                    .then((res) => {
                        res.text.should.equal("No Categories in the database");
                        console.log(res.body);
                    });
            });
    
            it('Should create a category and then get all categories returning 200', async function() {
                const req = {
                    name : "Get"
                }
                await request(app)
                .post('/categories')
                .send(req)
                .expect(201)
                await request(app)
                    .get('/categories')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((res) => {
                        res.body.length.should.equal(1)
                    });
            });
        });

        describe('DELETE /categories/id', function() {
            let categoryId;

            before('Mock db connection and load app', async function() {
                try {   
                    const req = {
                        name : "Delete"
                    }
                    await sequelize.sync({ force: true })
                    await request(app)
                    .post('/categories')
                    .send(req)
                    .expect(201)
                    .then((res) => {       
                        categoryId = res.body.id           
                    })
                } catch(err) {
                    console.log(err)
                }
            });

            it('Should attempt to delete the category and fail due to invalid category id', async function() {
                await request(app)
                    .delete('/categories/invalidID')
                    .expect(400)
                    .then((res) => {
                        res.text.should.equal("Invalid category ID format");
                    });
            });
            it('Should delete the category and return 200', async function() {
                await request(app)
                    .delete('/categories/' + categoryId)
                    .expect(200)
                    .then((res) => {
                        res.text.should.equal("Category: Delete deleted");
                    });
            });
            it('Should attempt to delete category and fail due to the category not being found', async function() {
                await request(app)
                    .delete('/categories/' + categoryId)
                    .expect(404)
                    .then((res) => {
                        res.text.should.equal("Category not found");
                    });
            });

        });
});