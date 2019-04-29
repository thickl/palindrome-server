import * as express from "express";
import {
  checkPalindrome,
  checkPalindromes,
  getPalindromes
} from "../controllers/palindrome.controller";

const router = express.Router();

const palindromeBaseRoute = "/palindromes";

/* GET home page. */
router.get(`${palindromeBaseRoute}/`, getPalindromes);
router.post(`${palindromeBaseRoute}/`, checkPalindromes);
router.post(`${palindromeBaseRoute}/:value`, checkPalindrome);

console.log(`http://localhost:4000/api${palindromeBaseRoute}/`);

export default router;
