//funciones propias de la app
async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);
    console.log(await request.text());
    if(request.ok){        
        location.href= "dashboard.html";
    }
}

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users",settings)
    .then(response => response.json())
    .then(function(data){
        
        //if(data.lenght>0){
            var usuarios = '';
            for(const usuario of data){
                console.log(usuario.email)
                usuarios += '<tr>'+
                '<th scope="row">'+usuario.id+'</th>'+
                '<td>'+usuario.firstName+'</td>'+
                '<td>'+usuario.lastName+'</td>'+
                '<td>'+usuario.email+'</td>'+
                '<td>'+
                  '<button type="button" class="btn btn-outline-danger" onclick="eliminaUsuario(\''+usuario.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                  '<a href="#" onclick="verModificarUsuario(\''+usuario.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                  '<a href="visualizar.html" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = usuarios;
        //}
    })
}



async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}

function eliminaUsuario(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
    })
}

function verModificarUsuario(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
            var cadena='';
            if(usuario){                
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>'+
                '</div>'+
              
              '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+usuario.id+'">'+
                '<label for="firstName" class="form-label">First Name</label>'+
                '<input type="text" class="form-control" name="firstName" id="firstName" required value="'+usuario.firstName+'"> <br>'+
                '<label for="lastName"  class="form-label">Last Name</label>'+
                '<input type="text" class="form-control" name="lastName" id="lastName" required value="'+usuario.lastName+'"> <br>'+
                '<label for="email" class="form-label">Email</label>'+
                '<input type="email" class="form-control" name="email" id="email" required value="'+usuario.email+'"> <br>'+
                '<label for="password" class="form-label">Password</label>'+
                '<input type="password" class="form-control" id="password" name="password" required> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarUsuario(\''+usuario.id+'\')">Modificar</button>'+
            '</form>';
            }
            document.getElementById("datos").innerHTML = cadena;
    })
}

async function modificarUsuario(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/users/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    document.getElementById("datos").innerHTML = '';
    //console.log(request.text())
}