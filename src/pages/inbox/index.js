import {inject} from 'aurelia-dependency-injection';
import {User} from 'services/user';
import server from 'server';
import portal from 'app-portal';

@inject(User)
class Inbox {

  searchValue = '';
  activeRoom = null;
  editMode = false;

  constructor(user) {
    this.user = user;


    this.user.rooms.forEach((room)=> {
      room.populate();
    });

    portal.navAction = {
      title: 'Compose',
      method: ()=> {
        this.user.createRoom().then((room)=> {
          this.activeRoom = room;
        })
      }
    }
  }

  activate() {
    server.get('/api/users').then(responce => {
      this.users = responce.content;
    })
  }

  selectRoom(room) {
    this.activeRoom = room;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  destroyRoom(room) {

  }
}

export {Inbox}
