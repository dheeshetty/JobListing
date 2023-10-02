const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'))

app.set('view engine', 'ejs');

const User = mongoose.model('User',{
    Name : String,
    Email : String,
    Mobile : Number,
    Password : String,
})

app.get('/', (req, res) => {
    res.json({ status: 'active', service: 'Job listing backend'})
  })


app.post('/register', async (req, res) =>{

    try{//get the user data from request body
        const {Name, Email, Mobile, Password} = req.body;

        const encryptedPass = await bcrypt.hash(Password,10)

        if(!Name || !Email || !Mobile || !Password) {
            return res.status(500).json({message : 'ALL fields are Required'});
        }

        const existingUser = await User.findOne({Email});
        if(existingUser){
            return res.status(500).json({message : 'Email already Registered'});
        }
        const newUser = new User({Name, Email, Mobile, Password:encryptedPass});
        await newUser.save();

        const jwtToken = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET,{expiresIn: 20})

        res.json({message: 'Register Successfully',jwtToken});
        
        } catch(error){ 
            console.error(error);
            res.status(500).json({ message: 'Registration failed' });
        }
})

app.post('/login', async(req, res) =>{
    try{
        const {Email, Password} = req.body;
        if(!Email || !Password){
            return res.status(500).json({message: 'Email and Password are required'})
        }
        
        const user = await User.findOne({Email});

        const passMatch = await bcrypt.compare(Password, user.Password)

        if(!user || !passMatch){
            return res.status(500).json({ message: 'Invalid email or password' });
        }
        const jwtToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET,{expiresIn: 20})
        res.json({status: 'SUCCESS', message:`${user.Name} Logged in Successfully` ,jwtToken})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
})




  app.listen(process.env.PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
      .catch(error => console.log(error));
  })
  