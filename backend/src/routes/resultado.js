const router = require("express").Router();
const db = require("../config/database");

router.get("/",async(req,res)=>{

const [resultados]=await db.query(
        `SELECT *
        FROM resultados
        ORDER BY data DESC`);

res.json(resultados);
});

module.exports=router;