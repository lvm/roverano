// polyfills

if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

// var objeto

var pasajero = {};
var subte = {};
var helper = {};

var simulador = {
  pasajero: pasajero,
  subte: subte,
  helper: helper
};

// vars constantes
subte.lineas = {
  'A': ['peru', 'piedras', 'lima'],
  'B': ['carlos-pellegrini'],
  'C': ['diagonal-norte', 'av-de-mayo',
    'mariano-moreno', 'independencia-C'
  ],
  'D': ['9-de-julio', 'catedral'],
  'E': ['bolivar', 'belgrano', 'independencia-E'],
}

subte.combinaciones = {
  // A
  'peru': {
    'derecha': 'catedral',
    'izquierda': 'bolivar',
    'con_anden_medio': {
      'izquierda': 'bolivar',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['piedras'],
  },
  'piedras': {
    'derecha': 'catedral',
    'izquierda': 'av-de-mayo',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['lima'],
  },
  'lima': {
    'derecha': 'av-de-mayo',
    'izquierda': '9-de-julio',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['peru', 'av-de-mayo'],
  },
  // B
  'carlos-pellegrini': {
    'derecha': '9-de-julio',
    'izquierda': 'diagonal-norte',
    'con_anden_medio': {
      'izquierda': 'bolivar',
      'derecha': 'independencia-E',
    },
    'misma_linea': ['carlos-pellegrini'],
  },
  // C
  'diagonal-norte': {
    'derecha': '9-de-julio',
    'izquierda': 'peru',
    'con_anden_medio': {
      'izquierda': 'carlos-pellegrini',
      'derecha': 'independencia-E',
    },
    'misma_linea': ['av-de-mayo', '9-de-julio'],
  },
  'av-de-mayo': {
    'derecha': '9-de-julio',
    'izquierda': 'lima',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['mariano-moreno', 'lima'],
  },
  'mariano-moreno': {
    'derecha': 'independencia-E',
    'izquierda': 'lima',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['independencia-C', 'diagonal-norte'],
  },
  'independencia-C': {
    'derecha': 'independencia-E',
    'izquierda': 'lima',
    'con_anden_medio': {
      'izquierda': 'carlos-pellegrini',
      'derecha': 'independencia-E',
    },
    'misma_linea': ['diagonal-norte', 'independencia-E'],
  },
  // D
  'catedral': {
    'derecha': 'peru',
    'izquierda': 'bolivar',
    'con_anden_medio': {
      'izquierda': 'bolivar',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['9-de-julio', 'peru'],
  },
  '9-de-julio': {
    'derecha': 'diagonal-norte',
    'izquierda': 'carlos-pellegrini',
    'con_anden_medio': {
      'izquierda': 'bolivar',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['carlos-pellegrini', 'catedral'],
  },

  // E
  'bolivar': {
    'derecha': 'catedral',
    'izquierda': 'peru',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'carlos-pellegrini',
    },
    'misma_linea': ['belgrano', 'peru'],
  },
  'belgrano': {
    'derecha': 'peru',
    'izquierda': 'independencia-C',
    'con_anden_medio': {
      'izquierda': 'independencia-E',
      'derecha': 'bolivar',
    },
    'misma_linea': ['independencia-E'],
  },
  'independencia-E': {
    'derecha': 'peru',
    'izquierda': 'independencia-C',
    'con_anden_medio': {
      'izquierda': 'carlos-pellegrini',
      'derecha': 'bolivar',
    },
    'misma_linea': ['independencia-C', 'bolivar'],
  },
};

subte.con_anden_medio = ['independencia-E', 'bolivar', 'carlos-pellegrini'];

helper.nice_name = {
  'peru': 'Peru',
  'piedras': 'Piedras',
  'lima': 'Lima',
  'carlos-pellegrini': 'Carlos Pellegrini',
  'diagonal-norte': 'Diagonal Norte',
  'av-de-mayo': 'Avenida de Mayo',
  'mariano-moreno': 'Mariano Moreno',
  'independencia-C': 'Independencia (C)',
  '9-de-julio': '9 de Julio',
  'catedral': 'Catedral',
  'bolivar': 'Bolivar',
  'belgrano': 'Belgrano',
  'independencia-E': 'Independencia (E)',
  'con_anden_medio': 'Estacion con anden en el medio',
  'combinacion': 'Combinacion',
  'misma_linea': 'Misma linea',
  'derecha': 'Derecha',
  'izquierda': 'Izquierda',
  'continua': 'Continua',
}



// funcs

// genera un nro random
// params: int, int
// return: int
helper.rand = function(max) {
  max = max || 0;
  if (max > 0) {
    rand = Math.random() * (max - 1);
  } else {
    rand = Math.random();
  }

  return Math.round(rand);
}

// sale del simulador
// params: nil
// return: nil
simulador.game_over = function() {
  console.log("Perdiste");
}

// recibe datos
// params: nil
// return: input
simulador.verificar = function() {
  return window.prompt("> ");
}

// nos devuelve una estacion
// params: dict
// return: dict
pasajero.viajar_a_estacion = function(viaje_opts) {
  var direcciones_posibles = ['derecha', 'izquierda',
    //'misma_linea',
  ];
  var condiciones_posibles = ['combinacion', 'con_anden_medio'];
  var opts = {
    estacion: '', // combinaciones.keys();
    direccion: '', // direcciones_posibles;
    condicion: '', // condiciones_posibles;
  };
  Object.assign(opts, viaje_opts);

  var linea, r_dir, s_dir, e_alt, _est, e_pos = 0;

  var est = opts.estacion;
  // HERE BE DRAGONS.
  // esto no deberia pasar nunca
  if (!est) {
    return false;
  }

  if (opts.direccion != 'misma_linea') {
    if (condiciones_posibles.includes(opts.condicion)) {
      if (opts.condicion == 'con_anden_medio') {
        est = subte.combinaciones[opts.estacion][opts.condicion][opts.direccion];
      } else if (opts.condicion == 'combinacion') {
        est = subte.combinaciones[opts.estacion][opts.direccion];
      }
    }
  } else {
    if (opts.condicion == 'con_anden_medio') {
      r_dir = helper.rand(direcciones_posibles.length);
      s_dir = direcciones_posibles[r_dir];
      est = subte.combinaciones[opts.estacion][opts.condicion][s_dir];
    } else {
      _est = subte.combinaciones[opts.estacion][opts.direccion];
      e_rand = helper.rand(_est.length);
      est = _est[e_rand];
    }
  }

  return {
    'estacion': est,
    'condicion': opts.condicion,
    'direccion': opts.direccion,
    'estaciones_alt': _est,
    'direccion_sec': s_dir,
  };
}

// simula una espera
// params: nil
// return: nil
pasajero.sentarse_y_esperar = function() {
  console.log("Esperando...")
}


// simula llegada de subte
// params: nil
// return: int
pasajero.esperar_subte = function() {
  return rand();
}


// verifica la linea de una estacion
// params: str
// return: str | bool
subte.estacion_en_linea = function(estacion) {
  for (linea in subte.lineas) {
    if (subte.lineas[linea].includes(estacion)) {
      return linea;
    }
  }

  return false;
}


// verifica que las estaciones esten en la misma linea
// params: str, str
// return: bool
subte.misma_linea = function(estacion, prox_estacion) {
  linea = subte.estacion_en_linea(estacion);
  if (subte.lineas[linea].includes(prox_estacion)) {
    return true;
  }

  return false;
}


// verifica si una estacion esta en linea B
// params: str
// return: bool
subte.en_linea_b = function(estacion) {
  return subte.lineas.B.includes(estacion);
}


if (typeof exports === 'object') {
  for (var i in simulador) {
    exports[i] = simulador[i];
  }
}
