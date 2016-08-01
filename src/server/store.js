import sockets from 'sockets';

export class Store {

  users        = [];
  usersmap_    = {};

  projects     = [];
  projectsmap_ = {};

  categories = [];

  constructor(server) {

  }
}

Store.instance = new Store();

export default Store.instance;

