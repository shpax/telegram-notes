
const patterns = [/^n\s/, /^н\s/,/^new\s/];

const handlePattern = ({ on, notesModel, startConversation }) =>
  on(patterns, (message, reply) => {
    const user_id = message.chat.id;

    return startConversation(user_id, message, [
      ({ text }, conv) => {
        conv.note = {
          user_id,
          text: text.replace(/^[^\s]+\s/,'')
        };
        notesModel.getTags(user_id, (err, tags) => {
          reply('please, write a tag for this note', tags.slice(0, 10).map(t => [t]));
        })
      },
      ({ text }, conv) => {
        const [tag_main, tag_secondary = ''] = text.split(' ', 2);
        conv.note.tag_main = tag_main;
        conv.note.tag_secondary = tag_secondary;

        notesModel.addNote(conv.note, (err) => {
          if (err) {
            reply(err);
          } else {
            notesModel.getTags(user_id, (err, tags) => {
              reply('your note has been saved', tags.slice(0,10).map(t => [t]));
            })
          }
        })
      }
    ]);
  });

module.exports = handlePattern;
