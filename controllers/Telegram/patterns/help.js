
const patterns = ['h', 'help'];

const handlePattern = ({ on, getHelp }) =>
  on(patterns, (message, reply) => {
    reply(getHelp());
  });

module.exports = handlePattern;
