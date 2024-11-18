const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const User = require("../model/userModel")
const nodemailer = require('nodemailer');




const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authCtrl = {
    sendMail: async (req, res) => {
        const {email } = req.body;
        
        
        const {verificationtoken} = req.headers;
        if(verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
            return res.status(401).json({message: "You are blocked"})
        }
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "This is email already exists!"})
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    
        try {
            const config = {
                service: 'gmail',
                auth: {
                    user: 'aba06096@gmail.com',
                    pass: 'ehty zgha skkp zgdo'
                }
            };
    
            let transporter = nodemailer.createTransport(config);
            const output = `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 0 auto;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        overflow: hidden;
                    "
                    >
                    <div style="background-color: #f2f2f2; padding: 20px; text-align: center">
                        <img
                        src="https://api.logobank.uz/media/logos_png/volontyorlari_assotsiatsiyasi-01.png"
                        alt="Logo"
                        style="width: 300px; height: 200px; object-fit: cover"
                        />
                    </div>
                    <div
                        style="
                        background-color: #ebecf0;
                        color: #babecc;
                        padding: 15px 20px;
                        text-align: center;
                        "
                    >
                        <h2 style="margin: 0; font-size: 24px">
                        Код подтверждения для аккаунта
                        </h2>
                    </div>
                    <div style="padding: 20px; color: #333">
                        <p>Уважаемый пользователь!</p>
                        <p>
                        Мы получили запрос на доступ к вашему аккаунту
                        <strong>${email}</strong>. Ваш код подтверждения:
                        </p>

                        <div style="text-align: center; margin: 10px 0">
                        <h2 style="font-size: 30px; color: red">${verificationCode}</h2>
                        </div>
                        <p>Ваш адрес ${email}. Вы получили это письмо для подтверждения входа.</p>
                        <p>Если вы не ввели этот адрес, значит кто-то пытается зарегистрироваться с помощью этой учетной записи. Пожалуйста, будьте осторожны</p>
                    </div>
                    <div
                        style="
                        background-color: #f2f2f2;
                        padding: 15px;
                        text-align: center;
                        color: #777;
                        "
                    >
                        <p style="margin: 0">С уважением,</p>
                        <p style="margin: 5px 0">Команда Volontyor</p>
                    </div>
                </div>
            `;
    
            const msg = {
                to: [email],
                from: '"Volontyor" <aba06096@gmail.com>',
                subject: 'Email Verification Code',
                html: output
            };
    
            await transporter.sendMail(msg);

            const data = {
                verificationCode,
                email
            }
    
            res.status(200).send({ message: 'Verification code sent successfully',  result: data});
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ message: 'Failed to send verification code' });
        }
    },
    signup: async (req, res) => {   
        const {email} = req.body
        const {verificationtoken} = req.headers;
        if(verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
            return res.status(401).json({message: "You are blocked"})
        }
        try {
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return res.status(400).json({message: "This is email already exists!"})
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
        
        const {email} = req.body
        const {verificationtoken} = req.headers;
        if(verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
            return res.status(401).json({message: "You are blocked"})
        }
        try {
            const findUser = await User.findOne({email});   
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

    googleAuth: async (req, res) => {
        const { email } = req.body;
        const { verificationtoken } = req.headers;
      
        if (verificationtoken !== 'ulamYPMnafsAsJJXdSfqjZaSICreybtXN' || !verificationtoken) {
          return res.status(401).json({ message: "You are blocked" });
        }
      
        try {
          const findUser = await User.findOne({ email });
      
          if (findUser) {
            const token = JWT.sign(
              { email: findUser.email, _id: findUser._id, role: findUser.role },
              JWT_SECRET_KEY
            );
      
            res.status(200).json({ message: "Login successfully", user: findUser, token });
          } else {
            const newUser = await User.create(req.body);
      
            // Convert newUser to a plain object before signing the token
            const token = JWT.sign(newUser.toObject(), JWT_SECRET_KEY, {
              expiresIn: "2h",
            });
      
            res.status(201).json({
              message: "Register successfully",
              user: newUser,
              token,
            });
          }
        } catch (error) {
          res.status(503).json({ message: error.message });
        }
      },
      
    facebookAuth: async (req, res) => {
        try {
            const { accessToken } = req.body;

            // Verify the access token with Facebook
            const fbResponse = await axios.get(
            `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
            );
            const { email, name, id, picture } = fbResponse.data;

            // Check if user already exists in your database
            let user = await User.findOne({ email });
            if (!user) {
            // Create a new user if not found
            user = await User.create({ email, name, facebookId: id, profileImage: picture.data.url });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '2h',
            });

            res.status(200).json({ message: 'Login successful', user, token });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = authCtrl