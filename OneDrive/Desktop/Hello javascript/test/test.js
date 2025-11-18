const { expect } = require('chai');
const { greet } = require('../src/index');

describe('greet()', () => {
  it('greets the supplied name', () => {
    expect(greet('Alice')).to.equal('Hello, Alice!');
  });

  it('falls back to World when no name given', () => {
    expect(greet()).to.equal('Hello, World!');
  });
});
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
