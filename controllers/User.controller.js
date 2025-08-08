const User = require("../models/User.model");

exports.fetchAllUsers = async(req,res) =>{
    try{
        const users = await User.find();
        // console.log("Users",users)
        res.status(200).json(users)
    }catch(error) {
        res.status(400).json(error)
    }
}

exports.fetchUserById = async(req,res) =>{
    const {userId} = req.params;

    try{
        const user = await User.findOne({wa_id: userId});
        // console.log("Users",users)
        res.status(200).json(user)
    }catch(error) {
        res.status(400).json(error)
    }
}
