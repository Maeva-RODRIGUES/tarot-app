// etherealEmail.js

const nodemailer = require('nodemailer');

// Créer un transporteur email en utilisant Ethereal
const createEtherealTransporter = async () => {
    // Générer un compte Ethereal pour tester
    let testAccount = await nodemailer.createTestAccount();

    // Créer un transporteur email en utilisant Ethereal
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user, // Utilisateur Ethereal généré
            pass: testAccount.pass  // Mot de passe Ethereal généré
        }
    });

    return transporter;
};

// Fonction pour envoyer un email via Ethereal
const sendEtherealEmail = async (to, subject, text, html) => {
    try {
        const transporter = await createEtherealTransporter();

        // Envoyer l'email
        let info = await transporter.sendMail({
            from: '"Support" <support@example.com>', // Adresse de l'expéditeur
            to, // Adresse du destinataire
            subject, // Sujet de l'email
            text, // Contenu texte de l'email
            html // Contenu HTML de l'email
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // URL de prévisualisation Ethereal

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEtherealEmail
};
