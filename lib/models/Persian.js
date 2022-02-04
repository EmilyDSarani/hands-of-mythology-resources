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
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM persians where id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Persian(rows[0]);
  }
  static async updatedById(id, { name, title, funFact }){
    const result = await pool.query('SELECT * FROM persians WHERE id=$1', [id]);
    const currentPersian = result.rows[0];

    if(!currentPersian){
      const error = new Error(`God/Goddes ${id} not found`);
      error.status = 404;
      throw error;
    }
    const { rows } = await pool.query(
      'UPDATE persians SET name=$2,title=$3, fun_fact=$4 WHERE id=$1 RETURNING *', [id, name, title, funFact]
    );
    return new Persian(rows[0]);
  }
  static async deleteById(id){
    const { rows } = await pool.query(
      'DELETE FROM persians WHERE id=$1 RETURNING *', [id]
    );
    if(!rows[0]) return null;

    return new Persian(rows[0]);
  }

};
