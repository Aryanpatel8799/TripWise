const userService = require('../Services/userService');
const {body,validationResult, cookie} = require('express-validator');
const User = require('../DB_Model/userModel');
const { models } = require('mongoose');
const blackListTokenModel = require('../DB_Model/blackListTokenModel');

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

module.exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ error: "Token not found" });
  }
  res.clearCookie('token');
  const blacklistTokenDoc = new blackListTokenModel({ token });
  await blacklistTokenDoc.save();
  res.status(200).json({ message: "Logout Successfully" });
}
module.exports.updateProfile = async (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  const {fullName,email,phone,profileImage} = req.body;
  const user = await User.findByIdAndUpdate(req.user._id,{
    fullName,
    email,
    phone,
    profileImage
  },{new:true});
  res.status(200).json({user});
}

module.exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Cloudinary upload is handled by multer-storage-cloudinary
    const imageUrl = req.file.path;

    // Update user profile with new image URL
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: imageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
      message: 'Profile image updated successfully'
    });
  } catch (error) {
    console.error('Profile image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading profile image',
      error: error.message
    });
  }
};