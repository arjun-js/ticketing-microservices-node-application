import mongoose from 'mongoose';
import { transform } from 'typescript';
import { Password } from '../services/password';


//interface to know what is required to create user
interface UserAttrs {
    email : string;
    password: string;
}

//interface to enable TypeScript to read the static functions

interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): any
}

//interface to know about the created document, (mongoose may add extra properties sometimes like createdAt, updatedAt)

interface UserDoc extends mongoose.Document {
    email : string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true 
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done){
    //this will be user document here.

    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();

});

userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}



const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// User.build({email : 'sa', password: 'ss'});

// const builduser = (attrs: userAttrs)=>{
//     return new User(attrs);
// }


export {User};