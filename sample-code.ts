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
