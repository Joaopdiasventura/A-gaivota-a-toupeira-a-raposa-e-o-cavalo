let containerWidth = document.getElementById("container").offsetWidth;
let gaivotaHeight = document.getElementById("gaivota").offsetHeight;
let altura = ((containerWidth / 2) - (gaivotaHeight / 2));
let game = false;
let quantidade = 0;
let velocidade = 3;


const gaivotaElement = document.getElementById("gaivota");

gaivotaElement.style.top = altura + "px";

function gravidade() {
    let containerWidth = document.getElementById("container").offsetWidth;
    let gaivotaHeight = document.getElementById("gaivota").offsetHeight;

    if (game) {
        if (altura < document.getElementById("container").offsetHeight - gaivotaHeight) {
            altura += 4.5;
        }
        gaivotaElement.style.top = altura + "px";
        requestAnimationFrame(gravidade);
    } else {
        gaivotaElement.style.top = ((containerWidth / 2) - (gaivotaHeight / 2)) + "px";
    }
}

document.addEventListener("click", () => {
    if (altura >= 75) {
        altura -= 175;
    }
    if (game == false) {
        game = true;
        gravidade();
        temporizador = setInterval(() => {
            velocidade /= 2;
            console.log("velocidade mudou");
            quantidade += 1;
        }, velocidade * 5000);
    }
});

function mudarMontanha() {

    let containerWidth = document.getElementById("container").offsetWidth;
    let gaivotaWidth = document.getElementById("gaivota").offsetWidth;

    let altura1 = Math.floor(Math.random() * ((containerWidth - gaivotaWidth - 75) / 2)) + 30;
    let altura2 = containerWidth - (gaivotaWidth * 2.5) - altura1;

    document.getElementById("montanha1").style.height = altura1 + "px";
    document.getElementById("montanha2").style.height = altura2 + "px";

}

mudarMontanha();

setInterval(jogo, 1);

function jogo() {
    gaivotaElement.style.top = altura + "px";
    batida();
}

function batida() {
    let montanha1 = document.getElementById("montanha1");
    let montanha2 = document.getElementById("montanha2");
    let gaivota = document.getElementById("gaivota");

    let gaivotaleft = parseFloat(getComputedStyle(gaivota).left);
    let gaivotaTop = parseFloat(getComputedStyle(gaivota).top);

    let montanha1left = parseFloat(getComputedStyle(montanha1).left);
    let montanha1Top = parseFloat(getComputedStyle(montanha1).top);
    let montanha1Width = parseFloat(getComputedStyle(montanha1).width);
    let montanha1Height = parseFloat(getComputedStyle(montanha1).height);

    let montanha2left = parseFloat(getComputedStyle(montanha2).left);
    let montanha2Top = parseFloat(getComputedStyle(montanha2).top);
    let montanha2Width = parseFloat(getComputedStyle(montanha2).width);
    let montanha2Height = parseFloat(getComputedStyle(montanha2).height);

    if (
        gaivotaleft + gaivota.offsetWidth >= montanha1left &&
        gaivotaleft <= montanha1left + montanha1Width &&
        gaivotaTop + gaivota.offsetHeight >= montanha1Top &&
        gaivotaTop <= montanha1Top + montanha1Height && game
    ) {
        game = false;
        alert("Game Over: Você bateu no pilar 1! -->APERTE F5 NO TECLADO");
    }

    if (
        gaivotaleft + gaivota.offsetWidth >= montanha2left &&
        gaivotaleft <= montanha2left + montanha2Width &&
        gaivotaTop + gaivota.offsetHeight >= montanha2Top &&
        gaivotaTop <= montanha2Top + montanha2Height && game
    ) {
        game = false;
        alert("Game Over: Você bateu no pilar 2! -->APERTE F5 NO TECLADO");
        reiniciarJogo();
    }

    if (game) {
        if (quantidade > 2) {
            game = false;
            document.querySelector(".montanha").style.animation = "sumir1 4s linear";
            document.getElementById("gaivota").style.animation = "sumir 4s linear";
            document.getElementById("montanha2").style.animation = "sumir1 4s linear";
            altura = altura;
            setTimeout(() => {
                document.getElementById("montanha1").style.display = "none";
                document.getElementById("montanha2").style.display = "none";
                document.getElementById("gaivota").style.left = "100%";

                alert("Você passou por todos os pilares!")
                alert("parabéns, VOCÊ VENCEU");
                window.location.href = "./index.html";
            }, 4000);
        } else {
            document.getElementById("montanha1").style.animation = `andar ${velocidade}s infinite linear`;
            document.getElementById("montanha2").style.animation = `andar ${velocidade}s infinite linear`;
            document.getElementById("montanha1").style.display = "flex";
            document.getElementById("montanha2").style.display = "flex";
        }
    } else {
        document.getElementById("montanha1").style.animation = "";
        document.getElementById("montanha2").style.animation = "";
        document.getElementById("montanha1").style.display = "none";
        document.getElementById("montanha2").style.display = "none";
        mudarMontanha();
    }

    if ((montanha1left + montanha1Width) / 2 < 0) {
        mudarMontanha();
    }
}

function reiniciarJogo() {
    let containerWidth = document.getElementById("container").offsetWidth;
    let gaivotaHeight = document.getElementById("gaivota").offsetHeight;
    clearInterval(temporizador);
    gaivotaElement.style.top = ((containerWidth / 2) - (gaivotaHeight / 2)) + "px";
    game = false;
    velocidade = 3;
    mudarMontanha();
    altura = ((containerWidth / 2) - (gaivotaHeight / 2));
    quantidade = 0;
}

document.addEventListener("keydown", (e) => {
    if (e.key == "h" || e.key == "H") {
        window.location.href = "../index.html";
    }
});

alert ("Clique e passe pelos pilares!")