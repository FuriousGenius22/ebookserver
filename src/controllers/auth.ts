import { Request, Response, RequestHandler } from "express";
import crypto from "crypto";
import VerificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer"

export const generateAuthLink: RequestHandler = async (req, res) => {
  // Generate authentication link
  // and send that link to the users email address

  /*
    1. Generate Unique token for every users
    2. Store that token securely inside the database
       so that we can validate it in future.
    3. Create a link which include that secure token and user information
    4. Send that link to user's email address.
    5. Notify user to look inside the email to get the login link
  */

  const { email } = req.body;

  let user = await UserModel.findOne({ email });

  if (!user) {
    // if no user found then create new user.
    user = await UserModel.create({ email });
  }
  const userId = user._id.toString();

  // if we already have token for this user it will remove that first
  await VerificationTokenModel.findOneAndDelete({ userId });



  const randomToken = crypto.randomBytes(36).toString("hex");

  let verificationToken = await VerificationTokenModel.create<{ userId: string }>({

    userId: user._id.toString(),
    token: randomToken,
  });
  console.log(JSON.stringify(verificationToken, null, 2))
  console.log(JSON.stringify(user, null, 2))

  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6efbb933efad3e",
      pass: "83594a23da0ec7"
    }
  });
  const link = `http://localhost:8989/verify?token=${randomToken}&userId=${userId}`
  await transport.sendMail({
    to: user.email,
    from: 'verification@myapp.com',
    subject: 'Auth Verification',
    html: `
      <div>
        <p>Please click on <a href = "${link}">this link</a> to verify your account</p>
      </div>
    `

  })

  res.json({ message: "Please check your email for link" });
};