const should = require('should');
const app = require('../src/app');

describe('app', function(){
    it('app should return hello', function(){
        (app.sayHello()).should.be.exactly('hello');
    })
});