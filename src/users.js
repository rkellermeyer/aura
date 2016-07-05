export class Users {
  index = [
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
  ];

  getUserByAge(age) {
    return this.index.find(p => p.age === age);
  }
}
