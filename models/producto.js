"use strict";

var mongoose =require('mongoose');
var Schema = mongoose.Schema;

 var productoSchema = new Schema({
    id: Number,    
    clave: String,
    tipo: String,
    color: String,    
    descripcion: String,
    precio: {
        type: Number,
        default: false
    } 
});

productoSchema.statics.createInstance = function (id, clave, color, tipo, descripcion, precio){
    return new this({
        id: id,
        clave: clave,
        tipo: tipo,
        color: color,        
        descripcion: descripcion,
        precio: precio
    });
};

productoSchema.methods.toString = function (){
    return 'id: ' + this.id +  "| precio: " + this.precio;
}

productoSchema.statics.allProductos = function(cb){
    return  this.find ({}, cb);
};

productoSchema.statics.add = function(aProducto, cb){
    this.create(aProducto, cb);
}

productoSchema.statics.findById = function(aCode, cb){
    return this.findOne({id: aCode}, cb);
}

productoSchema.statics.removeById = function(aCode, cb){
    return this.deleteOne({id: aCode}, cb);
}

module.exports = mongoose.model('Producto', productoSchema);


/* 
var Producto = function (id, clave, tipo, color, precio, descripcion ){
    this.id = id;
    this.clave = clave;
    this.tipo = tipo;
    this.color = color;
    this.precio = precio;
    this.descripcion = descripcion;
}

Producto.prototype.toString = function (){
    return 'id: ' + this.id +  "| tipo: " + this.precio + "precio";
}

Producto.allProductos = [];
Producto.add = function (aProduct){
    Producto.allProductos.push(aProduct);
}
Producto.findById = function(aProductId){
    var aProduct =Producto.allProductos.find(x => x.id == aProductId);
    if(aProduct)
       return aProduct;
    else
        throw new Error(`No existe un producto con ese ID ${aProductId}`);
}

Producto.removeById = function (aProductId){
    for(var i = 0; i <Producto.allProductos.length; i++){
        if(Producto.allProductos.id == aProductId){
            Producto.allProductos.splice(i, 1);
            break;
        }
    }
}

var a = new Producto(1,'1qwer','Rosas',' Amarillas','$100','Docena');
var b = new Producto(2,'2qer','Rosas',' Blancas','$100', 'docena' );

Producto.add(a);
Producto.add(b);


module.exports = Producto;  */