const Role = require('../models/role');
const Usuario = require ('../models/usuario')


const esRolevalido = async (rol= '') => {
    const existeRol = await Role.findOne({rol})

    if (!existeRol) {
        throw new Error (`El rol ${ rol } no esta registrado en la BD`)
    }
}

const esCorreoValido  = async (correo = '') => {
    const emailExiste =  await Usuario.findOne ({correo})

    if( emailExiste) {
        throw new Error (`El correo ${ correo } ya esta registrado en la BD`)
    }
}

const existeUsuarioPorId  = async (id = '') => {
    const existeUsuario =  await Usuario.findById (id)

    if( !existeUsuario) {
        throw new Error (`El id no existe ${ id } `)
    }

    
}

module.exports =  {
    esRolevalido,
    esCorreoValido,
    existeUsuarioPorId
}