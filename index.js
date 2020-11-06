// const express =  require('express'); common js
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
// 
import dotenv from "dotenv";
dotenv.config({ path: 'variables.env'});
// Extraemos las variables de entorno
const { PORT, HOST } = process.env;
// 
const app = express();

// conectar BD
db.authenticate()
    .then(() => console.log('Base de datos conectada') )
    .catch( error => console.log(error));

// Habilitar Pug
app.set('view engine', 'pug');
// Get año actual
app.use((req,res, next ) => { 
    
    const today = new Date();
    res.locals.year = today.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';

    return next();
});
// Add body parser para leer datos del formulario
app.use(express.urlencoded({extended: true}));
// Definir carpeta Public
app.use(express.static('public'));
// Add router
app.use('/', router);
// define hOST AND Port
const host = HOST || '0.0.0.0';
const port = PORT || 4000;
// Server
app.listen(port, host, ()=> {
    console.log(`Server funcionando en ${host + port}`);
});