# event-loop 

## /4-sharing-state

> syntaxError: 13/04/2020, 16:22:54 

[../REVIEW.md](../REVIEW.md)

* [/example-1-pure-functions.js](#example-1-pure-functionsjs) - example - pass
* [/example-2-pure-closures.js](#example-2-pure-closuresjs) - example - syntaxError
* [/example-3-mutating-closures.js](#example-3-mutating-closuresjs) - example - pass
* [/exercise-1.js](#exercise-1js) - pass
* [/exercise-2.js](#exercise-2js) - pass
* [/exercise-3.js](#exercise-3js) - pass

---

## /example-1-pure-functions.js

* example - pass
* [review source](./example-1-pure-functions.js)

```txt
+ PASS : assert 1
+ PASS : assert 2
+ PASS : assert 3
+ PASS : assert 4
+ PASS : assert 5
+ PASS : assert 6
+ PASS : assert 7
+ PASS : assert 8
```

```js
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

```

[TOP](#event-loop)

---

## /example-2-pure-closures.js

* example - syntaxError
* [review source](./example-2-pure-closures.js)

```txt
 [ ... ] /exercises/4-sharing-state/example-2-pure-closures.js:21
console.assert(concatPigs1() === "- pigs, "assert 1");
                                 ^^^^^^^^^^

SyntaxError: missing ) after argument list
    at wrapSafe (internal/modules/cjs/loader.js:1067:16)
    at Module._compile (internal/modules/cjs/loader.js:1115:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1171:10)
    at Module.load (internal/modules/cjs/loader.js:1000:32)
    at Function.Module._load (internal/modules/cjs/loader.js:899:14)
    at Module.require (internal/modules/cjs/loader.js:1040:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at evaluate ( [ ... ] /review.js:229:7)
    at Object.<anonymous> ( [ ... ] /review.js:244:1)
    at Module._compile (internal/modules/cjs/loader.js:1151:30)
```

```js
// closeIt creates pure closures
// because the returned functions never modify the closed variable
// calling the closed functions with the same args always returns the same result

const closeNonMutatingFunctions = (str) => {
  return [
    function () {
      return str + " pigs";
    },
    function (param) {
      return str + param;
    },
  ];
};

let closedFunctions1 = closeNonMutatingFunctions("-"); //[f=>"- pigs",f(p)=>"-"+p]
const concatPigs1 = closedFunctions1[0],
  concatParam1 = closedFunctions1[1];
closedFunctions1 = null;

console.assert(concatPigs1() === "- pigs, "assert 1");
console.assert(concatPigs1() === "- pigs", "assert 2"); //corrected
console.assert(concatParam1(" rock!") === "- rock!", "assert 3");
console.assert(concatParam1(" rock!") === "- rock!", "assert 4"); //corrected

let closedFunctions2 = closeNonMutatingFunctions("hoy"); //[f=>'hoy pigs', f(p)=>"hoy"+p]
const concatPigs2 = closedFunctions2[0],
  concatParam2 = closedFunctions2[1];
closedFunctions2 = null;

console.assert(concatPigs2() === "hoy pigs", "assert 5");
console.assert(concatPigs2() === "hoy pigs", "assert 6"); //corrected
console.assert(concatParam2(" cheese!") === "hoy cheese!", "assert 7");
console.assert(concatParam2(" cheese!") === "hoy cheese!", "assert 8"); //corrected

```

[TOP](#event-loop)

---

## /example-3-mutating-closures.js

* example - pass
* [review source](./example-3-mutating-closures.js)

```txt
+ PASS : assert 1
+ PASS : assert 2
+ PASS : assert 3
+ PASS : assert 4
+ PASS : assert 5
+ PASS : assert 6
+ PASS : assert 7
+ PASS : assert 8
```

```js
// closeIt creates impure closures
// because the returned functions DO modify the closed variable
// calling the closed functions with the same args will not always return the same result

function closeMutatingFunctions(str) {
  return [
    function () {
      return (str += " pigs");
    },
    function (param) {
      return (str += param); //impure closure
    },
  ];
}

let closedFunctions1 = closeMutatingFunctions("-"); //[f=>"- pigs",f(p)=>"-"+p]
const concatPigs1 = closedFunctions1[0],
  concatParam1 = closedFunctions1[1];
closedFunctions1 = null; //for what reason we do that??

console.assert(concatPigs1() === "- pigs", "assert 1");
console.assert(concatPigs1() === "- pigs pigs", "assert 2");
console.assert(concatParam1(" rock!") === "- pigs pigs rock!", "assert 3");
console.assert(
  concatParam1(" rock!") === "- pigs pigs rock! rock!",
  "assert 4"
);

let closedFunctions2 = closeMutatingFunctions("hoy");
const concatPigs2 = closedFunctions2[0],
  concatParam2 = closedFunctions2[1];
closedFunctions2 = null;

console.assert(concatPigs2() === "hoy pigs", "assert 5");
console.assert(concatPigs2() === "hoy pigs pigs", "assert 6");
console.assert(
  concatParam2(" cheese!") === "hoy pigs pigs cheese!",
  "assert 7"
);
console.assert(
  concatParam2(" cheese!") === "hoy pigs pigs cheese! cheese!",
  "assert 8"
);

```

[TOP](#event-loop)

---

## /exercise-1.js

* pass
* [review source](./exercise-1.js)

```txt
+ PASS : assert str4
```

```js
const str0 = "";

function concatPigs(str) {
  return str + " pigs";
}
function concatParam(str, param) {
  return str + " " + param;
}

const str1 = concatPigs(str0); //" pigs"

const str2 = concatParam(str1, " rock!"); //" pigs rock!"

const str3 = concatPigs(str2); //" pigs rock! pigs"

const str4 = concatParam(str2, str3); //" pigs rock! pigs rock! pigs"

console.assert(str4 === " pigs  rock!  pigs  rock! pigs", "assert str4");
//console.log(str4);

```

[TOP](#event-loop)

---

## /exercise-2.js

* pass
* [review source](./exercise-2.js)

```txt
+ PASS : assert str4
```

```js
const closeIt = (str) => {
  return [
    function () {
      return str + " pigs";
    },
    function (param) {
      return str + param;
    },
  ];
};

let closedFunctions = closeIt("-"); //[f=>"- pigs",f(p)=>"-"+p]
const concatPigs = closedFunctions[0],
  concatParam = closedFunctions[1];
closedFunctions = null;

const str1 = concatPigs(); //"- pigs"

const str2 = concatParam(" rock!"); //"- rock!"

const str3 = concatPigs(); // "- pigs"

const str4 = concatParam(str3); //"-- pigs"

console.assert(str4 === "-- pigs", "assert str4");
//console.log(str3);

```

[TOP](#event-loop)

---

## /exercise-3.js

* pass
* [review source](./exercise-3.js)

```txt
+ PASS : assert str4
```

```js
const closeIt = (str) => {
  return [
    function () {
      return (str += " pigs");
    },
    function (param) {
      return (str += param);
    },
  ];
};

let closedFunctions = closeIt("-"); //[f=>"-"+=" pigs",f(p)=>"-"+=p]
const concatPigs = closedFunctions[0],
  concatParam = closedFunctions[1];
closedFunctions = null; //Why??

const str1 = concatPigs(); //"- pigs"

const str2 = concatParam(" rock!"); //"- rock!"

const str3 = concatPigs(); //"- pigs pigs"

const str4 = concatParam(str3); //"- rock!- pigs pigs"

console.assert(str4 === "- pigs rock! pigs- pigs rock! pigs", "assert str4");

```

[TOP](#event-loop)

