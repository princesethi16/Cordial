const User = require('../../../models/userSchema');
const jwt = require('jsonwebtoken');

const env = require('../../../config/environment');

// create new session for existing user (from sign in page to createSession to feed)
module.exports.createSession = async (req,res)=>{
    try{
        let user = await User.findOne({email: req.body.email}).select('+password');
        
        if(!user || user.password != req.body.password){
            return res.json(422,{
                data: {
                    message: 'invalid username/password'
                }
            });
        }

        else{
            return res.json(200,{
                data: {
                    message: 'logged in successfully',
                    token: jwt.sign(user.toJSON(),env.jwt_secretOrKey,{expiresIn: '300000'}),
                }
            });
        }
        
    }
    catch(err){
        return res.json(500,{
            data: {
                message: `Error in logging in user: ${err}`
            }
        });
    }
};
