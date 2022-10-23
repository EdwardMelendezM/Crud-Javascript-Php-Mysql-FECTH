
    var url="http://localhost/Crud-Empleados/";
    var modal=new bootstrap.Modal(document.getElementById("modalId"),{KeyboardEvent:false})

    var aplicacion=new function(){
        this.idEditar=document.getElementById("idEditar");
        this.nombreEditar=document.getElementById("nombreEditar");
        this.correoEditar=document.getElementById("correoEditar");

        this.nombre=document.getElementById("nombre");
        this.correo=document.getElementById("correo");

        this.empleados=document.getElementById("empleados");
        this.Leer=function(){
            var datos="";

            // Fech para leer los datos de la base de datos y obtenerlos
            fetch (url)
            .then(r=>r.json())
            .then((respuesta)=>{

                respuesta.map(
                    function (empleado,index,array){
                        datos+="<tr>";
                        datos+="<td>"+empleado.id+"</td>";
                        datos+="<td>"+empleado.nombre+"</td>";
                        datos+="<td>"+empleado.correo+"</td>";
                        datos+='<td><div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-info" onclick="aplicacion.Editar('+empleado.id+')">Editar</button><button type="button" class="btn btn-danger" onclick="aplicacion.Borrar('+empleado.id+')" >Borrar</button></div></td>';
                        datos+="</tr>";
                    }
                )
                return this.empleados.innerHTML=datos;
            })
            .catch(e=>{
                console.log(e);
            })

        };
        // Funcion agregar a la base de datos
        this.Agregar=function(){

            // Esta variable sera enviada
            var datosEnviar={nombre:this.nombre.value,correo:this.correo.value}

            //Por fecth, insetamos el metodo post y convertimos nuestra variable
            fetch(url+"?insertar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.Leer();
            })
            .catch(console.log)
        }

        // Funcion para borrar registros
        this.Borrar=function(id){

            fetch(url+"?borrar="+id)
            .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                this.Leer();
            })
            .catch(console.log)
        }

        // Funcion para editar y recuperar los datos del php 
        this.Editar=function(id){

            fetch(url+"?consultar="+id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.nombreEditar.value=datosRespuesta[0]['nombre'];
                this.idEditar.value=datosRespuesta[0]['id'];
                this.correoEditar.value=datosRespuesta[0]['correo'];

            })
            .catch(console.log)

            modal.show();
        }
        //Funcion para actualizar registros, creamos una variable que sera enviada, y luego
        //Recibimos los datos de respuesta para leerlos
        this.Actualizar=function(){
            var datosEnviar={id:this.idEditar.value,nombre:this.nombreEditar.value,correo:this.correoEditar.value}
            fetch(url+"?actualizar=1",{method:"POST",body:JSON.stringify(datosEnviar)})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log("Datos actualizados")
                this.Leer();
                modal.hide();
                })
            .catch(console.log)
        }
    }

    // Esto es para que se vean los registros de la base de datos
    aplicacion.Leer();
