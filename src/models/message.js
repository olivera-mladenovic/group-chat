import mongoose from "mongoose";

const schema = mongoose.Schema;

const schemaMessage = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    message: String,
    name: String
});

export default mongoose.model("Message", schemaMessage);