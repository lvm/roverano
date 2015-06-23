var pasajero = simulador.pasajero;
var subte = simulador.subte;
var helper = simulador.helper;

function render_estacion(estacion, direccion, condicion, alt){
    var tmpl_estacion = document.getElementById('tmpl-estacion');
    var est_alt = alt
                ?alt.map(function(e){return helper.nice_name[e]})
                :null;

    var data = {linea: subte.estacion_en_linea(estacion),
                estacion: helper.nice_name[estacion],
                direccion: helper.nice_name[direccion],
                condicion: helper.nice_name[condicion],
                alt: est_alt? est_alt.join(" o "): est_alt,
                continua: subte.estacion_en_linea(estacion) != "B",
               };
    var content = Mustache.render(tmpl_estacion.innerHTML, data);

    document.getElementById('content').innerHTML += content;
}

function render_cartelito(msg){
    var tmpl_estacion = document.getElementById('tmpl-cartelito');
    var data = {mensaje: msg};
    var content = Mustache.render(tmpl_estacion.innerHTML, data);

    document.getElementById('content').innerHTML += content;
}

function render_escapamos(vueltas){
    var msg = "Escapaste en "+vueltas+" turno"+
        (vueltas != 1 ? "s":"")+"!";
    render_cartelito(msg);
}


function jugar(){
    var dir = ['derecha', 'izquierda', 'misma_linea']; // 'misma_linea',
    var cond = ['con_anden_medio', 'combinacion'];

    var escapamos = false;
    var estacion = "peru";
    var vueltas = 0;
    var direccion = dir[helper.rand(dir.length)];
    //var direccion = 'misma_linea'; 
    var condicion = cond[helper.rand()];
    var res, msg;

    render_estacion(estacion, direccion, condicion);
    //return;
    while (!escapamos){
        res = pasajero.viajar_a_estacion({
	    'estacion': estacion,
	    'direccion': direccion,
	    'condicion': condicion,
        })
        console.log(res);

        estacion = res.estacion;
        if(subte.en_linea_b(estacion)){
            escapamos = true;
        }
        else{
            vueltas += 1
        }

        if(vueltas == 200){
            msg = "Dimos "+vueltas+" y no escapamos...<br>"+
                "Perdimos toda esperanza, ahora somos Roverano :-("
            render_cartelito(msg);
            break;
        }

        //direccion = dir[helper.rand()];
        condicion = cond[helper.rand()];

        render_estacion(estacion,
                        direccion, condicion,
                        res.estaciones_alternativas);
    }

    render_escapamos(vueltas);
}


jugar();
