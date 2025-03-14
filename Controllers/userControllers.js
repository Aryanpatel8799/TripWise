const userService = require('../Services/userService');
const {body,validationResult, cookie} = require('express-validator');
const User = require('../DB_Model/userModel');

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

  const token=newUser.generateAuthToken();
  
  res.status(201).json({newUser,token})
}

module.exports.loginUser = async (req,res) => {
  const error = validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
  }
  const {email,password} = req.body;

  const user = await User.findOne({email}).select('+password');
  if(!user){
    return res.status(404).json({message:"Email or Password is invalid"});
  }

  const isMatched = await user.comparePassword(password);

  if(!isMatched){
    return res.status(401).json({message:"Email or Password is invalid"});
  }
  const token=user.generateAuthToken();  
  res.cookie('token', token);
  res.status(200).json({user,token});
}
