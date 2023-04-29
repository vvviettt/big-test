import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

@Schema()
class SurveyOption {
    @Prop()
    label: string;

    @Prop()
    vote: string;
}

@Schema({ timestamps: true })
export class Post {
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
        type: [],
        default: []
    })
    images: string[];
    @Prop({
        type: Array<SurveyOption>,
        default: []
    })
    surveyOptions: SurveyOption[];
}
export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
