const should = require('should');
const validation = require('../../../src/app/util/validation');

describe('validation', function(){
    it('Check if a valid UUID returns true', function(){
        (validation.checkIfValidUUID("2045aae0-6b91-11ed-8141-65131ed8e112")).should.be.exactly(true);
    });
    it("check if a non valid UUID returs false", function(){
        (validation.checkIfValidUUID("Not a valid UUID")).should.be.exactly(false);
    });
    it("Check is returns true on a valid email", function(){
        (validation.checkIfValidEmail("validemail@email.com")).should.be.exactly(true);
    
    });
    it("Check is returns false on a non email", function(){
        (validation.checkIfValidEmail("validemail@emailcom")).should.be.exactly(false);
    });
    it("Check string length returns true on a boundary case", function(){
        (validation.checkStringLength("abc",3, 3)).should.be.exactly(true);
    });
    it("Check string length returns false outter upper bounds", function(){
        (validation.checkStringLength("abcd",3, 3)).should.be.exactly(false);
    });
    it("Check string length returns false outter lower bounds", function(){
        (validation.checkStringLength("ab",3, 3)).should.be.exactly(false);
    });
    it("Check returns true on a valid word: 'word'", function(){
        (validation.checkIfValidWord("word")).should.be.exactly(true);
    });
    it("Check returns false on a word containing speical characters 'w@r$'", function(){
        (validation.checkIfValidWord("w@r$")).should.be.exactly(false);
    });
    it("Check returns false on a word containing numbers 'w34pd'", function(){
        (validation.checkIfValidWord("w34pd")).should.be.exactly(false);
    });
});