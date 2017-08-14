import { Document, Model, Schema} from "mongoose";
import connection from "../dBase";

interface IExample {
    email: string;
    firstName?: string;
    lastName?: string;
}

interface IUserModel extends IExample, Document {
    fullName(): string;
}

const UserSchema: Schema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
}, {timestamps: true});

UserSchema.methods.fullName = function(this: IExample): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const UserModel: Model<IUserModel> = connection.model<IUserModel>("User", UserSchema);

export default UserModel;
