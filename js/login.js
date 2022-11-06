const formLogar = document.querySelector('#formLogin');
const formCadastrar = document.querySelector('#formCadastro');

const btnCadastrar = document.getElementById('btnCadastrar');
const btnLogar = document.getElementById('btnLogar');


const atualizaUsuario = (ususario) => localStorage.setItem('usuario', JSON.stringify(ususario));

const recuperaUsuario = () => JSON.parse(localStorage.getItem('usuario') || '[]');
const usuarios = recuperaUsuario(); 

//const email = document.getElementById('emailCadastro')
//email.onblur = emailCadastrado; 

function emailCadastrado(){
    const usuarioCadastrado = usuarios.some((dado)=>{
        return dado.email === email.value
    })

    if(usuarioCadastrado){        
        formLogar.style.left = "25px"
        formCadastrar.style.left = "450px"
        navScroll.style.left = "0px"

        formLogar.emailLogin.value = email.value;
        alert("E-mail Cadastrado")
    }    
}

function salvarUsuario(e){
    e.preventDefault();
    const email = formCadastrar.emailCadastro.value;
    const senha = formCadastrar.senhaCadastro.value;
    const confSenha = formCadastrar.confirmaSenhaCadastro.value;

    if(senha != confSenha){
        alert('Senhas Diferentes')
        return
    }        

    usuarios.push({
        id: usuarios.length +1,
        email,
        senha
    });

    atualizaUsuario(usuarios);
/*
    formCadastrar.reset();
    
    formLogar.style.left = "25px"
    formCadastrar.style.left = "450px"
    navScroll.style.left = "0px"

    formLogar.emailLogin.value = email;*/
}

function logarUsuario(e){
    e.preventDefault();
    
    const users = recuperaUsuario();
    const existeValor = users.find((user) =>{

        return user.email == formLogar.emailLogin.value && user.senha == formLogar.senhaLogin.value  
    })

    if (existeValor){
        open('recados.html',target='_parent')
        const dados = JSON.stringify(existeValor);
        sessionStorage.setItem('chave', dados );
    }else{
        alert("Dados incorretos")
    }    
}

btnCadastrar.onclick = salvarUsuario;
btnLogar.onclick = logarUsuario;