class MessageHandler {
  constructor(message) {
    this.message = message;
    this.text = message.text;
    this.processed = false;
  }

  on(patterns, callback) {

    if (this.processed) return;

    if (patterns.constructor.name !== 'Array') {
      patterns = [ patterns ];
    }

    this.processed = patterns.some(pattern => {
      if (pattern.constructor.name === 'RegExp') return !!this.text.match(pattern);
      if (pattern.constructor.name === 'String') return this.text.trim() === pattern.trim();
      return false;
    });

    this.processed && callback(this.text);
  }

  default(callback) {
    if (!this.processed) callback(this.text);
  }
}

module.exports = MessageHandler;