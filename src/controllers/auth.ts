import { Request, Response, RequestHandler } from "express";

export const generateAuthLink: RequestHandler = (req: Request, res: Response) => {
    console.log(req.body)
    res.json({ OK: true })
}