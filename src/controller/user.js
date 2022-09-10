const { criarTabela, inserirTabela, getAllUsers, getUser, updateTabela, deleteColuna } = require('../database/DBconfig');


const novoUsuario = async ({ nome, email, idade }) => {
    //criarTabela()
    
    let idadeMinima = idade
    if (idadeMinima < 18) {
        return 400
    } else {
        const usuario = {
            nome,
            email,
            idade
        }
        console.log( "usuario" ,usuario)
        return inserirTabela(usuario)
    }

}

const showUsers = async () => {
    let usuarios = []
    await new Promise((resolve, reject)=>{
        usuarios = getAllUsers()
        resolve()
    })
    console.log("usuarios: ", usuarios)
    return getAllUsers()
}

const showUser = async (nome) => {
    return getUser(nome);
}

const deleteUser = async ({nome}) =>{

    return deleteColuna(nome)
}


module.exports = {
    novoUsuario,
    showUsers,
    showUser,
    deleteUser
}


