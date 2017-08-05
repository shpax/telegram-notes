
class Conversation {
  constructor(id, flow) {
    this.id = id;
    this.flow = flow;

    this.progress = 0;
  }

  handleMessage(message) {
    this.flow[this.progress](message, this);

    if (this.flow[++this.progress]) {
      return true;
    }
    return false;
  }
}

module.exports = Conversation;
