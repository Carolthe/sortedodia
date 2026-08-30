const router = require("express").Router();
const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/email");
const { OAuth2Client } = require("google-auth-library");
const auth = require("../middlewares/auth");

// ==================================================
// CADASTRO
// ==================================================

router.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, senha, telefone} = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({erro: "Nome, email e sea são obrigatórios."});
        }

        const [existe] = await db.query(
            `SELECT id_usuario FROM usuarios WHERE email=?`,
            [email]
        );

        if (existe.length) {
            return res.status(400).json({erro: "Email já cadastrado."});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const [resultado] =
            await db.query(
                `INSERT INTO usuarios
                (nome, email, senha, telefone) VALUES (?,?,?,?)`,
                [nome, email, senhaCriptografada, telefone]);

        res.json({
            mensagem: "Usuário cadastrado.",
            id_usuario: resultado.insertId
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro:
                erro.message
        });
    }
});
// ==================================================
// LOGIN
// ==================================================

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({
                erro: "Email e senha são obrigatórios."
            });
        }

        // Busca usuário pelo email
        const [usuarios] = await db.query(
            `SELECT * FROM usuarios WHERE email = ?`,
            [email]
        );

        // Email não encontrado
        if (!usuarios.length) {
            return res.status(401).json({
                erro: "Email incorreto.",
                tipo: "email"
            });
        }

        const usuario = usuarios[0];

        // Verifica senha
        const senhaOk = await bcrypt.compare(
            senha,
            usuario.senha
        );

        // Senha incorreta
        if (!senhaOk) {
            return res.status(401).json({
                erro: "Senha incorreta.",
                tipo: "senha"
            });
        }

        // Cria token
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // Login realizado com sucesso
        return res.status(200).json({
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (erro) {
        console.error("ERRO NO LOGIN:", erro);

        return res.status(500).json({
            erro: "Erro interno ao realizar login."
        });
    }
});

// ==================================================
// ESQUECI SENHA
// ==================================================

router.post("/esqueci-senha", async (req,res)=>{
    try {

        const { email } = req.body;

        if(!email){
            return res.status(400).json({erro: "Email obrigatório."});
        }

        const [usuarios] = await db.query(
                ` SELECT * FROM usuarios WHERE email=?`,
                [email]);

        // Não informa se existe usuário
        if(!usuarios.length){

            return res.json({ mensagem: "Se existir uma conta, enviaremos um código."});
        }

        const usuario =usuarios[0];

        // Remove códigos anteriores

        await db.query(` DELETE FROM recuperar_senha WHERE id_usuario=? `,
            [ usuario.id_usuario]
        );

        // Gera código de 6 dígitos

        const codigo = Math.floor( 100000 + Math.random() * 900000 ).toString();

        // Criptografa o código

        const token = crypto .createHash("sha256") .update(codigo) .digest("hex");

        // Salva recuperação

        await db.query(`INSERT INTO recuperar_senha (id_usuario, token, expira_em, utilizado) ~
            VALUES ( ?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE), 0 )`,
            [ usuario.id_usuario, token]
        );

        // Envia email

        await transporter.sendMail({
            to: usuario.email,

            subject: "Recuperação de senha",
            html: ` <div style="font-family:Arial">
                <h2> Recuperação de senha </h2>
                <p> Seu código de recuperação é: </p>
                <h1> ${codigo}</h1>
                <p> Esse código expira em 15 minutos.</p>
            </div>`
        });

        res.json({ mensagem: "Código enviado."});

    } catch(erro) {
        console.error(erro);

        res.status(500).json({ erro: "Erro ao enviar código."});}
});

// ==================================================
// VALIDAR CÓDIGO
// ==================================================

