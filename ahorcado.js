const vistaInicio = document.getElementById("inicio");
const vistaAgregarPalabra = document.getElementById("agregar-palabra");
const vistaJuego = document.getElementById("juego");

const palabras = ["AGUILA", "AVESTRUZ", "BALLENA", "BISONTE", "BUFALO", "BUHO", "BUITRE", "BURRO", "CABALLO", "CABRA", "CAMALEON", "CAMELLO", "CANARIO", "CASTOR", "CEBRA", "CERDO", "CIERVO", "COBRA", "COLIBRI", "COMADREJA", "CONDOR", "CONEJO", "DELFIN", "ELEFANTE", "FAISAN", "FLAMENCO", "FOCA", "GALLINA", "GALLO", "GATO", "GORILA", "HAMSTER", "HIENA", "HIPOPOTAMO", "JABALI", "JAGUAR", "JIRAFA", "KOALA", "LAGARTO", "LEON", "LEOPARDO", "LLAMA", "LOBO", "LORO", "MANATI", "MAPACHE", "MONO", "MURCIELAGO", "NUTRIA", "ORCA", "OSO", "PALOMA", "PANDA", "PATO", "PELICANO", "PERRO", "PUMA", "RANA", "RATON", "RENO", "RINOCERONTE", "SALAMANDRA", "SAPO", "SERPIENTE", "TAPIR", "TEJON", "TIBURON", "TIGRE", "TOPO", "TORO", "TUCAN", "VACA", "ZORRILLO", "ZORRO"];

const regex = new RegExp("^[A-Z\\s]+$");

const mostrar = (vista) =>{
    vistaInicio.classList.add("display-none");
    vistaAgregarPalabra.classList.add("display-none");
    vistaJuego.classList.add("display-none");
    vista.classList.remove("display-none");
}

const escogerPalabra = (array) =>{
    const posicionRandom = Math.round(Math.random() * (array.length-1));
    const secreto = array[posicionRandom];
    array.splice(posicionRandom,1);
    return secreto;
}

const mostrarGuiones = (palabra) =>{
    const word = document.querySelector(".word");
    word.innerHTML = "";
    const cantidad = palabra.length;
    for (let i = 0; i < cantidad; i++) {
        const letra = palabra[i];
        word.innerHTML += `<div class="letter">
                                <p class="${letra} display-none">${letra}</p>
                                <img src="img/underline.png">
                            </div>`;
    };
}

const mostrarLetraCorrecta = (letra)=> { 
    const letter = document.querySelectorAll(`.${letra}`);
    letter.forEach(letra =>(
        letra.classList.remove("display-none")
    ));
}

const escribirLetraIncorrecta = (errores) => { 
    const other = document.querySelector(".other");
    other.innerHTML = "";
    errores.forEach(error =>(other.innerHTML += `<p>${error}</p>`));
    
}

const estaEnPalabra = (letra, palabra) => {
    return palabra.includes(letra);
}

const advertir = (frase, colorbg) => {
    const adv = document.querySelector(".advertencias");
    adv.textContent = frase;
    adv.style.backgroundColor = colorbg;
    adv.style.opacity = "1";
    adv.style.marginBottom = "1rem"; 
    setTimeout(() => {
        adv.style.opacity = "0"; 
    }, 2000);
}

