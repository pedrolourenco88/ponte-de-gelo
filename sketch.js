let tabuleiro = []; // Vetor que guarda o estado das casas (0-normal, 1-rachada)
let pos_bot = 19;
let pos_player = 0;
let largura = 896, altura = 608;
let verificar = false, parado = false;
let dado_player = 0, dado_bot = 0;
let personagem = []; // representação do humano
let automatico = []; // representação do bot  
let sprite = [];
let vitoria = []; //musica de vitória
let derrota = []; //musica de derrota
let fundo, rachado, fundo_final, inicio;
let cont_p = 0, tempo_p = 0, cont_b = 0, tempo_b = 0, cont_c =1 , tempo_c = 0;
let tela = 3;
let musiquinha = 0;
let musicaVitoriaTocada = false;
let musicaDerrotaTocada = false;

function preload() {
  fundo = loadImage("fundo_ice_bridge.png");
  rachado = loadImage("ice_broken.png");
  fundo_final = loadImage("fundo_vitoria.jpg")
  inicio = loadImage("file_0000000055a061f88f16820f3d1082c9 (1).png")
  for (let i = 0; i < 3; i++) {
    personagem[i] = loadImage("penguin_" + i + ".png");
  }
  for (let i = 0; i < 7; i++) {
    automatico[i] = loadImage("snowman_" + i + ".png");
  }
   for (let i = 1; i < 9; i++) {
    sprite[i] = loadImage("Animacao_final/slide" + (i) + ".png");
  }
  
  vitoria[0] = loadSound('EFEITOS_SONOROS/ele_fez_de_novo.mp3')
  vitoria[1] = loadSound('EFEITOS_SONOROS/protagonista.mp3')
  vitoria[2] = loadSound('EFEITOS_SONOROS/uma_maquina.mp3')
  derrota[0] = loadSound('EFEITOS_SONOROS/smzinho_perdi.mp3')
  derrota[1] = loadSound('EFEITOS_SONOROS/dumb_ways.mp3')
  derrota[2] = loadSound('EFEITOS_SONOROS/linkin_park.mp3')
}

// Função para animar o Pinguim
function animarPlayer() {
  image(personagem[cont_p], 120 + pos_player * 32, 235, 48, 48);
  tempo_p++;
  if (tempo_p > 5) {
    cont_p++;
    tempo_p = 0;
    if (cont_p > 2) {
      // A quantidade é 2 (índices 0, 1, 2)
      cont_p = 0;
    }
  }
}

// Função para animar o Bot (Boneco de Neve)
function animarBot() {
  image(automatico[cont_b], 128 + pos_bot * 32, 220, 32, 64); // Ajustei o tamanho para ficar melhor
  tempo_b++;
  if (tempo_b > 5) {
    // A velocidade era 2
    cont_b++;
    tempo_b = 0;
    if (cont_b > 6) {
      // A quantidade era 6 (índices 0 a 6)
      cont_b = 0;
    }
  }
}

// Função para animação final
function animarSprite() {
  image(sprite[cont_c], 450, 500, 78, 106); // Ajustei o tamanho para ficar melhor
  tempo_c++;
  if (tempo_c > 5) {
    // A velocidade era 2
    cont_c++;
    tempo_c = 0;
    if (cont_c > 8) {
      // A quantidade era 6 (índices 0 a 6)
      cont_c = 1;
    }
  }
}

function limparcasas() {
  for (let i = 0; i < 20; i++) {
    tabuleiro[i] = 0;
  }
}

function setup() {
  createCanvas(largura, altura);
  limparcasas();
  dado_player = parseInt(random(1, 5));
  dado_bot = parseInt(random(0, 5));
}

function draw() {
  musiquinha = parseInt(random(0,3))
  
  if(tela==0){
  background(220);
  image(fundo, -64, -32);

  for (let i = 0; i < 20; i++) {
    //colorir o quadrado cinza
    if (tabuleiro[i] == 0) noFill();
    rect(128 + i * 32, 256, 32, 32); //desenha os quadrados
    fill(0);
    textAlign(CENTER);
    textSize(12);
    text(i + 1, 144 + i * 32, 305); //numera as casas
  }
  for (let i = 0; i < 20; i++) {
    if (tabuleiro[i] === 1) image(rachado, 128 + i * 32, 256); //casa com rachadura
  }
  rect(288, 400, 120, 80, 10);
  rect(488, 400, 120, 80, 10);

  fill(255);
  textSize(30);
  textFont("Comic Sans MS")
  text("Andar", 345, 450);
  text("Parado", 550, 450);
  textAlign(LEFT);
  text("Deseja avançar " + dado_player + " casas", 290, 60);
  textSize(20);
  text("Dado jogador: " + dado_player, 350, 560);
  text("Dado automático: " + dado_bot, 350, 580);

  animarPlayer();
  animarBot();
}
  
  else if(tela == 1){   //tela de vitória
    background(220);
    image(fundo_final, -64, 0);
    textSize(55)
    textFont("Comic Sans MS")
    fill(0)
    text("Você Ganhou",305,305)
    fill(255)
    text("Você Ganhou",300,300)
    animarSprite()
    
    if (!musicaVitoriaTocada) {
        vitoria[musiquinha].play();
        musicaVitoriaTocada = true;
        musicaDerrotaTocada = false; // Garante que a derrota esteja desligada
    }
    
  }
  
  else if(tela == 2){   //tela de derrota
    background(220);
    image(fundo_final, -64, 0);
    textSize(55)
    textFont("Comic Sans MS")
    fill(0)
    text("Você Perdeu",305,305)
    fill(255)
    text("Você Perdeu",300,300)
    animarSprite()
    if (!musicaDerrotaTocada) {
        derrota[musiquinha].play();
        musicaDerrotaTocada = true;
        musicaVitoriaTocada = false; // Garante que a vitória esteja desligada
    }
  }
  
  else if(tela==3){
    image(inicio, 0, 0, 900, 608)
  }
  
}

