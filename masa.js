class CalculadoraIMC {
    
    calcular(peso, altura) {
        if (altura <= 0) return 0;
        return peso / (altura * altura);
    }

    determinarCategoria(imc) {
        let categoria = '';
        let mensaje = '';
        let imagenTag = ''; 

        if (imc < 18.5) {
            categoria = 'Bajo Peso';
            mensaje = '¡Estás bajo de peso!';
            imagenTag = '';
        } else if (imc >= 18.5 && imc < 25) {
            categoria = 'Peso Normal';
            mensaje = '¡Felicidades! Tienes un peso saludable';
            imagenTag = '';
        } else if (imc >= 25 && imc < 30) {
            categoria = 'Sobrepeso';
            mensaje = 'Tienes sobrepeso considera dieta y aumentar la actividad física.';
            imagenTag = '';
        } else {
            categoria = 'Obesidad';
            mensaje = 'Estás en obesidad. Es importante buscar asesoramiento médico y cambio de estilo de vida.';
            imagenTag = '';
        }

        return {
            valorIMC: imc.toFixed(2), 
            categoria: categoria,
            mensaje: mensaje,
            imagen: imagenTag
        };
    }
}


const calculadora = new CalculadoraIMC();

const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');
const btnCalcularIMC = document.getElementById('btnCalcularIMC');
const divResultado = document.getElementById('resultadoIMC');


function mostrarResultado(resultado) {
    let color;
    switch (resultado.categoria) {
        case 'Bajo Peso': color = '#00aae4'; break;
        case 'Peso Normal': color = '#28a745'; break;
        case 'Sobrepeso': color = '#ffc107'; break;
        case 'Obesidad': color = '#dc3545'; break;
        default: color = '#343a40';
    }

    divResultado.style.borderColor = color;

    divResultado.innerHTML = `
        <p>Tu **IMC** es: <strong style="color: ${color}; font-size: 1.5em;">${resultado.valorIMC}</strong></p>
        <h3 style="color: ${color};">${resultado.categoria}</h3>
        <p class="mensaje">${resultado.mensaje}</p>
        ${resultado.imagen} `;
}

function manejarCalculoIMC() {
    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        divResultado.innerHTML = '<p style="color: red;">Por favor, ingrese valores válidos para peso y altura.</p>';
        return;
    }
    const imc = calculadora.calcular(peso, altura);
    const resultado = calculadora.determinarCategoria(imc);
    
    mostrarResultado(resultado);
}
btnCalcularIMC.addEventListener('click', manejarCalculoIMC);