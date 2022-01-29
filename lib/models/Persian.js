const pool = require('../utils/pool');

module.exports = class Persian {
  id;
  name;
  title;
  funFact;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.title = row.title;
    this.funFact = row.fun_fact;
  }
  static async insert({ name, title, funFact }){
    const { rows } = await pool.query('INSERT INTO persians(name, title, fun_fact) VALUES ($1, $2, $3) RETURNING *', [name, title, funFact] 
    );
    return new Persian(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM persians'
    );
    return rows.map((row) => new Persian(row));
  }

};