function mouseClicked() {
  
  if(tela==0){
    if (mouseX > 288 && mouseX < 408 && mouseY > 400 && mouseY < 480) {
      verificar = true;
    }
    if (mouseX > 488 && mouseX < 608 && mouseY > 400 && mouseY < 480) {
      parado = true;
    }

  //vez jogador
  if (verificar) {
    pos_player += dado_player;
    if (pos_player > 19) pos_player = 19;
    //caso o jogador ultrapasse o limite de casas
    if(pos_bot == pos_player){
      tabuleiro[pos_player] = 0;
      pos_bot = 19;
      pos_player=0;
    }
  
    if (tabuleiro[pos_player] == 0) {
      tabuleiro[pos_player] = 1; //casa que está rachada
    } 
    else {
      tabuleiro[pos_player] = 0; //reseta a casa
      pos_player = 0;
    }
    verificar = false;
    dado_player = parseInt(random(1, 5));

    //vez do bot
    pos_bot -= dado_bot; // avanças casas no sentido contrário para o bot
    //caso o bot ultrapasse o limite de casas
    if (pos_bot < 0) pos_bot = 0;
    //caso estejam na mesma casa
    if(pos_bot == pos_player){
      tabuleiro[pos_player] = 0;
      pos_bot = 19;
      pos_player=0;
    }
    
    if (tabuleiro[pos_bot] == 0 && dado_bot != 0) {
      tabuleiro[pos_bot] = 1; //atribui uma rachadura a ela
      dado_bot = parseInt(random(0, 5));
    } 
    else if (tabuleiro[pos_bot] == 1 && dado_bot != 0) {
      //se a casa estiver rachada
      tabuleiro[pos_bot] = 0; //restaura a casa
      pos_bot = 19; // volata para o inicio
      dado_bot = parseInt(random(0, 5)); // sorteia um novo valor
    } 
    else dado_bot = parseInt(random(0, 5)); // sorteia um novo valor
    
    if (pos_player == 19) {//verifica se humano ganhou
      tela = 1;
      pos_bot = 19;
      pos_player = 0;
      limparcasas();
    }  
    if (pos_bot == 0) {// verifica se o bot ganhou/humano perdeu
        tela =2;
        pos_bot = 19;
        pos_player = 0;
        limparcasas();
    }
  } 
  
  else if (parado) {// caso selecione para ficar parado
    pos_bot -= dado_bot; // avanças casas no sentido contrário para o bot
    //caso estejam na mesma casa
    if (pos_bot == pos_player){
        tabuleiro[pos_player] = 0;
        pos_player=0;
        pos_bot = 19;
    }
  //caso o bot ultrapasse o limite de casas
  if (pos_bot < 0) pos_bot = 0;
    
    if (tabuleiro[pos_bot] == 0 && dado_bot != 0) {
      tabuleiro[pos_bot] = 1; //atribui uma rachadura a ela
      dado_bot = parseInt(random(0, 5));
    } 
      else if (tabuleiro[pos_bot] == 1 && dado_bot != 0) {//se a casa estiver rachada
        tabuleiro[pos_bot] = 0; //restaura a casa
        pos_bot = 19; // volata para o inicio
        dado_bot = parseInt(random(0, 5)); // sorteia um novo valor
      } 
        else dado_bot = parseInt(random(0, 5)); // sorteia um novo valor
        parado = false;
        dado_player = parseInt(random(1, 5));
    
        if (pos_bot == 0) {// verifica se o bot ganhou/humano perdeu
          tela =2;
          pos_bot = 19;
          pos_player = 0;
          limparcasas();
        }    

  }  
}
  
  //verificações para iniciar o jogo novamente
  else if(tela==1)tela = 3
  
  else if(tela==2)tela = 3 
  
  else if(tela == 3)tela = 0;
}
