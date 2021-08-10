const bcrypt = require("bcrypt");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

var displayLoading = function(message) {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function() {
      process.stdout.write("\r \t "+ message+" ... " + P[x++]);
      x &= 3;
    }, 250);
  };

( async function hashPassword() {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const password = 'Hare Krishna';

    encryptedPassword = await bcrypt.hash(password, salt);
    console.log('Your password is: ' + password);

    // show lodaing for generating hash of password
    var i = displayLoading('Encrypting Password');
    setTimeout(function () { clearInterval(i); }, 3000);
    
    // display hashed password
    setTimeout(function ()
    {
        // Put the object into storage
        localStorage.setItem('testPassword', encryptedPassword);
        console.log ("\n Encrypted password is : "+ encryptedPassword)
    }, 3000)

})()

async function checkPassword (password) {
    // Retrieve the data from storage
    var retrievedObject = localStorage.getItem('testPassword');
        if (retrievedObject) {
            const comparePassword = await bcrypt.compare(password, retrievedObject);
            if (comparePassword) {
                console.log(":) Password Matched");
            } else {
                console.log("Sorry password could not match :( ");
            }
        }
}

setTimeout(function ()
{
    checkPassword('Hare Krishna');
}, 4000)

