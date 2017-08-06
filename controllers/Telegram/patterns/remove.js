
const patterns = [/^rm?\s\d+/, /^remove\s\d+/];

const handlePattern = ({ on, notesModel, addHelpLine }) => {
  on(patterns, (message, reply) => {
    const { text, chat } = message;
    const user_id = chat.id;
    const note_id = Number(text.replace(/^[^\s]+\s/,''));

    notesModel.removeNote(user_id, note_id, err => {
      notesModel.getTags(user_id, (error, tags) => {
        reply(err || error || 'note deleted', tags.slice(0,10).map(t => [t]));
      });
    })
  });

  addHelpLine("type `rm|remove [id] ` to remove note");
};


module.exports = handlePattern;
