
const patterns = ['t', 'tags', 'т'];

const handlePattern = ({ on, notesModel }) =>
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

module.exports = handlePattern;
