const { Router } = require('express')
const { check } = require ('express-validator')
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete, usuariosPath} = require('../controllers/usuarios');
const { esRolevalido, esCorreoValido,existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router ();

router.get('/', usuariosGet)

 router.put('/:id', [
    check ('id','No es un ID valido').isMongoId(),
    check('id').custom (existeUsuarioPorId),
    validarCampos,
 ],usuariosPut)

 router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), //empty es lleno, seria no vacio
        
        check('password','El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 caracteres').isLength({min:6}),
        
        check('correo','El correo es obligatorio').not().isEmpty(),
        check('correo', 'El correo no es valido').isEmail(),

        check('correo').custom (esCorreoValido),
        //check('rol','El rol es obligatorio').not().isEmpty(),
        //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),

        check('rol').custom( esRolevalido ),

        validarCampos,

        
    ],usuariosPost )

 router.delete('/:id',[
    check ('id','No es un ID valido').isMongoId(),
    check('id').custom (existeUsuarioPorId),
    validarCampos,
 ], usuariosDelete)

 router.patch('/', usuariosPath)

module.exports = router;