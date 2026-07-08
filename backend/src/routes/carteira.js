const router = require("express").Router();

const db = require("../config/database");



// buscar carteira do usuário

router.get("/:id_usuario",async(req,res)=>{


try{


const {id_usuario}=req.params;


const [carteira]=await db.query(

`
SELECT *
FROM carteira
WHERE id_usuario=?

`,

[id_usuario]

);



res.json(carteira[0]);



}catch(error){

res.status(500).json({
erro:error.message
});

}


});



module.exports=router;