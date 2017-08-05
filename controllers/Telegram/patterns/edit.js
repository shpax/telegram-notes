
const patterns = [/^e\s\d+/, /^edit\s\d+/];

const handlePattern = ({ on, notesModel }) =>
  on(patterns, (message, reply) => {
    const { text, chat } = message;
    const user_id = chat.id;
    try {
      const [match, note_id, newText] = text.match(/^[^\s]+\s(\d+)\s(.+)/);
      notesModel.updateNote(user_id, note_id, newText, (err) => {
        reply(err || 'note updated')
      })
    } catch (e) {
      reply('info not full, use `edit/e/E [id] [text]');
    }
  });

module.exports = handlePattern;
