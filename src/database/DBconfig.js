const { OPEN_CREATE } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose()



const criarTabela = (nome) =>{

  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE ,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  db.run(`CREATE TABLE IF NOT EXISTS teste(${nome} text)`)
  console.log('tabela criada com sucesso')
  db.close()
}

const inserirTabela = (nome) => {

  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE ,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  db.run(`INSERT INTO ${nome}(teste1) VALUES(?) `,['JOIA'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);

  } )

  db.close()
  

}

const mostrarTabela = (nome) =>{

  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE ,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  let sql = `SELECT * FROM ${nome}`

  db.all(sql,[], (err, rows) => {
    if(err){
      throw err
    }

    rows.forEach(row =>{
      console.log(row)
    })
  } )

  db.close()

}

const updateTabela = (table, column, flag,data)=>{

  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE ,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database');
  });

  let info = [data,flag]

  let sql = `UPDATE ${table} SET ${column} = ?  WHERE ${column} = ? `
  
  db.run(sql,info, function (err){
    if(err){
      return console.error(err.message)
    }
    console.log(`${this.changes} propriedade(s): ${column}`)

  })
}
const deleteTabela = (table, column, flag)=>{

  let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE ,(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database');
  });

  let info = [flag]

  let sql = `DELETE FROM ${table} WHERE ${column} = ? `
  
  db.run(sql,info, function (err){
    if(err){
      return console.error(err.message)
    }
    console.log(`propriedade(s): ${column} deletada`)

  })
}

mostrarTabela("teste","teste1", 'Certo')





