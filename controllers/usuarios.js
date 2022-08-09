const {response} = require ('express')

const usuariosGet = (req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get API - controlador',
        query
    })
 }

 const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    })
 }

 const usuariosPost = (req, res = response) => {
    
    const {nombre, edad} = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
 }

 const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
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