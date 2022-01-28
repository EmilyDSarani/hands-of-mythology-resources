const pool = require('../utils/pool');

module.exports = class Greek {
  id;
  name;
  title;
  romanName;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.title = row.title;
    this.romanName = row.roman_name;
  }

  static async insert({ name, title, romanName }){
    const { rows } = await pool.query('INSERT INTO greeks(name, title, roman_name) VALUES ($1, $2, $3) RETURNING *', [name, title, romanName] 
    );
    return new Greek(rows[0]);
  }
};
