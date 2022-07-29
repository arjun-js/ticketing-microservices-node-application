import express from 'express';
import {json} from 'body-parser';
import mongoose from 'mongoose';

import 'express-async-errors';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import cookieSession from 'cookie-session';

import {errorHandler} from './middlewares/error-handler';

import { NotFound } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(cookieSession({
    //when signed is fale, the npm package will not encrypt the cookie.
    signed : false,
    secure: true,
}))


app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// app.use(cookieSession({
//     name : 'session', 
//     keys : ['key1', 'key2']
// }));

app.all('*', async ()=>{
    throw new NotFound();
});

app.use(errorHandler);

const start = async ()=>{
    if(!process.env.JWT_KEY){
        throw new Error('JWT key not found');
    }
try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to mongo db');
}

catch(err){
   console.log('error occured', err);
}
    
app.listen(3000, ()=>{
    console.log('listening on port 3000 !!');
});


}

start();

