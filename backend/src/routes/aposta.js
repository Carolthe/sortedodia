const router = require("express").Router();

const db = require("../config/database");



// Criar aposta


router.post("/",async(req,res)=>{


try{


const {

id_usuario,

id_extracao,

data_jogo,

modalidade,

colocacao,

valor,

numeros

}=req.body;



const [aposta]=
await db.query(

`
INSERT INTO apostas

(
id_usuario,
id_extracao,
data_jogo,
modalidade,
colocacao,
valor
)

VALUES (?,?,?,?,?,?)

`,

[
id_usuario,
id_extracao,
data_jogo,
modalidade,
colocacao,
valor
]

);



const id_aposta =
aposta.insertId;



for(let numero of numeros){


await db.query(

`
INSERT INTO aposta_numeros

(
id_aposta,
numero
)

VALUES (?,?)

`,

[
id_aposta,
numero
]

);


}



res.json({

mensagem:
"Aposta realizada",

id_aposta

});



}catch(error){

res.status(500).json({
erro:error.message
});

}


});



module.exports=router;