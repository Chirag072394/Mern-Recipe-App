import {User} from '../Models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    const {name,gmail,password} = req.body

    try{
        let user = await User.findOne({gmail})

        if(user) return res.json({message:"User Already Existed"});

        const hashPass = await bcrypt.hash(password,10)
        user = await User.create({name,gmail,password:hashPass})

        res.json({message:"User Regsitered Successfully",user})

    }catch(error){
        res.json({message:error})
    }

    console.log(req.body)
}

export const login = async(req,res)=>{
    const {gmail,password}= req.body

    try{
        let user = await User.findOneAndUpdate({gmail})

        if(!user) return res.json({message:"user not exist..!"})

        const validPass = await bcrypt.compare(password,user.password);

        if(!validPass) return res.json({message:"Invalid Credential"})

            const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
                expiresIn:'1d'
            })

            res.json({message: `${user.name} logged in Successfully`,token})
        }
        catch(error){
            res.json({message:error.message})
        }
}

export const profile = async(req,res)=>{
    res.json({user : req.user})
}
