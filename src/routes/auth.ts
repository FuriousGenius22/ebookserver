import { generateAuthLink } from "@/controllers/auth";
import { emailValidationSchema, validate } from "@/middlewares/validate";
import { RequestHandler, Router } from "express";
import { z, ZodRawShape } from "zod";

const authRouter = Router();


authRouter.post(
  "/generate-link",
  validate(emailValidationSchema),
  generateAuthLink
);

export default authRouter;
