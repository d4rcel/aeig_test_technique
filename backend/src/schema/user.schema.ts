import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    role: string({ required_error: "Role is required" }),
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
    password: string({ required_error: "Password is required" })
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Invalid email or password"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Invalid email or password"
    ),
  }),
});

export const verifyEmailSchema = object({
  params: object({
    verificationCode: string(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>["params"];
