import express from 'express'

const router = express.Router();

//lOGIN PAGE
router.get('/login',(req,res)=> res.render('login'));

//Register Page
router.get('/register',(req,res)=> res.render('register'));

//Register handle

router.post('/register', (req,res)=>{
const {name, email, password, password2} = req.body;

let errors =[];

//check required fields

if(!name || !email || ! password || !password2){
   errors.push({msg: 'Please fill in all fields'})
}

//check password match

if(password !== password2){
    errors.push({msg:"Password Not Match "})
}

//check password length
if(password.length<6){
    errors.push({msg:"Password must be 6 character"});
}  

if(errors.length>0){
    res.render('register',{
        errors,
        name,
        email,
        password,
        password2
    })
}else{
    res.send("pass")
}

});
export default router;   