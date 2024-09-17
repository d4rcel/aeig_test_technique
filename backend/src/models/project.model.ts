import { prop, getModelForClass, Ref, index, modelOptions } from "@typegoose/typegoose";
import { User } from "./user.model";

@index({ title: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
})
export class Project {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ ref: () => User })
  owner: Ref<User>;  // Reference to the user who created the project

  @prop({ ref: () => User })
  members: Ref<User>[];  // Array of users assigned to the project

  // @prop({ default: Date.now })
  @prop({ required: true })
  dueDate: string;

  @prop({ default: "active" })
  status: string; // Example values: "active", "completed", "archived"
}

const projectModel = getModelForClass(Project);
export default projectModel;
