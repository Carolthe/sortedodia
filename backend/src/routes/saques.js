// const router = require("express").Router();
// const db = require("../config/database");
// const auth = require("../middlewares/auth");
// const axios = require("../config/moneyOut");
// const crypto = require("crypto");

// // ======================================
// // SOLICITAR SAQUE PIX AUTOMÁTICO
// // ======================================

// router.post("/", auth, async (req, res) => {

//     const conexao = await db.getConnection();

//     let id_saque;

//     try {
//         await conexao.beginTransaction();

//         const id_usuario = req.usuario.id_usuario;

//         const { valor, tipo_chave, chave_pix, nome_titular, cpf_titular } = req.body;

//         if (!valor || !tipo_chave || !chave_pix || !nome_titular || !cpf_titular) {

//             await conexao.rollback();

//             return res.status(400).json({ erro: "Preencha todos os campos." });
//         }

//         const valorNumerico =
//             Number(valor);

//         if (valorNumerico < 35) {

//             await conexao.rollback();

//             return res.status(400).json({ erro: "Saque mínimo R$35,00." });
//         }

//         const [usuarios] = await conexao.query(
//             `SELECT saldo
//             FROM usuarios
//             WHERE id_usuario=?`,
//             [id_usuario]
//         );

//         if (!usuarios.length) {
//             await conexao.rollback();

//             return res.status(404).json({
//                 erro:
//                     "Usuário não encontrado."
//             });
//         }

//         if (Number(usuarios[0].saldo) < valorNumerico) {

//             await conexao.rollback();

//             return res.status(400).json({
//                 erro:
//                     "Saldo insuficiente."
//             });
//         }
//         // cria saque aguardando pagamento

//         const [resultado] =
//             await conexao.query(`INSERT INTO saques
//             (id_usuario, valor, tipo_chave, chave_pix, nome_titular, cpf_titular, status)
//             VALUES (?,?,?,?,?,?,?)`,
//                 [id_usuario, valorNumerico, tipo_chave, chave_pix, nome_titular, cpf_titular, "processing"]
//             );

//         id_saque = resultado.insertId;

//         await conexao.commit();
//         // ===============================
//         // ENVIA MONEY OUT
//         // ===============================
//         try {
//             const transferencia = await axios.post("/v1/transaction-intents/process",
//                 {
//                     external_reference: `SAQUE_${id_saque}`,
//                     point_of_interaction: { type: "PSP_TRANSFER" },
//                     transaction: {
//                         from: {
//                             accounts: [
//                                 { amount: valorNumerico }
//                             ]
//                         },
//                         to: {
//                             accounts: [{
//                                 type: "current",
//                                 amount: valorNumerico,
//                                 chave: {
//                                     type: tipo_chave,
//                                     value: chave_pix
//                                 },

//                                 owner: {
//                                     identification: {
//                                         type: "CPF",
//                                         number: cpf_titular
//                                     }
//                                 }
//                             }
//                             ]
//                         },

//                         total_amount: valorNumerico
//                     }
//                 },
//                 {
//                     headers: {
//                         "X-Idempotency-Key":
//                             crypto.randomUUID()
//                     }
//                 }
//             );

//             await db.query(
//                 `UPDATE saques SET id_transferencia_mp=?, status=? WHERE id_saque=?`,
//                 [transferencia.data.id, transferencia.data.status || "processing", id_saque]);

//             return res.json({
//                 mensagem: "Saque enviado para processamento.", id_saque, status: transferencia.data.status});

//         } catch (mpError) {

//             console.error("Erro Mercado Pago:", mpError.response?.data || mpError.message);

//             await db.query( `UPDATE saques SET status='rejected' WHERE id_saque=? `,
//                 [id_saque]);

//             return res.status(500).json({erro: "Erro ao enviar saque."});
//         }

//     } catch (error) {

//         await conexao.rollback();

//         console.error(error);

//         res.status(500).json({

//             erro: "Erro ao solicitar saque."});

//     } finally { conexao.release();}
// });

// // ======================================
// // WEBHOOK MONEY OUT MERCADO PAGO
// // ======================================

// router.post("/webhook", async (req, res) => {

//     try {
//         console.log("===== WEBHOOK SAQUE =====");
//         console.log(req.body);

//         const id_transferencia =
//             req.body?.data?.id;

//         if (!id_transferencia) {
//             return res.sendStatus(200);
//         }

//         // consulta transferência no Mercado Pago

//         const transferencia =
//             await axios.get(`/v1/transaction-intents/${id_transferencia}`);

//         const status = transferencia.data.status;

//         const [saques] = await db.query(`SELECT * FROM saques WHERE id_transferencia_mp=?`,
//                 [id_transferencia]);

//         if (!saques.length) {
//             return res.sendStatus(200);
//         }

//         const saque = saques[0];

//         // ===============================
//         // APROVADO
//         // ===============================

//         if (status === "approved") {

//             await db.query(
//         `UPDATE usuarios SET saldo = saldo - ? WHERE id_usuario=?`,
//                 [saque.valor, saque.id_usuario]);

//             await db.query(
//                 `UPDATE carteira SET saldo = saldo - ? WHERE id_usuario=?`,
//                 [saque.valor, saque.id_usuario]
//             );

//             await db.query(
//                 `UPDATE saques SET status='approved' WHERE id_saque=?`,
//                 [saque.id_saque]
//             );
//         }
//         // ===============================
//         // REJEITADO
//         // ===============================
//         if (
//             status === "rejected" ||
//             status === "cancelled"
//         ) {
//             await db.query(`UPDATE saques SET status='rejected' WHERE id_saque=?`,
//                 [saque.id_saque]
//             );
//         }

//         return res.sendStatus(200);
//     } catch (error) {
//         console.error("Erro webhook saque:", error);

//         return res.sendStatus(500);
//     }
// });

// module.exports = router;