const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configura tus credenciales
AWS.config.update({
  accessKeyId: 'tuAccessKeyId',
  secretAccessKey: 'tuSecretAccessKey',
  region: 'tuRegion' // por ejemplo, 'us-west-2'
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const sendEmail = async () => {
  const pdfPath = path.join(__dirname, 'productos.pdf');
  const pdfData = fs.readFileSync(pdfPath);

  const params = {
    Source: 'tuCorreo@example.com',
    Destination: {
      ToAddresses: [
        'correoDestino@example.com'
      ]
    },
    Message: {
      Subject: {
        Data: 'Tabla de Productos'
      },
      Body: {
        Text: {
          Data: 'Hola, \n\n Adjunto encontrarás la tabla de productos en formato PDF. \n\n Saludos, \n\n Tu nombre'
        }
      }
    },
    Attachments: [{
      Name: 'productos.pdf',
      Content: pdfData.toString('base64'),
      ContentType: 'application/pdf'
    }]
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

sendEmail();
