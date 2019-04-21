import * as express from "express";
import { get, sortBy } from "lodash";

const palindromes: string[] = ["Anna", "Hanna", "Rotator"];
const nonPalindromes: string[] = ["Test", "AngularJS", "Google"];

function isPalindrome(value: string): boolean {
  const trimmedValue = value.trim().toLocaleLowerCase();
  return (
    Boolean(trimmedValue) &&
    trimmedValue ===
      trimmedValue
        .split("")
        .reverse()
        .join("")
  );
}

function addPalindrome(value: string): void {
  if (palindromes.indexOf(value) === -1) {
    palindromes.push(value);
  }
}

function addNonPalindrome(value: string): void {
  if (nonPalindromes.indexOf(value) === -1) {
    nonPalindromes.push(value);
  }
}

export function checkPalindrome(
  req: express.Request,
  res: express.Response
): void {
  const value: string = req.params.value || "";
  const palindrome: boolean = isPalindrome(value);

  res.send({ value, palindrome });
}

// tslint:disable:variable-name
export function getPalindromes(
  req: express.Request,
  res: express.Response
): void {
  let values: string[] = [...palindromes];

  if (req.query.include === "all") {
    values = [...values, ...nonPalindromes];
  }

  res.send(sortBy(values));
}

export function checkPalindromes(
  req: express.Request,
  res: express.Response
): void {
  const action: string = req.query.action;
  const values: string[] = get(req.body, ["values"], []);

  switch (action) {
    case "check":
      res.send(values.filter(value => isPalindrome(value)));
      return;

    default:
      postValue(req, res);
      return;
  }
}

export function postValue(req: express.Request, res: express.Response): void {
  const value: string = get(req.body, ["value"]);

  if (value) {
    if (isPalindrome(value)) {
      addPalindrome(value);
      res.send(palindromes);
    } else {
      addNonPalindrome(value);
      res.send(nonPalindromes);
    }
  } else {
    res.status(404).send("Not found");
  }
}
