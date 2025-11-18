console.log('Hello, JavaScript!');
function greet(name = 'World') {
  return `Hello, ${name}!`;
};
module.exports = { greet };

//Current Temp In Kelvin Degrees.
const kelvin = 293;
//Converting Kelvin to Celsius
const celsius = kelvin - 273;
// round down variable
let fahrenheit = celsius * (9 / 5) + 32;
fahrenheit = Math.floor(fahrenheit);
console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
const groceryList = ['orange juice', 'bananas', 'coffee beans', 'brown rice', 'pasta', 'coconut oil', 'plantains'];

groceryList.shift();

console.log(groceryList);

groceryList.unshift('popcorn');

console.log(groceryList);

console.log(groceryList.slice(1, 4));

console.log(groceryList);

const pastaIndex = groceryList.indexOf('pasta');

console.log(pastaIndex);
groceryList.push('cereal');

console.log(groceryList);
