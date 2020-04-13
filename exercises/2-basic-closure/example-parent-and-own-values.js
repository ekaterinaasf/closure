const closeIt = (parentParam) => {
  const parentLocal = "parent frame : " + parentParam;
  return function (ownParam) {
    const ownLocal = "own frame : " + ownParam;
    return { parentParam, parentLocal, ownParam, ownLocal };
  };
};
const closure1 = closeIt("a");
const result1 = closure1("b");

const closure2 = closeIt("c");
const result2 = closure2("d");

console.log("closure1: " + closure1);
console.log("result1: " + result1);
console.log("closure2: " + closure2);
console.log("result2: " + result2);
