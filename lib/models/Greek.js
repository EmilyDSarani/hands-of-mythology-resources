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
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM greeks'
    );
    return rows.map((row) => new Greek(row));
  }
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM greeks where id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Greek(rows[0]);
  }
  static async updatedById(id, { name, title, romanName }){
    const result = await pool.query('SELECT * FROM greeks WHERE id=$1', [id]);
    const currentGreek = result.rows[0];

    if(!currentGreek){
      const error = new Error(`God/Goddes ${id} not found`);
      error.status = 404;
      throw error;
    }
    const { rows } = await pool.query(
      'UPDATE greeks SET name=$2,title=$3, roman_name=$4 WHERE id=$1 RETURNING *', [id, name, title, romanName]
    );
    return new Greek(rows[0]);
  }
};