router.post("/validar-codigo", async(req,res)=>{

    try {

        const {email, codigo} = req.body;

        if(!email || !codigo){
            return res.status(400).json({ erro:"Email e código são obrigatórios."});
        }

        const [usuarios] = await db.query(
                `SELECT * FROM usuarios WHERE email=?`,
                [email]
            );

        if(!usuarios.length){

            return res.status(404).json({
                erro: "Usuário não encontrado."});
        }

        const usuario = usuarios[0];

        const token = crypto .createHash("sha256") .update(codigo) .digest("hex");

        const [recuperacao] = await db.query(
                ` SELECT * FROM recuperar_senha WHERE id_usuario=?
                    AND token=? AND expira_em > NOW() AND utilizado=0
                ORDER BY id_recuperar_senha DESC LIMIT 1`,
                [usuario.id_usuario, token]
            );

        if(!recuperacao.length){
            return res.status(400).json({ erro: "Código inválido ou expirado."});
        }

        res.json({ mensagem: "Código válido." });

    } catch(erro){
        console.error(erro);
        res.status(500).json({erro: "Erro ao validar código."});
    }
});

// ==================================================
// REDEFINIR SENHA
// ==================================================

router.post("/redefinir-senha", async(req,res)=>{

    try {
        const { email, codigo, senha } = req.body;

        if(!email || !codigo || !senha){
            return res.status(400).json({ erro:  "Email, código e senha são obrigatórios."});
        }

        if(senha.length < 6){
            return res.status(400).json({ erro: "A senha deve possuir no mínimo 6 caracteres."});
        }

        const [usuarios] = await db.query(` SELECT * FROM usuarios WHERE email=? `,
                [ email ]);

        if(!usuarios.length){
            return res.status(404).json({
               erro: "Usuário não encontrado."});
        }

        const usuario = usuarios[0];

        // Cria hash do código recebido

        const token = crypto .createHash("sha256") .update(codigo) .digest("hex");

        // Confere código

        const [recuperacao] = await db.query(
                ` SELECT * FROM recuperar_senha WHERE id_usuario=?
                AND token=? AND expira_em > NOW() AND utilizado=0 ORDER BY id_recuperar_senha DESC LIMIT 1`,
                [ usuario.id_usuario, token ]
            )

        if(!recuperacao.length){
            return res.status(400).json({
                erro: "Código inválido ou expirado." });
        }
        // Criptografa nova senha

        const novaSenha = await bcrypt.hash( senha, 10 );

        // Atualiza senha do usuário

        await db.query(
            ` UPDATE usuarios SET senha=? WHERE id_usuario=? `,
            [ novaSenha, usuario.id_usuario ]
        );
        // Marca somente este código como utilizado

        await db.query(
            ` UPDATE recuperar_senha SET utilizado=1 WHERE id_recuperar_senha=?`,
            [ recuperacao[0].id_recuperar_senha]);

        res.json({ mensagem: "Senha alterada com sucesso." });

    } catch(erro){ console.error(erro);

        res.status(500).json({ erro: "Erro ao redefinir senha." });
    }
});
// ==================================================
// LOGIN GOOGLE
// ==================================================
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

router.post("/login-google", async(req,res)=>{
    try {
        const { credential } = req.body;

        if(!credential){
            return res.status(400).json({
                erro: "Token Google não informado." });
        }
        // Valida token do Google

        const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID
            });

        const payload = ticket.getPayload();

        // Procura usuário pelo email

        const [usuarios] = await db.query(
                ` SELECT * FROM usuarios WHERE email=? `,
                [ payload.email ]
            );

        let usuario;

        // Se não existir cria usuário

        if(!usuarios.length){
            const [resultado] = await db.query(
                    ` INSERT INTO usuarios ( nome, email )
                    VALUES (?,?) `,
                    [ payload.name, payload.email]
                );

            usuario = { id_usuario: resultado.insertId,
                nome: payload.name,
                email: payload.email };

        } else {
            usuario = usuarios[0];
        }

        // Cria JWT

        const token = jwt.sign({
                    id_usuario: usuario.id_usuario
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        res.json({
            token, usuario:{
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch(erro) {
        console.error(erro);

        res.status(401).json({
            erro: "Falha ao autenticar com Google."
        });
    }
});
// ==================================================
// BUSCAR USUÁRIO LOGADO
// ==================================================

router.get("/me", auth, async(req,res)=>{
    try { const id_usuario = req.usuario.id_usuario;

        const [usuarios] = await db.query(
            ` SELECT id_usuario, nome, email, saldo, bonus
            FROM usuarios WHERE id_usuario = ? `,
            [ id_usuario ]
        );

        if(!usuarios.length){
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        res.json(usuarios[0]);
    } catch(erro){
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar usuário."
        });
    }
});

module.exports = router;