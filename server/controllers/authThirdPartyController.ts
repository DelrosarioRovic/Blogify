import express, { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();


//google auth
router.get("/google" ,passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req: Request, res: Response) => {
    const userToken = req.user as any;
    const googleUser = {
      googleId: userToken.googleId,
    };
    const secret = process.env.userLocalSecret as string;
    const token = jwt.sign(googleUser, secret, { expiresIn: "1h" });
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    const redirectUrl = "http://localhost:5173";
    res.redirect(redirectUrl);
  }
);

//github auth
router.get("/github", passport.authenticate("github"));

router.get("/github/callback",
  passport.authenticate("github", { session: false }),
  async (req: Request, res: Response) => {
    const userToken = req.user as any;
    const googleUser = {
      googleId: userToken.googleId,
    };
    const secret = process.env.userLocalSecret as string;
    const token = jwt.sign(googleUser, secret, { expiresIn: "1h" });
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.redirect("http://localhost:5173");
  }
);

export default router;
