
const patterns = ['t', 'tags', 'т'];

const handlePattern = ({ on, notesModel, addHelpLine }) => {
  on(patterns, (message, reply) =>
    notesModel.getTags(message.chat.id, (err, tags) => {
      if (err) {
        return reply(err)
      }
      if (!tags || !tags.length) {
        return reply('no tags for you for now')
      }

      reply('keyboard updated with 10 most recent tags:', tags.slice(0,10).map(t => [t]))
    })
  );

  addHelpLine("type `t|tags` to list 10 last tags");
};

module.exports = handlePattern;
