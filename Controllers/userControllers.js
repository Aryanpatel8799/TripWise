const userService = require('../Services/userService');
const {body,validationResult} = require('express-validator');
const User = require('../DB_Model/userModel');
const { use } = require('../app');

module.exports.registerUser = async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  const {fullName,email,password} = req.body;
  const isUserExist=await User.findOne({email});
  if(isUserExist)
  {
    return res.status(400).json({message:"user already exist"});
  }
  const hashPassword = await User.hashPassword(password);

  const newUser = await userService.createUser({

    firstName:fullName.firstName,
    lastName:fullName.lastName,
    email,
    password:hashPassword
  })

  const token=newUser.generateAuthToken;
  
  res.status(201).json({newUser,token})
}
