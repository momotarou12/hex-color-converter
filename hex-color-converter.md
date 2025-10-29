# How to Convert 3-Digit HEX Color Codes to 6-Digit (JS vs. TS)

In web development, you often need to convert 3-digit shorthand HEX color codes like `#f0c` into their 6-digit full form, like `#ff00cc`. This document explains how to perform this conversion in both JavaScript and TypeScript and discusses the differences between them.

## 1. Why Does JavaScript Code Cause Errors in TypeScript?

In a pure JavaScript environment, the following code works perfectly without any issues.

```javascript
// This is valid code in JavaScript
const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
```

However, if you bring this exact code into a TypeScript project with strict type-checking, you will often encounter an error message like this:

> `Unsafe return of a value of type 'any'. eslint(@typescript-eslint/no-unsafe-return)`
> `(parameter) r: any`

### Reason: TypeScript is Strict About Types

The root cause of this error is that TypeScript places a high value on **Type Safety**.

1.  TypeScript tries to automatically infer the types of the callback function's arguments `r`, `g`, and `b` in the `replace` method.
2.  However, in this context, it cannot be 100% certain of their types. Therefore, TypeScript temporarily treats these arguments as the **`any`** type, which means "anything goes."
3.  While convenient, the `any` type disables TypeScript's powerful type-checking features and can lead to unintentional bugs. For this reason, many quality-focused TypeScript projects use rules (often via ESLint) to treat the use of `any` as an error.

## 2. The TypeScript Solution: Explicitly Declare Types

Solving this issue is very simple. The developer needs to explicitly tell TypeScript what the type of each argument is.

```typescript
// Correct code in TypeScript
const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const fullHex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => r + r + g + g + b + b);
```

By simply adding `: string`, you inform TypeScript that `r`, `g`, and `b` are strings. TypeScript then understands that an operation like `r + r` is safe, and the error disappears.

---

## 3. Ready-to-Use Sample Code

Below is sample code that you can use immediately in your GitHub repositories or projects.

### Sample Code for TypeScript

In TypeScript projects, it is recommended to use the following function, which includes full type definitions.

```typescript
/**
 * Converts a 3-digit shorthand HEX color code to its 6-digit full form.
 * 
 * @param hex - The HEX color code to convert (e.g., "#f0c" or "f0c").
 * @returns The 6-digit HEX color code (e.g., "#ff00cc"). If the input is not a 3-digit shorthand, the original string is returned.
 */
function expandShorthandHexColor(hex: string): string {
  // A regex to match 3-digit HEX codes (e.g., #rgb)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  // Use the replace method to convert from 3 to 6 digits
  const fullHex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => {
    // Duplicate each captured character (r, g, b) and prefix with '#'
    return `#${r}${r}${g}${g}${b}${b}`;
  });

  return fullHex;
}

// --- Usage ---
console.log(expandShorthandHexColor("#f0c"));       // Output: #ff00cc
console.log(expandShorthandHexColor("08b"));         // Output: #0088bb
console.log(expandShorthandHexColor("#aabbcc"));     // Output: #aabbcc (not converted)
console.log(expandShorthandHexColor("hello"));       // Output: hello (not converted)
```

### Sample Code for JavaScript

In pure JavaScript projects, type definitions are not necessary. However, using **JSDoc comments** (`/** ... */`) improves the development experience by allowing editors like VSCode to provide type inference and autocompletion.

```javascript
/**
 * Converts a 3-digit shorthand HEX color code to its 6-digit full form.
 * 
 * @param {string} hex - The HEX color code to convert (e.g., "#f0c" or "f0c").
 * @returns {string} The 6-digit HEX color code (e.g., "#ff00cc"). If the input is not a 3-digit shorthand, the original string is returned.
 */
function expandShorthandHexColor(hex) {
  // A regex to match 3-digit HEX codes (e.g., #rgb)
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  // Use the replace method to convert from 3 to 6 digits
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => {
    // Duplicate each captured character (r, g, b) and prefix with '#'
    return `#${r}${r}${g}${g}${b}${b}`;
  });

  return fullHex;
}

// --- Usage ---
console.log(expandShorthandHexColor("#f0c"));       // Output: #ff00cc
console.log(expandShorthandHexColor("08b"));         // Output: #0088bb
console.log(expandShorthandHexColor("#aabbcc"));     // Output: #aabbcc (not converted)
console.log(expandShorthandHexColor("hello"));       // Output: hello (not converted)
```