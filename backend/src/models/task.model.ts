import { prop, getModelForClass, Ref, modelOptions, index, Severity } from "@typegoose/typegoose";
import { Project } from "./project.model";
import { User } from "./user.model";

@index({ title: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Task {
  @prop({ required: true })
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => Project })
  project: Ref<Project>;  // Reference to the related project

  @prop({ ref: () => User })
  assignedTo: Ref<User>;  // User assigned to this task

  // @prop({ default: Date.now })
  @prop({ required: true })
  dueDate: string;

  @prop({ default: "pending" })
  status: string;  // Example values: "pending", "in-progress", "completed"

  @prop({ default: Date.now })
  completedAt: Date | null;
}

const taskModel = getModelForClass(Task);
export default taskModel;
