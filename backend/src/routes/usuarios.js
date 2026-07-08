const router = require("express").Router();

const db = require("../config/database");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");



// CADASTRO

router.post("/cadastro", async(req,res)=>{


try{


const {
nome,
email,
senha
}=req.body;



const senhaCriptografada =
await bcrypt.hash(
senha,
10
);



const [resultado] =
await db.query(

`
INSERT INTO usuarios
(nome,email,senha)

VALUES (?,?,?)

`,

[
nome,
email,
senhaCriptografada
]

);



res.json({

mensagem:
"Usuário cadastrado",

id_usuario:
resultado.insertId

});



}catch(error){

res.status(500).json({

erro:error.message

});

}


});





// LOGIN


router.post("/login",async(req,res)=>{


try{


const {
email,
senha
}=req.body;



const [usuarios]=
await db.query(

`
SELECT *
FROM usuarios
WHERE email=?

`,

[email]

);



if(!usuarios.length){

return res.status(404)
.json({
erro:"Usuário não encontrado"
});

}



const usuario=usuarios[0];



const senhaOk =
await bcrypt.compare(

senha,

usuario.senha

);



if(!senhaOk){

return res.status(401)
.json({

erro:"Senha incorreta"

});

}



const token =
jwt.sign(

{
id_usuario:
usuario.id_usuario
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



res.json({

token,

usuario:{
id_usuario:
usuario.id_usuario,

nome:
usuario.nome,

email:
usuario.email
}

});



}catch(error){

res.status(500).json({
erro:error.message
});

}


});



module.exports = router;