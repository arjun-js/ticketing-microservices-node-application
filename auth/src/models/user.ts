import mongoose from 'mongoose';


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