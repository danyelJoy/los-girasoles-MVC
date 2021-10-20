"use strict";

/* var Producto = require('../models/producto');
var mongoose = require('mongoose');


exports.producto_list = function (req, res){
    res.render('productos/index',{Lista: Producto.allProductos});        
    
}

exports.producto_create_get = function(req, res) {
    res.render('productos/create');
}

exports.producto_create_post = function(req, res){
    var producto = new Producto (req.body.code, req.body.clave, req.body.tipo,
        req.body.color, req.body.precio, req.body.descripcion);
    Producto.add(producto);

    res.redirect('/productos');
}

exports.producto_update_get = function(req, res){
    var producto = Producto.findById(req.params.code);
        res.render('productos/update', {producto});    
}

exports.producto_update_post = function(req, res){
     var producto = Producto.findById (req.params.code);
     producto.code = req.params.code;
     producto.clave = req.params.clave;
     producto.tipo = req.params.tipo;
     producto.color = req.body.color;
     producto.precio = req.body.precio;
     producto.descripcion = req.body.descripcion;
    
    res.redirect('productos');
       
}

exports.producto_delete_post = function(req, res) {
    Producto.removeById(req.body.code, (err) =>{
        if (err){
            NotExtended(err);
        } else {
            res.redirect('/productos')
        }
    });
    
}
 */




var producto = require('../models/producto');
var mongoose = require('mongoose');



exports.producto_list = function (req, res){
    producto.allProductos(function(err, productos){
        res.render('productos/index',{productoLista: productos});
    });      
}

exports.producto_create_get = function(req, res) {
    res.render('productos/create');
}

exports.producto_create_post = function(req, res){
    var Producto = producto.createInstance(req.body.id, req.body.clave, req.body.tipo,
        req.body.color, req.body.descripcion, req.body.precio);
    producto.add(Producto);

    res.redirect('/productos');
}

exports.producto_update_get = function(req, res){
    producto.findById(req.params.id, function(err, Producto){
        res.render('productos/update', {producto: Producto});
    });            
}

exports.producto_update_post = function(req, res){
     producto.findOneAndUpdate ({"code": req.params.id}, {"clave": req.params.clave, "tipo": req.params.tipo, 
     "color": req.body.color, "descripcion": req.body.descripcion,"precio": req.body.precio,}); 
    
    res.redirect('productos');
       
}

exports.producto_delete_post = function(req, res) {
    producto.removeById(req.body.id, (err) =>{
        if (err){
            NotExtended(err);
        } else {
            res.redirect('/productos')
        }
    });
    
}

 

