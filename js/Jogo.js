let palavraSorteada;
let dicaSorteada;

var inLetra = document.getElementById("inLetra");
var btJogar = document.getElementById("btJogar");
var btVerDica = document.getElementById("btVerDica");

montarJogo = () => {
  var outPalavra = document.getElementById("outPalavra");
  var palavras = localStorage.getItem("jogoPalavra").split(";");
  var dicas = localStorage.getItem("jogoDica").split(";");

  var tam = palavras.length;
  var numAleatorio = Math.floor(Math.random() * tam);

  palavraSorteada = palavras[numAleatorio].toLocaleUpperCase();
  dicaSorteada = dicas[numAleatorio];
  var novaPalavra = "";
  for (var i = 0; i < palavraSorteada.length; i++) {
    if (palavraSorteada.charAt(0) == palavraSorteada.charAt(i)) {
      novaPalavra += palavraSorteada.charAt(0);
    } else {
      novaPalavra += "_";
    }
  }

  outPalavra.textContent = novaPalavra;
}
if (localStorage.getItem("jogoPalavra")) {
  montarJogo();
} else {
  alert("Cadastre Palavras para Jogar");
  inLetra.disabled = true;
  btJogar.disabled = true;
  btVerDica.disabled = true;
}

mostrarDica = () => {
  var outErros = document.getElementById("outErros");
  var outDica = document.getElementById("outDica");
  var outChances = document.getElementById("outChances");
  var erros = outErros.textContent;
  if (erros.indexOf("*") >= 0) {
    alert("Você já solicitou a Dica!");
    inLetra.focus();
    return;
  }
  outDica.textContent = ` ${dicaSorteada}`;
  outErros.textContent = erros + "*";
  var chances = Number(outChances.textContent) - 1;
  outChances.textContent = chances;

  trocarStatus(chances);
  verificarFim();
  inLetra.focus();
}
btVerDica.addEventListener("click", mostrarDica);

trocarStatus = (num) => {
  if (num > 0) {
    var imgStatus = document.getElementById("imgStatus");
    imgStatus.src = `img/status${num}.png`;e
  } else {
    var imgStatus = document.getElementById("imgStatus");
    imgStatus.src = "img/status4.png";
  }
}
jogarLetra = () => {
  var outPalavra = document.getElementById("outPalavra");
  var outErros = document.getElementById("outErros");
  var outChances = document.getElementById("outChances");
  var letra = inLetra.value.toUpperCase();

  if (letra == "" || letra.length != 1) {
    alert("Informe uma letra");
    inLetra.focus();
    return;
  }

  var erros = outErros.textContent;
  var palavra = outPalavra.textContent;

  if (erros.indexOf(letra) >= 0 || palavra.indexOf(letra) >= 0) {
    alert("Você já apostou esta letra");
    inLetra.focus();
    return;
  }
  if (palavraSorteada.indexOf(letra) >= 0) {
    var novaPalavra = "";
    for (var i = 0; i < palavraSorteada.length; i++) {
      if (palavraSorteada.charAt(i) == letra) {
        novaPalavra += letra;
      } else {
        novaPalavra += palavra.charAt(i);
      }
    }
    outPalavra.textContent = novaPalavra;
  } else {
    erros += letra;
    outErros.textContent = erros;
    var chances = Number(outChances.textContent) - 1;
    outChances.textContent = chances;

    trocarStatus(chances);
  }
  verificarFim();

  inLetra.value = "";
  inLetra.focus();
}
btJogar.addEventListener("click", jogarLetra);

//
inLetra.addEventListener("keypress", function (tecla) {
  if (tecla.keyCode == 13) {
    jogarLetra();
  }
});
//

inLetra.addEventListener("keypress", function (event) {
  if (event.key === 'Enter') {
    jogarLetra();
  }
});

verificarFim = () => {
  var outChances = document.getElementById("outChances");
  var outMensagmFinal = document.getElementById("outMensagemFinal");

  var chances = Number(outChances.textContent);

  if (chances == 0) {
    outMensagmFinal.className = "you-lose";
    outMensagmFinal.textContent = `Suas Chances Terminaram,
    A Palavra é "${palavraSorteada}!"`;
    concluirJogo();
  } else if (outPalavra.textContent == palavraSorteada) {
    outMensagmFinal.className = "you-win";
    outMensagmFinal.textContent = `Parabéns!! Você Ganhou.`;
    concluirJogo();
  }
}

concluirJogo = () => {
  var outDica = document.getElementById("outDica");
  outDica.textContent = "* Clique no botão 'iniciar jogo' para jogar novamente";
  inLetra.disabled = true;
  btJogar.disabled = true;
  btVerDica.disabled = true;
}