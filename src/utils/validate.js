const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailID, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter valid firstname and lastname");
    }

    else if(!validator.isEmail(emailID)){
        throw new Error("Enter valid Email ID");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
    }
}

module.exports={
    validateSignUpData,
}