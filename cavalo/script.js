let pulando = false;
let start = false;

document.addEventListener("keydown", (e) => {
  if (e.key == " " && !pulando && start) {
    const cavalo = document.getElementById("cavalo");
    cavalo.style.animation = "pular 0.6s linear";
    cavalo.src = "cavapulan.png";
    pulando = true;
    setTimeout(() => {
      cavalo.style.animation = "";
      cavalo.src = "cavacorre.png";
      pulando = false;
    }, 600);
  }

  if (e.key == " " && !start) {
    start = true;
    andar();
  }

  if (e.key == "h" || e.key == "H") {
    window.location.href = "../index.html";
  }
});

function batida() {
  const cavalo = document.getElementById("cavalo");
  const pedra = document.getElementById("pedra");
  if (
    parseInt(getComputedStyle(cavalo).left) +
      parseInt(getComputedStyle(cavalo).width) >
      parseInt(getComputedStyle(pedra).left) &&
    parseInt(getComputedStyle(pedra).left) +
      parseInt(getComputedStyle(pedra).width) >
      parseInt(getComputedStyle(cavalo).left) &&
    parseInt(getComputedStyle(cavalo).bottom) <=
      parseInt(getComputedStyle(cavalo).height) &&
      start
  ) {
    alert("VOCÊ PERDEU!!!");
    window.location.reload();
  }

  requestAnimationFrame(batida);
}

batida();

function andar() {
    const pedra = document.getElementById("pedra");
    if (start) {
        pedra.style.animation = "andar 1s infinite linear";
        pedra.style.display = "block";
    }
    else{
        pedra.style.animation = "";
        pedra.style.display = "none";
    }
}

andar();
