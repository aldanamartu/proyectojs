let mainForm = document.getElementById('mainForm')
let result = document.getElementById('result')


mainForm.addEventListener('submit', validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
 
    
    if(nombre.length < 3){
        result.innerText = 'Nombre de usuario debe ser mayor a 3 caracteres'
    }else{
        result.innerText = 'Los datos fueron enviados existosamente!!'
    }

}


