import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  content: string;
  blogPostId: ObjectId;
  authorId: ObjectId;
  createdAt: Date;
}
