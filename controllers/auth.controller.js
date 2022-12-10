const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try{
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: 'Password is mandatory!'});
        }
        const hashValue = await bcrypt.hash(payload.password, 15);
        payload.hashedPassword = hashValue;
        delete payload.password;

        let newUser = new Users(payload);
        newUser.save((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while registering the user!'})
            }

            res.status(201).send({userId: data._id, message: 'User has been registered successfully.'})
        })

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.signin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const existingUser = await Users.findOne({email: email});

        if(existingUser){
            const isValidCredentials = await bcrypt.compare(password, existingUser.hashedPassword); //true or false

            if(isValidCredentials){
                const token = jwt.sign({_id: existingUser._id}, 'asdadfsgbdfvsd');
                res.cookie('accessToken',token, {expire: new Date() + 8640000 });
                return res.status(200).send({accessToken: token, userId: existingUser._id,  message: 'User has been signed in sucessfully.' })
            }
            return res.status(400).send({message: 'Username/Password are not matching.'})
        }

        res.status(400).send({message: 'User doesnt exist with the given email.'})

    }catch(err){
        res.status(500).send({message: 'Internal Server Error'});
    }    
}

exports.signout = async (req, res) => {
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'User signed out successfully'})
    }catch(error){
        res.status(500).send({message : 'Internal Server Error'});
    }
}