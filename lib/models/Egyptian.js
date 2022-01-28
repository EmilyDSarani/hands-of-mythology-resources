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
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM egyptians where id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Egyptian(rows[0]);
  }
  static async updatedById(id, { name, title, animal }){
    const result = await pool.query('SELECT * FROM egyptians WHERE id=$1', [id]);
    const currentEgyptian = result.rows[0];

    if(!currentEgyptian){
      const error = new Error(`God/Goddes ${id} not found`);
      error.status = 404;
      throw error;
    }
    const { rows } = await pool.query(
      'UPDATE egyptians SET name=$2,title=$3, animal=$4 WHERE id=$1 RETURNING *', [id, name, title, animal]
    );
    return new Egyptian(rows[0]);
  }

};
