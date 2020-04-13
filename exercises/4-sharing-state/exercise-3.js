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
