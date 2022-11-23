//Helpful validation uttility functions // 

/* Check if string is valid UUID */
function checkIfValidUUID(id) {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(id);
  }

  /* check if string is valid email */
 function checkIfValidEmail (email) {
    const regexExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regexExp.test(email.toLowerCase())
 }

 function checkStringLength(str, lower, upper) {
    if (lower <= str.length  &&  str.length <= upper) {
        return true 
    } else {
        return false
    }
 }

 function checkIfValidWord(string) {
    const regexExp = /^[a-zA-Z]+$/;
    return regexExp.test(string)
 }


  module.exports = {
    checkIfValidUUID,
    checkIfValidEmail,
    checkStringLength,
    checkIfValidWord
  };