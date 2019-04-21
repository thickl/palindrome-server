import * as express from "express";
import {
  checkPalindrome,
  checkPalindromes,
  getPalindromes
} from "../controllers/palindrome.controller";

const router = express.Router();

/* GET home page. */
router.get("/", getPalindromes);
router.post("/", checkPalindromes);
router.post("/:value", checkPalindrome);

export default router;
