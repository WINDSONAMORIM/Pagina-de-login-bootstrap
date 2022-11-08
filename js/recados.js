let linha, coluna1, coluna2, coluna3, id;
let imgEditar, imgExcluir;

let tabelaRecado = document.getElementById('tabelaLista');
let bodyRecado = document.getElementById('tbodyRecados');

const logado = document.getElementById('user');
const off = document.getElementById('off');

const btnInserir = document.getElementById('btnInserir'); 

const userLogado = JSON.parse(sessionStorage.getItem('chave'));
logado.innerText = userLogado.email;

off.addEventListener('click', deslogar);

btnInserir.addEventListener('click', (e) =>{
    e.preventDefault(); 
    if(btnInserir.value == 'Inserir'){
        btnInserir.onclick = inserir();
    }else{
        btnInserir.onclick = atualizar();
    }
})

const atualizaRecado = (recado) => localStorage.setItem('recado', JSON.stringify(recado));
const recuperaRecado = () => JSON.parse(localStorage.getItem('recado') || '[]');

preencher();

function preencher(){
    let recados = recuperaRecado();

    const recado = recados.filter((recado) =>{
        return recado.email == userLogado.email  
    })
    bodyRecado.innerHTML = "" 
    recado.forEach((element) => {
        criarPlanilha()

        linha.setAttribute('id',element.id)
        coluna1.innerHTML = element.motivo;
        coluna2.innerHTML = element.descricao;
        coluna3.appendChild(imgEditar);
        coluna3.appendChild(imgExcluir); 
        
        imgEditar.addEventListener('click',(e) =>{
            const rowId = e.target.parentNode.parentNode.id;
            editar(rowId)     
        })

        imgExcluir.addEventListener('click',(e)=>{
            const linha = e.target.parentNode.parentNode;
            recados = recados.filter(dado => dado.id != linha.id)
            atualizaRecado(recados);
            linha.remove();
        })
    });
}

function inserir(){
    const motivo = document.getElementById('inputMotivo').value;
    const descricao = document.getElementById('inputDescricao').value;

    if(validaCampos(motivo, descricao)){          
        const recados =  recuperaRecado();

        recados.push({
            id: recados.length +1,
            email: userLogado.email,   
            motivo: document.getElementById('inputMotivo').value,     
            descricao: document.getElementById('inputDescricao').value
        })

        atualizaRecado(recados);
        document.getElementById('inputMotivo').value = "";
        document.getElementById('inputDescricao').value = ""; 
        preencher();
    }        
}

function editar(rowId){

    btnInserir.setAttribute('value',"atualizar")
    //recupera a linha selecionada
    const data = document.getElementById(rowId).querySelectorAll(".row-data"); 
    //recupera o valor da planilha e coloca nos inputs
    console.log(data[0])
    document.getElementById('inputMotivo').value = data[0].innerText;
    document.getElementById('inputDescricao').value = data[1].innerText; 
    id = rowId;    
}

function atualizar(){
    const motivo = document.getElementById('inputMotivo').value;
    const descricao = document.getElementById('inputDescricao').value; 

    if(validaCampos(motivo, descricao)){  
        let recados = recuperaRecado();
        const recado = recados.find(dado => dado.id == id);

        recado.motivo = motivo;
        recado.descricao = descricao;
        atualizaRecado(recados)
        location.reload()
        console.log(id)
        console.log(recados[id-1] )
        console.log(recados)
    }
}

function criarPlanilha(){
    linha = document.createElement('tr');
    coluna1 = document.createElement('td');
    coluna2 = document.createElement('td');
    coluna3 = document.createElement('td');

    coluna1.setAttribute('class','row-data');
    coluna2.setAttribute('class','row-data');
    coluna3.setAttribute('class','row-data');

    linha.appendChild(coluna1);
    linha.appendChild(coluna2);
    linha.appendChild(coluna3);

    bodyRecado.appendChild(linha);

    imgEditar = document.createElement('img');
    imgEditar.setAttribute('src',"./assets/imagens/editar.png");

    imgExcluir = document.createElement('img');
    imgExcluir.setAttribute('src','./assets/imagens/delete.png');

    imgEditar.setAttribute('class','p-3');
    imgExcluir.setAttribute('class','p-3');
}

function validaCampos(motivo, descricao){
    if(!motivo || !descricao){
        alert('preencha os dados')
        return
    }else{
        return true
    }
} 

function deslogar(){
    open('index.html',target='_parent')
    sessionStorage.clear();
}