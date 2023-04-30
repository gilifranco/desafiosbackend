require('dotenv').config({path: './produccion.env'});
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')('ACb9c3c3fcef3e9e270989c0fe9c445be0', authToken);
const logger = require('./logger');


const mensajeTwilio = async(body) => {
    client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: body,
        to: process.env.ADMIN_TELEFONO
    })
    .then(message => logger.info(message.sid + ' mensaje enviado'))
    .catch(err => logger.info(err))
}

module.exports = mensajeTwilio 