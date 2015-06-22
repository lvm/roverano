var pasajero = simulador.pasajero;
var subte = simulador.subte;

function jugar(){
    var dir = ['derecha', 'izquierda']; // 'misma_linea',
    var cond = ['con_anden_medio', 'combinacion'];

    var escapamos = false;
    var estacion = "peru";
    var vueltas = 0;
    var direccion = dir[pasajero.rand()];
    var condicion = cond[pasajero.rand()];
    var res;

    document.write("<br>ESTACION> ", estacion);
    document.write("<br>DIRECCION> ", direccion);
    document.write("<br>CONDICION> ", condicion);

    while (!escapamos){
        res = pasajero.viajar_a_estacion({
	    'estacion': estacion,
	    'direccion': direccion,
	    'condicion': condicion,
        })
        estacion = res.estacion;
        if(pasajero.en_linea_b(estacion)){
            escapamos = true;
        }
        else{
            vueltas += 1
        }

        direccion = dir[pasajero.rand()];
        condicion = cond[pasajero.rand()];

        document.write("<br>");
        document.write("<br>ESTACION> ", estacion);
        document.write("<br>DIRECCION> ", direccion);
        document.write("<br>CONDICION> ", condicion);
        if(escapamos){
            document.write("<hr>LINEA BBBBB<hr>");
        }

    }

    document.write( "Escapamos! en ", vueltas, " vueltas");
}


jugar();
