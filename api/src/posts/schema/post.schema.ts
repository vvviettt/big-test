import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

@Schema()
class SurveyOption {
    @Prop({ type: String, required: true })
    label: string;

    @Prop({ type: Types.Array, default: 0 })
    vote: ObjectId[];
}

@Schema({
    timestamps: true
})
class Comment {
    @Prop({ type: Types.ObjectId })
    id: ObjectId;
    @Prop({ type: Types.ObjectId, required: true })
    owner: ObjectId;
    @Prop({ type: String, required: true })
    content: string;
}

@Schema({
    timestamps: true
})
@Schema({
    timestamps: true
})
class Share {
    @Prop({ type: Types.ObjectId, required: true })
    userId: ObjectId;
}

@Schema({ timestamps: true })
export class Post {
    @Prop({ type: Types.ObjectId, required: true })
    ownerId: ObjectId;
    @Prop({
        type: String,
        required: true
    })
    content: string;

    @Prop({
        type: Number,
        default: 0
    })
    mode: number;
    @Prop({
        type: String
    })
    surveyTitle: string;
    @Prop({
        type: Number
    })
    surveyTime: number;
    @Prop({
        type: [],
        default: []
    })
    images: string[];
    @Prop({
        type: Array<SurveyOption>,
        default: []
    })
    surveyOptions: SurveyOption[];
    @Prop({
        type: Array<Comment>,
        default: []
    })
    comments: Comment[];
    @Prop({
        type: Array<ObjectId>,
        default: []
    })
    like: ObjectId[];
    @Prop({
        type: Array<Share>,
        default: []
    })
    share: Share[];
}
export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
