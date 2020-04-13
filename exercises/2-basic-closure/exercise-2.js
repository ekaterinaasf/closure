const closeIt = (parentParam) => {
  return function (ownParam) {
    return ownParam + parentParam;
  };
};

const closure1 = closeIt(3); //f(arg)=>arg+3;
const closure2 = closeIt("3"); //f(arg)=>arg+"3"

const result1 = closure1(8); //11
const result2 = closure2(8); //"83"
console.assert(result1 === 11, "result 1");
console.assert(result2 === "83", "result 2");

const result3 = closure1(true); //true+3=4
const result4 = closure2(true); //"true3"
console.assert(result3 === 4, "result 3");
console.assert(result4 === "true3", "result 4");

const result5 = closure1("4");
const result6 = closure2(4);
console.assert(result5 === result6, "results 5 & 6");
