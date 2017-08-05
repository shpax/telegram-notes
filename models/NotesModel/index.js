const mysql = require('mysql');

class NotesModel {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
    this.connection.connect();
  }

  createNote(user_id, text, tag_main, tag_secondary = '') {
    return {
      user_id: Number(user_id),
      text,
      tag_main,
      tag_secondary
    }
  }

  addNote(note, callback) {
    this.connection.query('INSERT INTO notes SET ?', note, callback)
  }

  getNotes(user_id, tag, callback) {
    const escapedUserId = mysql.escape(user_id);
    const escapedTag = mysql.escape(tag.trim());
    const query = `SELECT id, text FROM notes WHERE user_id=${escapedUserId} AND (tag_main=${escapedTag} OR tag_secondary=${escapedTag})`;

    this.connection.query(query, callback)
  }

  getTags(user_id, callback) {
    this.connection.query(`SELECT DISTINCT tag_main FROM notes WHERE user_id=${Number(user_id)}`, (err, res) => {
      if (res && res.length) {
        res = res.map(row => row.tag_main);
      }
      callback(err, res);
    });
  }

  updateNote(user_id, id, text, callback) {
    id = Number(id);
    user_id = Number(user_id);
    this.connection.query(`UPDATE notes SET text=${mysql.escape(text)} WHERE user_id=${user_id} AND id=${id}`, callback)
  }

  removeNote(user_id, id, callback) {
    id = Number(id);
    user_id = Number(user_id);
    this.connection.query(`DELETE FROM notes WHERE id=${id} AND user_id=${user_id}`, callback);
  }
}

module.exports = NotesModel;