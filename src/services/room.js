import server from 'server';

class Room {
  creator = null;
  messages = [];
  users    = [];

  constructor(model) {
    this.model = model;
    this.creator = model.creator;
    this.messages = model.messages;
    this.users = model.users;
  }

  populate() {
    return server.get('/api/rooms/'+this.model._id).then((response)=> {
      const model = response.content;
      this.creator = model.creator;
      this.messages = model.messages;
      this.users = model.users;
    });
  }

  save() {
    return server.put('/api/rooms/'+this.model._id, this.model);
  }

  postMessage() {
    const data = {
      content: this.newMessage,
      received: false,
      user: this.user.model._id
    }

    this.messages.push(data);
    this.newMessage = '';
    this.save();
  }
}


export { Room }
