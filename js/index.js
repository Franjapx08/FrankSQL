var reser = ['select', 'from', 'where', 'in', 'and', 'or', 'created', 'table', 'char', 'numeric', 'not', 'null', 'constraint', 'key', 'primary', 'foreign', 'references', 'insert', 'into', 'values']
function reservada(txt){
	return (reser.indexOf(txt) > -1);
}
function error(err){
	$('#error').html(err)
}
var pila = 0;
//Automatas
var select = {
	'select': {
		'camino': ['*', 'atributo1'],
		'checar': (x) => {
			return x == 'select'
		},
		'mensaje': (l) => {
			error('Se esperaba identificador en linea ' + l);
		}
	},
	'*':{
		'camino':['from'],
		'checar': (x) => {
			return x == '*' 
		},
		'mensaje': (l) => {
			error('Se esperaba palabra reservada en linea ' + l);
		}
	},
	'atributo1': {
		'camino': [',', 'from'],
		'checar': (x) => {
			return !reservada(x) && !!(x.match(/^([A-Z])+([\w|\#])*$/gi));
		},
		'mensaje': (l) => {
			error('Se esperaba delimitador o palabra reservada en linea ' + l);
		}
	},
	',': {
		'camino': ['atributo1'],
		'checar': (x) => {
			return x == ',';
		},
		'mensaje': (l) => {
			error('Se esperaba identificador ' + l);			
		}
	},
	'from': {
		'camino': ['tabla'],
		'checar': (x) => {
			return x == 'from'
		},
		'mensaje': (l) => {
			error('Se esperaba identificador en linea ' + l);
		}
	},
	'tabla': {
		'camino': ['as', 'coma', 'where'],
		'checar': (x) => {
			return !reservada(x) && !!(x.match(/^([A-Z])+([\w|\#])*$/gi))
		},
		'mensaje': (l) => {
			error('Se esperaba identificador, palabra reservada o delimitador en linea' + l);
		}
	},
	'as':{
		'camino': ['where', 'coma'],
		'checar': (x) => {
			return !reservada(x) && !!(x.match(/^([A-Z])+([\w|\#])*$/gi))
		},
		'mensaje': (l) => {
			error('Se esperaba delimitador o palabra reservada en linea ' + l);
		}
	},
	'coma':{
		'camino': ['tabla'],
		'checar': (x) => {
			return x == ','
		},
		'mensaje': (l) => {
			error('Se esperaba identificador en linea ' + l);
		}
	},
	'where':{
		'camino': ['valor1'],
		'checar': (x) => {
			return x == 'where'
		},
		'mensaje': (l) => {
			error('Se esperaba identificador o constante en linea ' + l);
		}
	},
	'valor1': {
		'camino': ['operador', 'in'],
		'checar': (x) => {
			return !reservada(x) && !!(x.match(/(^[+-]?\d+(\.\d+)?$)|(^'([^'])*'$)|(^([A-Z])+([\w|\d|\#])*(\.([A-Z])+[\w|\d|\#]*)?$)/gi))
		},
		'mensaje': (l) => {
			error('Se esperaba operador o palabra reservada en linea ' + l);
		}
	},
	'operador': {
		'camino': ['valor2'],
		'checar': (x) => {
			return x == '<' || x == '>' || x == '<=' || x == '>=' || x == '='
		},
		'mensaje': (l) => {
			error('Se esperaba identificador o constante en linea ' + l);
		}
	},
	'valor2': {
		'camino': ['and', ')', ';'],
		'checar': (x) => {
			return !reservada(x) && !!(x.match(/(^[+-]?\d+(\.\d+)?$)|(^'([^'])*'$)|(^([A-Z])+([\w|\d|\#])*(\.([A-Z])+[\w|\d|\#]*)?$)/gi))
		},
		'mensaje': (l) => {
			error('Se esperaba delimitador o palabra reservada en linea ' + l);
		}
	},
	'and': {
		'camino': ['valor1'],
		'checar': (x) => {
			return x == 'and';
		},
		'mensaje': (l) => {
			error('Se esperaba identificador o constante en linea ' + l);
		}
	},
	'in': {
		'camino': ['('],
		'checar': (x) => {
			return x == 'in';
		},
		'mensaje': (l) => {
			error('Se esperaba delimitador ' + l);
		}
	},
	'(': {
		'camino': ['select'],
		'checar': (x) => {
			pila++;
			return x == '(';
		},
		'mensaje': (l) => {
			error('Se esperaba palabra reservada en linea ' + l);
		}
	},
	')': {
		'camino': ['and', ')', ';'],
		'checar': (x) => {
			pila--;
			return pila>=0 && x == '(';
		},
		'mensaje': (l) => {
			error('Se esperaba palabra reservada o delimitador en linea ' + l);
		}
	},
	';': {
		'camino': [],
		'checar': (x) => {
			return x == ';';
		}
	}
	//return !reservada(x) && () x.match(/(^[+-]?\d+(\.\d+)?$)|(^'([^'])*'$)|(^([A-Z])+([\w|\d|\#])*(\.([A-Z])+[\w|\d|\#]*)?$)/gi)	
}
jQuery(document).ready(function($) {
	//Funcion para imprimir errores
	$("#actp").on('click', function(event) {
		t = $('#texto').val();
		let pos = [];
		t = t.split(/\r|\r\n|\n/);
		for(let i in t){
			t[i] = t[i].split(/(\s|\,|\;|\(|\)|\<\=|\>\=|\<|\>|\=)/gi)
		}
		console.log(t);
		for(let i in t){
			for(let j in t[i]){
				
			}
		}
	});	 
});