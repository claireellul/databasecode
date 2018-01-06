function printMsg() {
  console.log("This is a message from the demo package");
}


// the module.exports line gives a list of any of the functions in the module that can be called 
// from outside the module
module.exports = {
    printMsg: printMsg
}; 