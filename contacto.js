document.addEventListener('DOMContentLoaded', function(){

    const email ={
        email:'',
        nombre:'',
        mensaje:'',


    }

    const dataEmail = document.querySelector('#emails');
    const dataNombre = document.querySelector('#nombre');
    const dataMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('.correo button[type="submit"]');
    const btnReset = document.querySelector('.correo button[type="reset"]');
    const exito = document.querySelector('#alerta');
   

    
    
    //**EventListeners*/
    
    dataEmail.addEventListener('input', validar);
    dataNombre.addEventListener('input', validar);
    dataMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e){
e.preventDefault();
        resetearFormulario();
      


    });

    function enviarEmail(e){
        e.preventDefault();

    
        const alertaExito = document.createElement('div');
        alertaExito.classList.add('exito');
        alertaExito.textContent='¡Mensaje enviado!';

        exito.appendChild(alertaExito);

      

         setTimeout(()=>{

            alertaExito.remove();
            resetearFormulario();
         },3000)

      

    }


    

    function validar(e){
    
        if( e.target.value.trim() === ''){
          mostrarAlerta(`El campo ${e.target.name} debe ser diligenciado`, e.target.parentElement);
          email[e.target.name] = '';
          comprobarEmail();
          return;
        }

        if(e.target.name === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        /*Asignar valores*/

        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email);

        comprobarEmail();
       
    }  
    
    
    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);

        const error = document.createElement('p');
        error.textContent =mensaje;
        error.classList.add('error');

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){

        const alerta = referencia.querySelector('.error');
        if(alerta){
            alerta.remove();
        };

    }


    function validarEmail(email){

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }


    function comprobarEmail(){

        if(Object.values(email).includes('')){
            btnSubmit.classList.add('enviar');
            btnSubmit.disabled = true;

    }

    else{
        btnSubmit.classList.remove('enviar');
        btnSubmit.disabled = false;
    }

    }

    function resetearFormulario(){


        email.email = '';
        email.nombre = '';
        email.mensaje = '';
    
        formulario.reset();
        comprobarEmail();
    }
    

})






