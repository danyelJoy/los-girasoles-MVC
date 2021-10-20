const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

let mailConfig;
if(process.env.NODE_ENV === 'production'){
    const options = {
        auth: {
            api_key: process.env.SENGRID_API_SECRET
        }
    }
    mailConfig = sgTransport(options);    
}else{
    if(process.env.NODE_ENV === 'staging'){
        console.log('xxxxxxxxxxxx');
        const options = {
            auth: {
                api_key: process.env.SENGRID_API_SECRET
            }            
        }
        mailConfig = sgTransport(options);
    }else{        
        //todos los email con etherial.email
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
              user: process.env.ethereal_user,
              pass: process.env.ethereal_pwd
            }
        };
    }    
} 
/* 
const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'leonie7@ethereal.email',
        pass: '4kk58vNfFN4TZJRTCD'
    }
}; */

 module.exports = nodemailer.createTransport(mailConfig);
