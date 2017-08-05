const byDefault = require('./default');
const edit = require('./edit');
const help = require('./help');
const newNote = require('./new');
const remove = require('./remove');
const tags = require('./tags');

function applyAll(tg) {
  byDefault(tg);
  edit(tg);
  help(tg);
  newNote(tg);
  remove(tg);
  tags(tg);
}

module.exports = {
  byDefault,
  edit,
  help,
  newNote,
  remove,
  tags,
  applyAll
};
