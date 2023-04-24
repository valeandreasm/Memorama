// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo-restante')
let mostrarResetear = document.getElementById('reset-button')

// Sonidos 
let ganarSonido = new Audio('./assets/snd/win.wav');
let clickSonido = new Audio('./assets/snd/click.wav');
let correctoSonido = new Audio('./assets/snd/right.wav');
let falloSonido = new Audio('./assets/snd/wrong.wav');
let perdioSonido = new Audio('./assets/snd/lose.wav');
// Generación de números aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);

// Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            perdioSonido.play();
            bloquearTarjetas();
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#128129`
            mostrarTiempo.innerHTML = `Rayos! &#128531 Prueba de nuevo &#9757`
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} &#129301`
            mostrarResetear.style.visibility = "visible";
        }
    },1000)
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./assets/img/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
    }
}

let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', function() {
    location.reload();
});

// Función principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png">`;
        clickSonido.play();

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png">`;
        clickSonido.play();
        //Deshabilitar segundo botón
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            // Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            correctoSonido.play();
            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                ganarSonido.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} &#129321`
                mostrarTiempo.innerHTML = `Fantástico! &#128133 Sólo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} &#129304 &#128526`
            }
        }else{
            falloSonido.play();
            // Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },1000);
        }
    }
}