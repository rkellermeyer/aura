



export class User {
  constructor(parent) {
    this.parent = parent;
  }

  updateName(name) {
    this.parent.current.name = name;
  }

  get() {}
  put() {}
  delete() {}
}


export class Users {
  index = [
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
    {name: 'bob', age: 22},
  ];

  current = null;

  constructor() {
    this.model = new User(this);
    this.current = this.index[0];
  }

  get() {}
  put() {}
}


export class State {

  users = new Users();

  constructor() {
  }
}

