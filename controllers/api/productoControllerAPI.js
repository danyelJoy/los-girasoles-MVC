"use strict";

var Producto = require('../../models/producto');

exports.producto_list = function(req, res) {
    Producto.find({}, function(err, productos){   
        res.status(200).json({
            productos: productos
        });     
    });
}

exports.producto_create =function(err, res){
    var producto = Producto({
        code:req.body.code,
        clave:req.body.clave, 
        tipo:req.body.tipo, 
        color:req.body.color,
        precio:req.body.precio, 
        descripcion:req.body.descripcion});
        
        Producto.add(producto);
        res.status(200).json({
        producto: Producto
    });           
}

exports.producto_delete = function (req, res){
    Producto.removeById(req.body.id, function(){
        res.status(204).send();
    });
}

exports.producto_update = function(req, res){
    Producto.findByIdAndUpdate({"id": req.params.id},{"id": req.body.id, "clave": req.body.clave, "tipo": req.body.tipo, "color": req.body.color, 
    "precio":req.body.precio, "descripcion": req.body.descripcion}, function( err, productoUpdate){
        res.status(200).json({
            Producto: productoUpdate
        });        
    });    
}

