const { ObjectId } = require("mongodb");
const client = require("../db/client");

module.exports = class PostUtil {
  static async getPosts() {
    try {
      const collection = client.db("quebec").collection("posts");

      const posts = collection.find().sort("_id", -1).toArray();
      if (!posts) return false;

      return posts;
    } catch (err) {
      console.error("Error getting posts");
      return false;
    }
  }

  static async savePost(postData) {
    try {
      postData.status = postData.status.trim();
      postData.image_url = postData.image_url.trim();

      const collection = client.db("quebec").collection("posts");

      const response = await collection.insertOne(postData);

      if (!response) throw "Error saving post";

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deletePost(postId) {
    try {
      const collection = client.db("quebec").collection("posts");

      const response = await collection.deleteOne({
        _id: ObjectId(postId),
      });

      if (!response) throw "Error deleting post";

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async updatePost(postId, postData) {
    try {
      const collection = client.db("quebec").collection("posts");

      const filter = { _id: ObjectId(postId) };

      const updateDoc = {
        $set: {
          status: postData.status.trim(),
        },
      };

      const response = await collection.updateOne(filter, updateDoc);

      if (!response) throw new Error("Error updating post");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
