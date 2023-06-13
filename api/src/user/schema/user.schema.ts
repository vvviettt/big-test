import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

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
    @Prop({ default: null, type: String })
    description: string;
    @Prop({ required: true, type: String })
    password: string;
    @Prop({ default: null, type: String })
    avatar: string;
    @Prop({ default: null, type: String })
    coverImage: string;
    @Prop({ required: true, type: Date })
    dateOfBirth: Date;
    @Prop({ default: [], type: [Types.ObjectId] })
    following: ObjectId[];
    @Prop({ default: [], type: [Types.ObjectId] })
    followers: ObjectId[];
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
