let enterrado = false;
let start = false;
let velocidade1 = 5;
let velocidade2 = 7;
let mudar1;
let mudar2;

document.addEventListener("keydown", (e) => {
  const toupeira = document.getElementById("toupeira");
  if (e.key == " ") {
    enterrado = true;
    toupeira.style.bottom = "0px";
    toupeira.src = "toupcava.png";
  }
  if (!start) {
    start = true;
    andar();
  }
  if (e.key == "h" || e.key == "H") {
    window.location.href = "../index.html";
  }
});

document.addEventListener("keyup", (e) => {
  const toupeira = document.getElementById("toupeira");
  if (e.key == " ") {
    enterrado = false;
    toupeira.style.bottom = "50px";
    toupeira.src = "toupcorren.png";
  }
  if (e.key == "h" || e.key == "H") {
    window.location.href = "../index.html";
  }
});

document.addEventListener("touchstart", ()=>{
    enterrado = true;
    toupeira.style.bottom = "0px";
  
    if (!start) {
        start = true;
        andar();
    }
});

document.addEventListener("touchend", () => {
    const toupeira = document.getElementById("toupeira");
    enterrado = false;
    toupeira.src = "toupcorren.png";
    toupeira.style.bottom = "50px";
});

function batida() {
  const toupeira = document.getElementById("toupeira");
  const pedra = document.getElementById("pedra");
  const enterro = document.getElementById("enterro");

  if (start) {
    if (
      parseInt(getComputedStyle(toupeira).left) +
        parseInt(getComputedStyle(toupeira).width) >
        parseInt(getComputedStyle(pedra).left) &&
      parseInt(getComputedStyle(pedra).left) +
      parseInt(getComputedStyle(pedra).width) >
        parseInt(getComputedStyle(toupeira).left) &&
      !enterrado
    ) {
      console.log("bateu");
      perdeu();
    }

    if (
      parseInt(getComputedStyle(toupeira).left) +
        parseInt(getComputedStyle(toupeira).width) >
        parseInt(getComputedStyle(enterro).left) &&
        parseInt(getComputedStyle(enterro).left) +
        parseInt(getComputedStyle(enterro).width) >
          parseInt(getComputedStyle(toupeira).left) &&
      enterrado
    ) {
      console.log("bateu");
      perdeu();
    }
  }

  requestAnimationFrame(batida);
}

batida();

function andar() {
  const enterro = document.getElementById("enterro");
  const pedra = document.getElementById("pedra");
  if (start) {
    pedra.style.display = "block";
    enterro.style.display = "block";
    pedra.style.animation = `andar ${velocidade1}s infinite linear`;
    enterro.style.animation = `andar ${velocidade2}s infinite linear`;
  } else {
    pedra.style.display = "none";
    enterro.style.display = "none";
  }
}

andar();

function perdeu() {
  document.getElementById("toupeira").src = "toupbatido.png";
  setTimeout(() => {
  alert("VOCÊ PERDEU!!!");
  window.location.reload();
  }, 10);
}
