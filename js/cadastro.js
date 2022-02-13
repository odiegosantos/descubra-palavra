cadastrarPalavra = () => {
  let inPalavra = document.getElementById("inPalavra");
  let inDica = document.getElementById("inDica");

  let palavra = inPalavra.value;
  let dica = inDica.value;

  if (palavra == "" || dica == "" || palavra.indexOf(" ") >= 0) {
    alert("Informe uma Palavra válida");
    inPalavra.focus();
    return;
  }

  if (localStorage.getItem("jogoPalavra")) {
    localStorage.setItem("jogoPalavra", localStorage.getItem("jogoPalavra") + ";" + palavra);
    localStorage.setItem("jogoDica", localStorage.getItem("jogoDica") + ";" + dica);
  } else {
    localStorage.setItem("jogoPalavra", palavra);
    localStorage.setItem("jogoDica", dica);
  }

  // if (localStorage.getItem("jogoPalavra")) {
  //   alert("Ok! Palavra " + palavra + " Cadastrada com sucesso");
  // }

  inPalavra.value = "";
  inDica.value = "";
  inPalavra.focus();

}
let btCadastrar = document.getElementById("btCadastrar");
btCadastrar.addEventListener("click", cadastrarPalavra);