const {response} = require ('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async (req, res = response) => {

    const {desde = 0, limite=5} = req.query;
    const condicion = {estado:true}
    
    //const usuarios = await Usuario.find() 
    //    .skip(Number(desde))
    //    .limit(Number(limite))
    
    const [total , usuarios] = await Promise.all([
        Usuario.countDocuments(condicion),
        Usuario.find(condicion)
        .skip(Number(desde))
        .limit(Number(limite))
    ])      

    res.json({
        total,
        usuarios
    })
 }

 const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {password, google, correo, ...resto} = req.body;

    //TODO validar contra la base de datos

    if (password) {
        //si llega la contraseña, vuelve a encriptar
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt); //Lo agrega al array de resto
    }

    const usuario = await Usuario.findByIdAndUpdate (id , resto , {new: true} )

    res.json({
        msg: 'put API - controlador',
        id
    })
 }

 const usuariosPost = async (req, res = response) => {
    
    

    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol} );

    //verificar si el correo existe
    //const existeEmail = await Usuario.findOne ({correo})
    //if( existeEmail) {
    //    return res.status(400).json({
    //        msg: 'Ese correo ya esta registrado'
    //    })
    //}

    // Encripitar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json({
        usuario
    })
 }

 const usuariosDelete = async (req, res) => {
    const {id} = req.params;

    //fisicamente lo borra
    //const usuario = await Usuario.findByIdAndDelete (id)

    const usuario = await Usuario.findByIdAndUpdate (id, {estado:false})
    res.json({
        usuario
    })
 }

 const usuariosPath = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    })
 }

 module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPath
 }