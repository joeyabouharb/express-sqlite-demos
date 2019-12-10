/* eslint-disable no-console */
const Sqlite = require('sqlite3');
/**
 * Creates a connection to a database to handle read/write access.
 * returns result as a Promise
 * PRIVATE CLASS
 */
class _DAO extends Sqlite.Database {
  /**
   *
   * @param {String} connection
   */
  constructor(connection) {
    super(connection, console.error);
  }

  /**
     * @param {String} sql
     * @param {Object} params
     * @returns Promise
     */
  READ(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.all(sql, params, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    })
      .catch(console.error);
  }

  /**
    * @param {String} sql
    * @param {Object} params
    * @returns Promise
    */
  WRITE(sql, params) {
    return new Promise((resolve, reject) => {
      this.run(sql, params, function onExec(err) {
        if (err) reject(err);
        resolve(this.lastID);
      });
    })
      .catch(console.error);
  }
}
/**
 * DAO Factory:
 *
 * Builds the Data Access Layer for the workshop database
 * using the connection string configured in environment.
 */
const workshopDBConnection = () => new _DAO('./db/joey_workshop.db');

const establishConnection = (string) => new _DAO(`./db/${string}.db`);

module.exports = {
  workshopDBConnection,
  establishConnection,
};
