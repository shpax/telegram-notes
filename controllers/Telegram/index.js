const request = require('request');
const async = require('async');
const Conversation = require('./Conversation');

function createTelegramBot({ botId, notesModel }) {

  const patternMessageHandlers = [];
  const conversations = {};
  let help = '';
  let defaultMessageHandler = null;

  function method(name, data) {
    return request.post(`https://api.telegram.org/bot${botId}/${name}`).form(data);
  }

  function sendMessage(chat_id, text, keyboard) {
    const reply_markup = JSON.stringify({ keyboard });
    method('sendMessage', { chat_id, text, parse_mode: 'Markdown', reply_markup });
  }

  function createReply(message) {
    return (text, keyboard) => {
      sendMessage(message.chat.id, text, keyboard);
    }
  }

  function on(patterns, listener) {
    if (patterns.constructor.name !== 'Array') {
      patterns = [ patterns ];
    }

    patternMessageHandlers.push({ patterns, listener });
  }

  function setDefaultMessageHandler(listener) {
    defaultMessageHandler = listener;
  }

  function createMessageRunner(message, reply) {
    return ({ patterns, listener }) => {
      const canHandle = patterns.some(pattern => {
        const text = message.text.toLowerCase();
        if (pattern.constructor.name === 'RegExp') return !!text.match(pattern);
        if (pattern.constructor.name === 'String') return text.trim() === pattern.trim();
        return false;
      });

      if (canHandle) {
        listener(message, reply);

        return true;
      }
      return false;
    }
  }

  function startConversation(user_id, startingMessage, flow) {
    const c = new Conversation(user_id, flow);
    conversations[user_id] = c;

    c.handleMessage(startingMessage);
  }

  function handleMessage(message) {
    const user_id = message.chat.id;
    const reply = createReply(message);

    if (conversations[user_id]) {
      if (!conversations[user_id].handleMessage(message)) {
        delete conversations[user_id];
      }
      return;
    }

    patternMessageHandlers.some(createMessageRunner(message, reply))
    || defaultMessageHandler && defaultMessageHandler(message, reply)
  }

  function addHelpLine(line) {
    help += line + "\n";
  }

  function getHelp() {
    return help;
  }

  return {
    notesModel,
    handleMessage,
    on,
    setDefaultMessageHandler,
    startConversation,
    addHelpLine,
    getHelp,
  }
}

module.exports = createTelegramBot;