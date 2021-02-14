import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'


export interface IUser extends Document {
    user_name: string;
    user_id: string;
    mail: string;
    birthDay: Date;
    created_at: Date;
}

/** Scheema para usuarios */
const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,        
    },
    user_id: {
        type: String,
        unique: true,
    },
    mail: {
        type: String,
        required: true,
    },
    birthDay: {
        type: Date,
        default: 0,
    },
    created_at : {
        type : Date,
        default: Date.now
    }
});

UserSchema.plugin(mongoosePaginate);

const UserModel : PaginateModel<IUser> = model<IUser>('User',UserSchema);

export default UserModel;
