const pool = require('../utils/pool');

module.exports = class Norse {
  id;
  name;
  characteristic;
  power;

  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.characteristic = row.characteristic;
    this.power = row.power;
  }
  static async insert({ name, characteristic, power }){
    const { rows } = await pool.query('INSERT INTO norses(name, characteristic, power) VALUES ($1, $2, $3) RETURNING *', [name, characteristic, power] 
    );
    return new Norse(rows[0]);
  }
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM norses'
    );
    return rows.map((row) => new Norse(row));
  }
  static async getById(id){
    const { rows } = await pool.query(
      'SELECT * FROM norses where id=$1', [id]
    );
    if(!rows[0]) return null;
    return new Norse(rows[0]);
  }
  static async updatedById(id, { name, characteristic, power }){
    const result = await pool.query('SELECT * FROM norses WHERE id=$1', [id]);
    const currentNorse = result.rows[0];

    if(!currentNorse){
      const error = new Error(`God/Goddes ${id} not found`);
      error.status = 404;
      throw error;
    }
    const { rows } = await pool.query(
      'UPDATE norses SET name=$2,characteristic=$3, power=$4 WHERE id=$1 RETURNING *', [id, name, characteristic, power]
    );
    return new Norse(rows[0]);
  }
  static async deleteById(id){
    const { rows } = await pool.query(
      'DELETE FROM norses WHERE id=$1 RETURNING *', [id]
    );
    if(!rows[0]) return null;

    return new Norse(rows[0]);
  }
};
