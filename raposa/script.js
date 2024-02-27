const canvas = document.getElementById("labirintoCanvas");
const ctx = canvas.getContext("2d");

const tamanhoCelula = 45;
let frutas = 0;
const corFundo = "#000";
let corParede = "#FFFFFF";
const corJogador = "#f00";

let labirinto = [
  "##################################",
  "###################         ######",
  "##   #            # ####### #   ##",
  "## . # ########## # #     #   . ##",
  "##   # #00      # # #00 # ###   ##",
  "### ## #### ### # # #00 # # ######",
  "#   #  #00# #00 # # ### # #     ##",
  "# ###  ## # #00   #     # # ### ##",
  "#       # # ############# # # # ##",
  "####00  # #      #   #      # # ##",
  "#   00### # #### # # ######## # ##",
  "# #     # # #      # #   #      ##",
  "# # # ### # ########## # # ###  ##",
  "# # #   # # #        # # # #0#####",
  "# # # ### #   ##  ##   # # #0    #",
  "# # # # # # ###    ###   # ##### #",
  "# # # # # ###        ###   #     #",
  "# ##### #     #    #   ###### # ##",
  "#       ########  ## # # #    # ##",
  "######               # # 00 # # ##",
  "#    ##### # ######### # 00 # ####",
  "# #      # # #         #    #    #",
  "# ###### # # ### ####### ####### #",
  "#    #0  # #   # #       #       #",
  "# ###### # # # # ### # ### #######",
  "#   #00  ##### #   # # #   #     #",
  "#00 ####       # #   00## ## ### #",
  "#00    ######### #   00 # #  #   #",
  "######   #       #    # # # ## ###",
  "##   ### # ############ # # #   ##",
  "## .   # #        # # # # # # . ##",
  "##   # # # ###### # # # # # #   ##",
  "######   #      #     # #   ######",
  "##################################",
];

class Jogador {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  verificaColisao(dx, dy) {
    const novoX = this.x + dx;
    const novoY = this.y + dy;

    if (labirinto[novoY][novoX] !== "#") {
      return true;
    }

    return false;
  }

  mover(dx, dy) {
    const novoX = this.x + dx;
    const novoY = this.y + dy;

    if (this.verificaColisao(dx, dy)) {
      this.x += dx;
      this.y += dy;
      camera.x += dx;
      camera.y += dy;
    }
    const linhaAtual = labirinto[novoY].split("");

    if (linhaAtual[novoX] === ".") {
      linhaAtual[novoX] = " ";
      frutas += 1;

      if (frutas == 1) {
        alert("VOCÊ ESTÁ INDO BEM, CONTINUE ASSIM");
      }

      if (frutas == 3) {
        alert("FALTA POUCO, SÓ MAIS UMA");
      }

      if (frutas == 4) {
        alert("VOCÊ VENCEU PARABÉNS");
        window.location.href = "../index.html";
      }
      labirinto[novoY] = linhaAtual.join("");
    }
    else if (linhaAtual[novoX] === "0")  {
      alert("VOCÊ PERDEU");
      perda();
    }
  }

  desenhar() {
    const imagem = new Image();
    imagem.src = "./iconfoxsays.png";

    imagem.onload = () => {
      ctx.drawImage(
        imagem,
        (this.x - camera.x) * tamanhoCelula,
        (this.y - camera.y) * tamanhoCelula,
        tamanhoCelula,
        tamanhoCelula
      );
    };
  }
}

const jogador = new Jogador(16, 16);
  const camera = {
    x: 14,
    y: 13,
    largura: canvas.width / tamanhoCelula,
    altura: canvas.height / tamanhoCelula,
  };

function desenharLabirinto() {
  for (let i = 0; i < labirinto.length; i++) {
    for (let j = 0; j < labirinto[i].length; j++) {
      if (labirinto[i][j] === "#") {
        corParede = "#FFFFFF";
      } else if(labirinto[i][j] === "0"){
        corParede = "#FF0000";
      } else {
        corParede = "#000000";
      }
      ctx.fillStyle = corParede;
      ctx.fillRect(
        j * tamanhoCelula - camera.x * tamanhoCelula,
        i * tamanhoCelula - camera.y * tamanhoCelula,
        tamanhoCelula,
        tamanhoCelula
      );
      if (labirinto[i][j] === ".") {
        const imagem = new Image();
        imagem.src = "./coletavel.png";

        imagem.onload = () => {
          ctx.drawImage(
            imagem,
            j * tamanhoCelula - camera.x * tamanhoCelula,
            i * tamanhoCelula - camera.y * tamanhoCelula,
            tamanhoCelula,
            tamanhoCelula
          );
        };
      }
    }
  }
}

function limparTela() {
  ctx.fillStyle = corFundo;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function loopPrincipal() {
  limparTela();
  desenharLabirinto();
  jogador.desenhar();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft" | "a" | "A":
      jogador.mover(-1, 0);
      break;
    case "ArrowRight" | "d" | "D":
      jogador.mover(1, 0);
      break;
    case "ArrowUp" | "w" | "W":
      jogador.mover(0, -1);
      break;
    case "ArrowDown" | "s" | "S":
      jogador.mover(0, 1);
      break;
    case "h":
      window.location.href = "../index.html";
  }

  loopPrincipal();
});

loopPrincipal();

function perda() {
  jogador.x = 16;
  jogador.y = 16;
  camera.x = 14;
  camera.y = 13;
  frutas = 0;
  labirinto = [
    "##################################",
    "###################         ######",
    "##   #            # ####### #   ##",
    "## . # ########## # #     #   . ##",
    "##   # #00      # # #00 # ###   ##",
    "### ## #### ### # # #00 # # ######",
    "#   #  #00# #00 # # ### # #     ##",
    "# ###  ## # #00   #     # # ### ##",
    "#       # # ############# # # # ##",
    "####00  # #      #   #      # # ##",
    "#   00### # #### # # ######## # ##",
    "# #     # # #      # #   #      ##",
    "# # # ### # ########## # # ###  ##",
    "# # #   # # #        # # # #0#####",
    "# # # ### #   ##  ##   # # #0    #",
    "# # # # # # ###    ###   # ##### #",
    "# # # # # ###        ###   #     #",
    "# ##### #     #    #   ###### # ##",
    "#       ########  ## # # #    # ##",
    "######               # # 00 # # ##",
    "#    ##### # ######### # 00 # ####",
    "# #      # # #         #    #    #",
    "# ###### # # ### ####### ####### #",
    "#    #0  # #   # #       #       #",
    "# ###### # # # # ### # ### #######",
    "#   #00  ##### #   # # #   #     #",
    "#00 ####       # #   00## ## ### #",
    "#00    ######### #   00 # #  #   #",
    "######   #       #    # # # ## ###",
    "##   ### # ############ # # #   ##",
    "## .   # #        # # # # # # . ##",
    "##   # # # ###### # # # # # #   ##",
    "######   #      #     # #   ######",
    "##################################",
  ];
}

alert ("Bem Vindo ao Labirinto!")
alert ("Você precisa explora-lo e buscar as 4 frutas perdidas.")
alert ("Cuidado que o vermelho mata :)")