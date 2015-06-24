var pasajero = simulador.pasajero;
var subte = simulador.subte;
var helper = simulador.helper;

function switch_contenido(btn, content){
    if( content.style.display == "none" ){
        content.style.display = "block";
        btn.innerText = "Ocultar";
    }
    else{
        content.style.display = "none";
        btn.innerText = "Mostrar";
    }
}

function render_pago(direccion){
    var tmpl = document.getElementById('tmpl-cartelito');
    var modo = 'Viajamos con saldo positivo';
    if( direccion == 'izquierda' ){
        modo = 'Viajamos con saldo negativo';
    }
    if( direccion == 'misma_linea' ){
        modo = 'Viajamos con subtepass';
    }
    var data = {mensaje: modo};
    var content = Mustache.render(tmpl.innerHTML, data);
    document.getElementById('content').innerHTML += content;
}

function render_estacion(estacion, direccion, condicion,
                         estaciones_alt, direccion_sec){
    var tmpl_estacion = document.getElementById('tmpl-estacion');

    if( estaciones_alt ){
        estaciones_alt = estaciones_alt.map(function(e){
            return helper.nice_name[e]
        }).join(" o "); // A o B o C;
    }

    if( direccion_sec ){
        direccion_sec = helper.nice_name[direccion_sec];
    }

    if( condicion != "con_anden_medio"){
        if( direccion == "misma_linea" && condicion == "combinacion"){
            condicion = "continua";
        }
    }

    var data = {linea: subte.estacion_en_linea(estacion),
                estacion: helper.nice_name[estacion],
                direccion: helper.nice_name[direccion],
                condicion: helper.nice_name[condicion],
                continua: subte.estacion_en_linea(estacion) != "B",
                estaciones_alt: estaciones_alt,
                direccion_sec: direccion_sec,
               };
    var content = Mustache.render(tmpl_estacion.innerHTML, data);

    document.getElementById('content').innerHTML += content;
}

function render_combos(combinaciones){
    var tmpl = document.getElementById('tmpl-combos');
    var data = {combos: JSON.stringify(combinaciones, null, '\t')};
    var content = Mustache.render(tmpl.innerHTML, data);

    document.getElementById('combinaciones').innerHTML += content;
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
    //var direccion = 'misma_linea;'
    var condicion = cond[helper.rand()];
    var res, msg;

    render_combos(subte.combinaciones);

    render_pago(direccion);
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
                        res.estaciones_alt,
                        res.direccion_sec);
    }

    render_escapamos(vueltas);
}


// iniciamos
jugar();

