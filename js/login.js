const formLogar = document.querySelector('#formLogin');
const formCadastrar = document.querySelector('#formCadastro');

//const btnCadastrar = document.getElementById('btnCadastrar');
//const btnLogar = document.getElementById('btnLogar');


const atualizaUsuario = (ususario) => localStorage.setItem('usuario', JSON.stringify(ususario));

const recuperaUsuario = () => JSON.parse(localStorage.getItem('usuario') || '[]');
const usuarios = recuperaUsuario(); 

function salvarUsuario(e){
    e.preventDefault();
    const email = formCadastrar.emailCadastro.value;
    const senha = formCadastrar.senhaCadastro.value;
    const confSenha = formCadastrar.confirmaSenhaCadastro.value;

    if(senha != confSenha){
        alert('Senhas Diferentes')
        return
    } 

    const usuarioCadastrado = usuarios.some((dado)=>{
        return dado.email === formCadastrar.emailCadastro.value
    })

    if(usuarioCadastrado){        
        formLogar.emailLogin.value = formCadastrar.emailCadastro.value;
        alert("E-mail Cadastrado")
        return
    } 

    usuarios.push({
        id: usuarios.length +1,
        email,
        senha
    });

    atualizaUsuario(usuarios);

    formCadastrar.reset();

    formLogar.emailLogin.value = email;
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
//validação campos obrigatórios
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
          }else{          
          console.log('deubom')
          salvarUsuario(event);
          }
        }, false);
      });
    }, false);
  })();

  formLogar.addEventListener('submit',logarUsuario)

const myCarousel = document.querySelector('#carouselExampleControls')
const carousel = new bootstrap.Carousel(myCarousel, {
  interval: 9000
  
})