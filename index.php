<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST"); //Es para recepcionar los metodos post, get
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers:Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//Conectar la base de datos con usuario y contraseña y nombre de la BD
$servidor="localhost";
$usuario="root";
$contrasenia="";
$nombreBaseDatos="empleados";

//Conexion con mysqli 
$conexionBD= new mysqli($servidor,$usuario,$contrasenia,$nombreBaseDatos);

//Isset (si esta vacio me retorna FALSE) (Verifica si su valor no esta declarado o es null)
//Consulta de datos, recepciona una clave para consultar dichos datos con dicha clave
if(isset($_GET["consultar"])){
    $sqlEmpleados=mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["consultar"]);

    if(mysqli_num_rows($sqlEmpleados)>0){
        $empleados=mysqli_fetch_all($sqlEmpleados,MYSQLI_ASSOC);
        echo json_encode($empleados);
        exit();
    }
    else{
        echo json_encode(["sucess"=>0]); }
}


// BORRAR
// borrar pero se le bede enviar una clave (para borrado)

if(isset($_GET["borrar"])){
    $sqlEmpleados=mysqli_query($conexionBD,"DELETE FROM empleados WHERE id=".$_GET["borrar"]);
    if($sqlEmpleados){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{
        echo json_encode(["success"=>0]);
    }
}



// INSERTAR
//Inserta un nuevo regisitro y recepciona en metodo psot los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data=json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $correo=$data->correo;

    if(($correo!="") && ($nombre!="")){
        $sqlEmpleados=mysqli_query($conexionBD,"INSERT INTO empleados (nombre,correo) VALUES ('$nombre','$correo')");
        echo json_encode(["success"=>1]);
    }
}

// ACTUALIZAR
//Actualiza datos pero recepciona datos de nombre,correo y una clave para realizar la actualizacion
if(isset($_GET["actualizar"])){
    $data=json_decode(file_get_contents("php://input"));
    $id=(isset($data->id)?$data->id:$_GET["actualizar"]);
    $nombre=$data->nombre;
    $correo=$data->correo;

    $sqlEmpleados = mysqli_query($conexionBD,"UPDATE empleados SET nombre='$nombre',correo='$correo' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}


//Consulta todos los registro de la tabla empleados
$sqlEmpleados = mysqli_query($conexionBD,"SELECT * FROM empleados");
if(mysqli_num_rows($sqlEmpleados)>0){
    $empleados = mysqli_fetch_all($sqlEmpleados,MYSQLI_ASSOC);
    echo json_encode($empleados);

}
else{
    echo json_encode([["success"=>0]]);
}
?>