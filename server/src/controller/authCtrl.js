const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt') 
const twilio = require('twilio');

const User = require("../model/userModel")




const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authCtrl = {
    sendSMS: async (req, res) => {
        const { phoneNumber } = req.body;
        const { verificationtoken } = req.headers;

    // Check for the correct verification token
    if (verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
        return res.status(401).json({ message: "You are blocked" });
    }

    // Check if the user already exists
    // const existingUser = await User.findOne({ phoneNumber });
    // if (existingUser) {
    //     return res.status(400).json({ message: "This number already exists!" });
    // }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    try {
        // Initialize the Twilio client with environment variables
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
        const msgOption = {
            from: '+17755426998',
            to: phoneNumber,
            body: `Sizning tasdiqlash kodingiz: ${verificationCode}`
        }
        const msg = await client.messages.create(msgOption)
        console.log(msg);
        return res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        console.error('Error sending SMS:', error);
        return res.status(500).json({ message: 'Failed to send verification code' });
    }
    },
    signup: async (req, res) => {   
        const {phoneNumber} = req.body
        const {verificationtoken} = req.headers;
        if(verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
            return res.status(401).json({message: "You are blocked"})
        }
        try {
            const existingUser = await User.findOne({phoneNumber});
            if(existingUser) {
                return res.status(400).json({message: "This is phoneNumber already exists!"})
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
  
            const user = new User(req.body);
            await user.save();
            const {password, ...otherDetails} = user._doc
            const token = JWT.sign(otherDetails, JWT_SECRET_KEY, {expiresIn: '2h'});

            res.status(201).json({message: 'Signup successfully', user: otherDetails, token})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },

    login: async (req, res) => {
        
        const {phoneNumber} = req.body
        const {verificationtoken} = req.headers;
        if(verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
            return res.status(401).json({message: "You are blocked"})
        }
        try {
            const findUser = await User.findOne({phoneNumber});   
            if(!findUser){
                return res.status(400).json({message: 'Login or Password is inCorrect'});
            }
            const verifyPassword = await bcrypt.compare(req.body.password, findUser.password);
            if(!verifyPassword){
                return res.status(400).json({message: 'Login or Password is inCorrect'})
            }
            const {password, ...otherDetails} = findUser._doc
            const token = JWT.sign(otherDetails, JWT_SECRET_KEY, {expiresIn: '2h'})

            res.status(200).json({message: 'Login successfully', user: otherDetails, token})
        } catch (error) {
            res.status(503).json({message: error.message})
        }
    },
}

module.exports = authCtrl