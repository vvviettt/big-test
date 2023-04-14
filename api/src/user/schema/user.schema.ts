import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
    @Prop({
        unique: true,
        required: true,
        type: String
    })
    email: string;
    @Prop({ required: true, type: String })
    firstName: string;
    @Prop({ required: true, type: String })
    lastName: string;
    @Prop({ required: true, type: String })
    password: string;
    @Prop({ required: true, type: Date })
    dateOfBirth: Date;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
