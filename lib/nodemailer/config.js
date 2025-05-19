import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_SENHA
    },
    // ADICIONE ESTA OPÇÃO TLS APENAS PARA DESENVOLVIMENTO:
    tls: {
        rejectUnauthorized: false
    }
})

await transporter.verify();
// console.log("Server is ready to take our messages");
