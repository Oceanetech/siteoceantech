//Configuração do nodemailer

require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const sendEmail =  require("./assets/js/sendemail")
const path = require("path")

const app = express()
const PORT = 5000

//Middleware

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//rota com o index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

//rota para enviar e-mails

app.post("/sendemail", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        await sendEmail(name, email, subject, message);
        res.status(200).json({ success: true, message: "E-mail enviado com sucesso!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erro ao enviar o e-mail."});
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})