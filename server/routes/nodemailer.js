const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Créer un transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'mounirabaddah6@gmail.com',
        pass: 'hnbf seqq tjgy bsyi'
    }
});

// Fonction pour générer un PDF avec les détails de la réservation
const generateReservationPDF = (reservationData, filename) => {
    // Créer un nouveau document PDF
    const doc = new PDFDocument();
    const formatTimings = (timings) => {
        return timings.map(timing => {
            const date = new Date(timing);
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        });
    };
    // Ajouter du contenu au PDF avec les détails de la réservation
    doc.fontSize(18);
    doc.text('Détails de la réservation :\n');
    doc.text(`Nom complet: ${reservationData.firstName} ${reservationData.lastName}`);
    doc.text(`Téléphone: ${reservationData.phoneNumber}`);
    doc.text(`Adresse: ${reservationData.adress}`);
    doc.text(`E-mail: ${reservationData.email}`);
    doc.text(`Horaire: du ${formatTimings(reservationData.timings).join(' a ')}`); // Utilisez la fonction pour formater les horaires
    // Ajoutez d'autres détails de réservation selon vos besoins

    // Enregistrer le PDF sur le disque
    doc.pipe(fs.createWriteStream(`${filename}.pdf`));
    doc.end();
};

// Fonction pour envoyer un e-mail avec le PDF en pièce jointe
const sendConfirmationEmail = (email, filename) => {
    // Définir les options de l'e-mail avec le PDF en pièce jointe
    const mailOptions = {
        from: 'mounirabaddah6@gmail.com',
        to: email,
        subject: 'Confirmation de réservation',
        text: 'Merci pour votre réservation! Trouvez ci-joint la confirmation de votre réservation.',
        attachments: [
            {
                filename: `${filename}.pdf`,
                path: `${filename}.pdf`
            }
        ]
    };

    // Envoyer l'e-mail avec le PDF en pièce jointe
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        } else {
            console.log('E-mail envoyé :', info.response);
        }
    });
};
module.exports = { generateReservationPDF, sendConfirmationEmail };
