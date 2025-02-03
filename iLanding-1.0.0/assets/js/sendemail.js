//COnfiguração do envio do email
const nodemailer = require("nodemailer")


//Função para configurar o email que enviará o e-mail do cliente
const sendEmail = async (name, email, subject, message) => {
    //Transporter para envio do e-mail

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    // função para verificar acesso ao email
    // Verificar a conexão
    transporter.verify((error, success) => {
        if (error) {
        console.error('Erro de conexão com o servidor SMTP:', error);
        } else {
        console.log('Servidor SMTP está pronto para enviar e-mails!');
        }
    });

//função de enviar o email

    let mailOptions = {
        from: process.env.EMAIL_USER, // configurar o e-mail da oceantech aqui, através do documento credenciais.env ele mesmo enviará os e-mails dos clientes para si
        to: 'contato@oceantechsolutions.com',
        subject: subject,
        text: `Mensagem de ${name} (${email}):\n\n${message}`
    }

    try {
        //Tentando enviar e-mail
        await transporter.sendMail(mailOptions)
        return {success: true, message: "E-mail enviado com sucesso, verificar caixa de entrada e spam"}
    } catch (error) {
        return {sucess: false, message: `Erro ao enviar o e-mail: ${error.message}`}
    }

}

module.exports = sendEmail