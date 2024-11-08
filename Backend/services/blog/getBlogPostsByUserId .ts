import { getDB } from "../../config/db";
import { BlogPost } from "../../types/blogPostTypes";
import { ObjectId } from "mongodb";

const blogPostCollection = () => getDB().collection<BlogPost>("blogs");

export const getBlogPostsByUserId = async (
  userId: string | ObjectId
): Promise<BlogPost[]> => {
  console.log("Received userId:", userId);

  // Check if userId is a string and convert to ObjectId if necessary
  let userObjectId: ObjectId;
  if (typeof userId === "string") {
    if (ObjectId.isValid(userId)) {
      userObjectId = new ObjectId(userId);
      console.log("Converted userId string to ObjectId:", userObjectId);
    } else {
      console.error("Invalid userId format:", userId);
      throw new Error(
        "Invalid userId format. Must be a 24-character hex string."
      );
    }
  } else {
    userObjectId = userId;
    console.log("userId is already an ObjectId:", userObjectId);
  }

  // Log the final userObjectId to be used in the query
  console.log("Final userObjectId used in query:", userObjectId);

  // Query MongoDB for posts by the user's ObjectId
  const posts = await blogPostCollection()
    .find({ authorId: userObjectId.toHexString() })
    .toArray();

  console.log("Query result for posts by userObjectId:", posts);
  return posts;
};
