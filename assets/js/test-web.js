var pasajero = simulador.pasajero;
var subte = simulador.subte;
var helper = simulador.helper;

function render_estacion(estacion, direccion, condicion){
    var tmpl_estacion = document.getElementById('tmpl-estacion');
    //Mustache.parse(tmpl_estacion);
    var data = {linea: subte.estacion_en_linea(estacion),
                estacion: helper.nice_name[estacion],
                direccion: direccion,
                condicion: helper.nice_name[condicion],
                continua: subte.estacion_en_linea(estacion) != "B",
               };
    var content = Mustache.render(tmpl_estacion.innerHTML, data);

    document.getElementById('content').innerHTML += content;
}

function render_escapamos(vueltas){

    var msg = "Escapaste en "+vueltas+" vuelta"+
        (vueltas != 1 ? "s":"")+"!";
    var tmpl_estacion = document.getElementById('tmpl-escapamos');
    //Mustache.parse(tmpl_estacion);
    var data = {mensaje: msg};
    var content = Mustache.render(tmpl_estacion.innerHTML, data);

    document.getElementById('content').innerHTML += content;
}


function jugar(){
    var dir = ['derecha', 'izquierda']; // 'misma_linea',
    var cond = ['con_anden_medio', 'combinacion'];

    var escapamos = false;
    var estacion = "peru";
    var vueltas = 0;
    var direccion = dir[helper.rand()];
    var condicion = cond[helper.rand()];
    var res;


    render_estacion(estacion, direccion, condicion);

    while (!escapamos){
        res = pasajero.viajar_a_estacion({
	    'estacion': estacion,
	    'direccion': direccion,
	    'condicion': condicion,
        })
        estacion = res.estacion;
        if(subte.en_linea_b(estacion)){
            escapamos = true;
        }
        else{
            vueltas += 1
        }

        direccion = dir[helper.rand()];
        condicion = cond[helper.rand()];

        render_estacion(estacion, direccion, condicion);
    }

    render_escapamos(vueltas);
}


jugar();
