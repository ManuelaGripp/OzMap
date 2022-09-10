const { use } = require('chai');
const { OPEN_CREATE } = require('sqlite3');

const sqlite3 = require('sqlite3').verbose()



const criarTabela = () => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  db.run(`CREATE TABLE IF NOT EXISTS User(nome TEXT, email TEXT, idade INTEGER)`)
  console.log('tabela criada com sucesso')
  db.close()
}

const inserirTabela = ({ nome, email, idade }) => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  db.run(`INSERT INTO User(nome,email,idade) VALUES(?,?,?)`, [nome, email, idade], function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Dados inseridos ${this.lastID}`);
  })

  db.close()


}

const getAllUsers = async () => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database');
  });

  let users = []

  await new Promise((resolve, reject) => {
    db.each("SELECT * FROM User", function (err, row) {
      if (err) {
        throw err
      }
      users.push(row)

      resolve()
    })
  })


  db.close()

  return users;

}

const getUser = async (nome) => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database.');
  });

  let sql = `SELECT * FROM User WHERE nome = (?) `

  await new Promise((resolve, reject) => {
    db.each(sql,[nome], function (err, row) {
      if (err) {
        throw err
      }
      users.push(row)

      resolve()
    })
  })

  db.all(sql, [nome], (err, rows) => {
    if (err) {
      throw err
    }

    rows.forEach(row => {
      console.log(row)
    })
  })

  db.close()

}



const updateTabela = (table, column, flag, data) => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database');
  });

  let info = [data, flag]

  let sql = `UPDATE ${table} SET ${column} = ?  WHERE ${column} = ? `

  db.run(sql, info, function (err) {
    if (err) {
      return console.error(err.message)
    }
    console.log(`${this.changes} propriedade(s): ${column}`)

  })
}
const deleteColuna = (flag) => {

  let db = new sqlite3.Database('./database/database.db', sqlite3.OPEN_READWRITE | OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Conectado ao database');
  });

  let info = [flag]

  let sql = `DELETE FROM User WHERE nome = ? `

  db.run(sql, info, function (err) {
    if (err) {
      console.log(err.message)
      return err.message
    }
    console.log(`propriedade(s): ${flag} deletada`)
  })
}


module.exports = {
  criarTabela,
  inserirTabela,
  getAllUsers,
  getUser,
  updateTabela,
  deleteColuna
}





