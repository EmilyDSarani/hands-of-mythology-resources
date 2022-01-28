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

};
