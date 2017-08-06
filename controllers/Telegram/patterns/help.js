
const patterns = ['h', 'help'];

const handlePattern = ({ on, getHelp, addHelpLine }) => {
  on(patterns, (message, reply) => {
    reply(getHelp());
  });

  addHelpLine("type `help|h` to get this message")
};

module.exports = handlePattern;
