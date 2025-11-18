class ConversorDivisas {
    constructor() {
        
        this.tasasUSD = {
            'USD': 1.00,    
            'EUR': 0.93,    
            'MXN': 17.50,   
            'GBP': 0.81     
        };

        this.simbolos = {
            'USD': '$',
            'EUR': '€',
            'MXN': '$',
            'GBP': '£'
        };

    }

    convertir(cantidad, monedaBase) {
        const cantidadEnUSD = cantidad / this.tasasUSD[monedaBase];

        const resultados = [];
        for (const monedaDestino in this.tasasUSD) {
            if (monedaDestino !== monedaBase) {
                const valorConvertido = cantidadEnUSD * this.tasasUSD[monedaDestino];
                
                resultados.push({
                    moneda: monedaDestino,
                    simbolo: this.simbolos[monedaDestino],
                    valor: valorConvertido
                });
            }
        }
        return resultados;
    }
}

const conversor = new ConversorDivisas();

const inputCantidad = document.getElementById('cantidad');
const selectMonedaBase = document.getElementById('monedaBase');
const btnConvertir = document.getElementById('btnConvertir');
const divResultado = document.getElementById('resultadoDivisas');


function mostrarResultados(resultados, cantidadBase, monedaBase) {
    divResultado.innerHTML = `<h3>${cantidadBase} ${monedaBase} equivale a:</h3>`;
    
    resultados.forEach(res => {
        const p = document.createElement('p');
        const valorFormateado = res.valor.toLocaleString('es-MX', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
p.innerHTML = `<strong>${res.moneda}</strong>: ${res.simbolo} ${valorFormateado}`;        divResultado.appendChild(p);
    });
}

function manejarConversion() {
    const cantidad = parseFloat(inputCantidad.value);
    const monedaBase = selectMonedaBase.value;

    if (isNaN(cantidad) || cantidad <= 0) {
        divResultado.innerHTML = '<p style="color: red;">Por favor, ingrese una cantidad válida.</p>';
        return;
    }

    const resultados = conversor.convertir(cantidad, monedaBase);
    mostrarResultados(resultados, cantidad, monedaBase);
}

btnConvertir.addEventListener('click', manejarConversion);

document.addEventListener('DOMContentLoaded', manejarConversion);