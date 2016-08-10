import {Container} from 'aurelia-dependency-injection';
import {observable} from 'aurelia-binding';
import state from 'app-state';
import channel from 'core/channel';
import {UserLoggedIn, UserLoggedOut} from 'core/actions';
import {Room} from './room';
import server from 'server';
import sockets from 'sockets';

export class User {
  @observable firstName;
  @observable lastName;
  @observable middle;
  @observable prefix;
  @observable suffix;
  @observable bio;
  @observable email;

  rooms = [];

  static authorize(model) {
    User.instance.authorize(model);
    console.log('User logged in', User.instance)
    sockets.connect();
    channel.publish(new UserLoggedIn(User.instance))
    return User.instance;
  }

  static unauthorize() {
    if (User.instance) {
      User.instance.unauthorize();
      channel.publish(new UserLoggedOut(User.instance))
      console.log('User logged out', User.instance)
    }
    return User.instance;
  }

  authorize(model) {
    this.model     = null;
    this.profile   = model.user_profile;
    this.firstName = this.profile.first_name;
    this.lastName  = this.profile.last_name;
    this.prefix    = this.profile.prefix;
    this.suffix    = this.profile.suffix;
    this.middle    = this.profile.middle_initial;
    this.bio       = this.profile.bio;
    this.role      = model.role;
    this.email     = model.email;
    this.projects  = model.projects || []
    this.model     = model;
    this.mapRooms(model.rooms);
    this.mapProjects()
  }

  unauthorize() {
    this.model = null;
    this.firstName = null;
    this.lastName  = null;
    this.prefix    = null;
    this.suffix    = null;
    this.middle    = null;
    this.bioName   = null;
    this.profile   = null;
    this.email     = null;
    this.rooms     = [];
  }

  _mapProject(project) {
    this.projects[project._id] = project;
    project.isPrivate = true;

    project.select = ()=> {
      this.projects.selectedProject = project;
    }

    Object.defineProperty(project, 'isSelected', {
      get:()=> {
        return this.projects.selectedProject === project;
      }
    })
    let index = this.projects.indexOf(project);
    if (index === -1) {
      this.projects.push(project);
    }
  }

  _mapRoom(room) {
    room = new Room(room);
    room.user = this;
    this.rooms.push(room);
    this.rooms[room.model._id] = room;
    return room;
  }

  mapRooms(rooms) {
    rooms.forEach(r => this._mapRoom(r));
  }

  mapProjects() {
    this.projects.forEach(project => {
      this._mapProject(project);
    })
  }

  propertyChanged(key, value) {
    console.log(key, value)
  }

  firstNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.first_name = value;
      this.updateSockets();
    }
  }

  lastNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.last_name = value;
      this.updateSockets();
    }
  }

  prefixChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.prefix = value;
      this.updateSockets();
    }
  }

  suffixChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.suffix = value;
      this.updateSockets();
    }
  }

  middleChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.user_profile.middle_initial = value;
      this.updateSockets();
    }
  }

  emailNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.email = value;
      this.updateSockets();
    }
  }

  bioNameChanged(value) {
    if (this.model) {
      this.isDirty = true;
      this.model.bio = value;
      this.updateSockets();
    }
  }

  createProject(project) {
    project.user = this.model._id;
    project.user_id = this.model.id;

    if (!project.title) {
      return Promise.reject('Title required');
    }

    return server.post('/api/project_profiles', project)
      .then(resp => {
        this._mapProject(resp.content)
      })
  }

  createRoom() {
    return server.post('/api/rooms', {user: this.model}).then((room)=> {
      this.model.rooms.push(room);
      return this._mapRoom(room);
    })
  }

  updateSockets() {
    sockets.publish(`user:update`, this.model);
  }


  save() {
    this.isDirty = false;
  }
}



User.instance = new User();
Container.instance.registerInstance(User, User.instance);
