import express, { Request, Response } from "express";
import passport from "passport";

const router = express.Router();

//google auth
router.get("/google" ,passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req: Request, res: Response) => {
    const redirectUrl = `https://blogify-phi.vercel.app/?token=${req.user}`;
    res.redirect(redirectUrl);
  }
);

//github auth
router.get("/github", passport.authenticate("github"));

router.get("/github/callback",
  passport.authenticate("github", { session: false }),
  async (req: Request, res: Response) => {
    const redirectUrl = `https://blogify-phi.vercel.app/?token=${req.user}`;
    res.redirect(redirectUrl);
  }
);

export default router;
