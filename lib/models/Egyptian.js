const pool = require('../utils/pool');

module.exports = class Egyptian {
  id;
  name;
  title;
  animal;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.title = row.title;
    this.animal = row.animal;
  }
  static async insert({ name, title, animal }){
    const { rows } = await pool.query('INSERT INTO egyptians(name, title, animal) VALUES ($1, $2, $3) RETURNING *', [name, title, animal] 
    );
    return new Egyptian(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM egyptians'
    );
    return rows.map((row) => new Egyptian(row));
  }
  

};
