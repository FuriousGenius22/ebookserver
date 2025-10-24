import { RequestHandler, Router } from "express";
import { z, ZodRawShape } from "zod";


export const emailValidationSchema = {
    email: z.email("Invalid email!"),
}


export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
    return (req, res, next) => {
        const schema = z.object(obj);

        const result = schema.safeParse(req.body);

        if (result.success) {
            req.body = result.data;
            next();
        } else {
            const errors = result.error.flatten().fieldErrors;
            return res.status(422).json({ errors });
        }
    };
};