// closeIt creates pure closures
// because the returned functions never modify the closed variable
// calling the closed functions with the same args always returns the same result

const concatPigs = (str) => {
  return str + " pigs";
};
const concatParam = (str, param) => {
  return str + param;
};

const str1 = "-";

console.assert(concatPigs(str1) === "- pigs", "assert 1");
console.assert(concatPigs(str1) === "- pigs", "assert 2"); //corrected
console.assert(concatParam(str1, " rock!") === "- rock!", "assert 3");
console.assert(concatParam(str1, " rock!") === "- rock!", "assert 4"); //corrected

const str2 = "hoy";

console.assert(concatPigs(str2) === "hoy pigs", "assert 5");
console.assert(concatPigs(str2) === "hoy pigs", "assert 6"); //corrected
console.assert(concatParam(str2, " cheese!") === "hoy cheese!", "assert 7");
console.assert(concatParam(str2, " cheese!") === "hoy cheese!", "assert 8"); //corrected
