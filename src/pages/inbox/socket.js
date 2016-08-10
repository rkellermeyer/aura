import {observable} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {User} from 'services/user';
import sockets from 'sockets';
import server from 'server';

@inject(User)
class InboxSockets {

  @observable room;

  constructor(user) {
    this.publish   = sockets.publish.bind(sockets);
    this.subscribe = sockets.subscribe.bind(sockets);
    this.user = user;
    this.rooms = this.user.rooms;
    this.mapRooms();
  }

  _mapRoom(room) {
    this.rooms[room.recipient] = room;

    room.select = ()=> {
      this.room = room;
    }
  }

  mapRooms() {
    this.rooms.forEach(r => this._mapRoom(r));
  }

  createRoom(email) {
    const data = {
      user: this.user.model,
      recipient: email
    };

    return server.post('/api/rooms', data).then((response)=> {

    })
  }

  publishMessage() {

  }
}
