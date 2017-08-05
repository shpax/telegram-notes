
const handleDefault = ({ setDefaultMessageHandler, notesModel }) =>
  setDefaultMessageHandler((message, reply) =>
    notesModel.getNotes(message.chat.id, message.text, (err, notes) => {
      if (!notes || !notes.length) {
        return reply('no notes were found');
      }
      let maxIdLetters = String(notes[notes.length-1].id).length;
      const text = notes
        .map(n => {
          let idStr = String(n.id);
          while (idStr.length < maxIdLetters) {
            idStr = ' ' + idStr;
          }
          return `\`${idStr}: \`${n.text}`
        })
        .join("\n");
      reply(text);
    })
  );

module.exports = handleDefault;
