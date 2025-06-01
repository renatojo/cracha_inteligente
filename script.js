document.getElementById("btnEnviarNomeSetor").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const sector = document.getElementById("sector").value;

    const definirNome = document.getElementById("divName").innerHTML = `<h2 class="name">${name}</h2>`
    const definirSector = document.getElementById("divSector").innerHTML = `<h3 class="sector">${sector}</h3>`

    document.getElementById("btnEnviarNomeSetor").remove();
})