const verificarLetra = (secreto, errores, letrasCorrectas, nodo=document) => {
    nodo.addEventListener("keyup", function eventoKeyUp (e){
        let key = (screen.width < 1080) ? e.target.value : e.key;
        if (regex.test(key)) {
            let letra = key;
            if (estaEnPalabra(letra, secreto)) {
                if (!letrasCorrectas.includes(letra)) {
                    letrasCorrectas.push(letra);
                    mostrarLetraCorrecta(letra);
                }else{
                    alert(letra + " ya fue agregada", "green");
                }
            }else{
                if (!errores.includes(letra)) {
                    errores.push(letra);
                    escribirLetraIncorrecta(errores);
                    switch (errores.length) {
                        case 1:
                            dibujarCabeza()
                            break;
                        case 2:
                            dibujarCuerpo()
                            break;
                        case 3:
                            dibujarPiernaDerecha()
                            break;
                        case 4:
                            dibujarPiernaIzquierda()
                            break;
                        case 5:
                            dibujarBrazoDerecho()
                            break;
                        case 6:
                            dibujarBrazoIzquierdo()
                            break;
                    }
                }else{
                    alert(letra + " ya fue agregada", "yellow");
                }
            }
            let fin = verificarFinJuego(secreto, letrasCorrectas, errores);
            fin && nodo.removeEventListener("keyup", eventoKeyUp);
        }else{
            alert("Solo se permiten LETRAS MAYUSCULAS", "red");
        }
    })
}

const verificarFinJuego = (secreto, letrasCorrectas, errores) => {
    if (errores.length == 6) {
        escribirTexto("PERDISTE????","red");
        mostrarPalabra(secreto);
        btnDesistir.classList.add("display-none");
        return true
    }
    const dataArr = new Set(secreto);
    let arraySecreto = [...dataArr];
    if (letrasCorrectas.length == arraySecreto.length) {
        escribirTexto("GANASTE????","green");
        btnDesistir.classList.add("display-none");
        return true
    }
    return false
}

const inputMobile = () => {
    const input = document.querySelector(".mobile");
    input.addEventListener("keyup", ()=>{
        setTimeout(() => {
            input.value=""
        }, 200);
    });
    return input;
}

const IniciarJuego = () => {
    let errores = [];
    let letrasCorrectas = [];
    const secreto = escogerPalabra(palabras);
    const mobile = inputMobile();
    mostrarGuiones(secreto);
    mostrar(vistaJuego);
    verificarLetra(secreto, errores, letrasCorrectas, (screen.width < 1080) ? mobile : document);
}

const AgregarPalabra = (palabra) => {
    if (palabra != "") {
        nuevaPalabra = palabra.replace(/ /g, "").toUpperCase();
        if (!palabras.includes(nuevaPalabra)){
            palabras.push(nuevaPalabra);
            alert("Se agreg??: " + nuevaPalabra);
        }else{
            alert(nuevaPalabra + " ya se habia agregado");
        }

    }
}

const btnInciarJuego = document.getElementById("iniciar-juego");
btnInciarJuego.onclick = IniciarJuego;

const btnAgregarPalabra = document.getElementById("nueva-palabra");
btnAgregarPalabra.onclick = ()=>{mostrar(vistaAgregarPalabra)};

const inputNuevaPalabra = document.getElementById("input-nueva-palabra");
inputNuevaPalabra.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") {
        const palabra = inputNuevaPalabra.value;
        AgregarPalabra(palabra);
        inputNuevaPalabra.value = "";
    }
})

const btnGuardar = document.getElementById("guardar");
btnGuardar.addEventListener("click",()=>{
    const palabra = inputNuevaPalabra.value;
    AgregarPalabra(palabra);
    IniciarJuego();
})

const btnCancelar = document.getElementById("cancelar");
btnCancelar.onclick = ()=>{location.reload()};

const btnNuevoJuego = document.getElementById("nuevoJuego");
btnNuevoJuego.onclick = ()=>{
    sessionStorage.removeItem("array");
    location.reload();
};

const btnDesistir = document.getElementById("desistir");
btnDesistir.onclick = ()=>{
    sessionStorage.setItem("array", JSON.stringify(palabras));
    location.reload();
}

let nuevoArray = JSON.parse(sessionStorage.getItem("array"));
if (nuevoArray) {
    if (nuevoArray.length > 0) {
        palabras = nuevoArray;
        console.log(nuevoArray);
        IniciarJuego();
    }else{
        escribirTexto("PERDISTE","red");
        btnDesistir.classList.add("display-none");
        mostrar(vistaJuego);
    }
}