var mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;

const Token = require('../models/token');
const mailer = require('../mailer/mailer');

const validateEmail = function(email){
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return re.test(email);

};

var usuarioSchema = new Schema({
    nombre:{
        type: String,
        trim: true,
        require: [true, 'El nombre es obligatorio']

    },

 
    email:{
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingresa un email valido'],
        match:[/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/]

    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }  

});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

/* usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
} */

usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token ({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err){
        if (err) {return console.log(err.message); }

        const mailOptions = {
            from: 'no-reply@losgirasolesflores.com',
            to: email_destination,
            subject: 'Verificación de cuenta',
            text: 'hola \n\n' + 'Por favor, para verificar su cuenta haga click en esta opción: \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n'
        };
        mailer.sendMail(mailOptions, function(err){
            if (err) {return console.log(err.message);}
            console.log('Se ha enviado un e-mail de bienvenida' + email_destination)
        });
        
    });
}
/* 
usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreateByGoogle (condition, callback){
    const self = this;
    console.log(condition);
    self.findOne({
        $or: [{'googleId': condition.id}, {'email': condition.emails[0].value} ]
    }), (err, result) =>{
        if (result){
            callback(err, result)
        }else{
            console.log('--------CONDITION------------');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.desplayName || 'SIN NOMBRE'
            values.verificado = true;
            values.password = condition._json.etag;
            console.log('-----------VALUES-------------');
            console.log(values);
            self.create(values, (err, result) => {
                if(err) {console.log(err);}
                return callback(err,result)
            })
        }
    }
};*/


module.exports = mongoose.model('Usuario', usuarioSchema); 