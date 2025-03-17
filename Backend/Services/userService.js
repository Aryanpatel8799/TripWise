const User = require('../DB_Model/userModel');

module.exports.createUser = async ({firstName,lastName,email,password}) => {
    
    if(!firstName || !email || !password){
        throw new Error('All fields are required');
    }
     
    try{
        const user = await User.create({
            fullName:{
                firstName,
                lastName
            },
            email,
            password
        })
        return user;
        
    }
    catch(error){
        throw new Error(error);
    }

   
        
}
