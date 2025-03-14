const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

    fullName:{
        firstName:{
            type:String,
            minlength:[3,'First Name must be at least 3 characters'],
            required:[true,'First Name is required']
        },
        lastName:{
            type:String,
            minlength:[3,'Last Name must be at least 3 characters'],
        }
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        isEmail:true,
        minlength:[10,'Email must be at least 10 characters'],
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[8,'Password must be at least 8 characters'],
    },  
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const User = mongoose.model('User',userSchema);

module.exports = User;

