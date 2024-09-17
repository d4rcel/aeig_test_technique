import { prop, getModelForClass, Ref, modelOptions } from "@typegoose/typegoose";
import { User } from "./user.model";
import { Project } from "./project.model";

@modelOptions({
  schemaOptions: {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
})
export class Message {
  @prop({ ref: () => Project, required: true })
  projectId: Ref<Project>;  // Reference to the project chat room

  @prop({ ref: () => User, required: true })
  sender: Ref<User>;  // The user who sent the message

  @prop({ required: true })
  content: string;  // The message content

  @prop({ default: Date.now })
  timestamp: Date;
}

const messageModel = getModelForClass(Message);
export default messageModel;
