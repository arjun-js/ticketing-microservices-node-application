import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';

import {validateRequest} from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';



const router = express.Router();

router.post('/api/users/signin', [body('email').isEmail().withMessage('Email must be valid'), body('password').trim().notEmpty().withMessage('Password must be supplied')],
validateRequest,
   async (req: Request, res : Response) => {

    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch){
        throw new BadRequestError('Invalid credentials');
    }

    const userJWT = jwt.sign({
        email : existingUser.email,
        id: existingUser.id
      },process.env.JWT_KEY!);
  
      req.session = {
        jwt : userJWT
      }
  
      res.status(200).send(existingUser);





    })

export { router as signInRouter }