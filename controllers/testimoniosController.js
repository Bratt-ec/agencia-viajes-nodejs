import { Testimonio } from "../models/Testimonios.js";

const guardarTestimonio = async (req, res) =>{
    // validar...
    const {nombre, correo, mensaje} = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje: 'El Nombre está vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo está vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje está vacio'});
    }

    if(errores.length > 0){
        // Mostrar errores en la vista
        res.render('testimonios',{
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
        });
    } else{
        // Almacenar en la BD
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            });
            
            res.render('testimonios',{
                respuesta: 'Testimonio publicado'
            });
        } catch (error) {
            console.log(error);
        }

    }



    // console.log(req.body);
}

export{
    guardarTestimonio,
}