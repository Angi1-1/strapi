<?php
    //Crear las tablas de usuario, pedidos,producto, admin, provedor, mi wishlist

    //Establecer las conexiones
    include 'baseConexion.php';
    $conexion = getConexion();

    //Crear la tabla de usuario 
    $usuario = 'CREATE TABLE IF NOT EXISTS usuarioManos (
        id_usuario int AUTO_INCREMENT PRIMARY KEY, 
        nombreApellido VARCHAR(50), 
        email VARCHAR(50),
        telefono VARCHAR(50), 
        fecha_nac DATE NOT NULL, 
        contraseña VARCHAR(50),
        domicilio VARCHAR(50)
    )';
    
mysqli_query($conexion, $usuario) or die("Error al crear la tabla: " . mysqli_error($conexion));

// Función para verificar si un usuario ya existe
function usuario_existe($conexion, $email, $telefono) {
    $query = "SELECT * FROM usuarioManos WHERE email = '$email' OR telefono = '$telefono'";
    $result = mysqli_query($conexion, $query);
    return mysqli_num_rows($result) > 0;
}

// Datos de los usuarios a insertar
$usuarios = [
    ['nombreApellido' => 'Ana Pérez', 'email' => 'juan.perez@example.com', 'telefono' => '1234567890', 'fecha_nac' => '1985-06-15', 'contraseña' => 'password123', 'domicilio' => 'Calle Falsa 123'],
    ['nombreApellido' => 'María López', 'email' => 'maria.lopez@example.com', 'telefono' => '0987654321', 'fecha_nac' => '1990-08-25', 'contraseña' => 'mypassword456', 'domicilio' => 'Avenida Siempre Viva 456']
];

// Insertar usuarios si no existen
foreach ($usuarios as $usuario) {
    if (!usuario_existe($conexion, $usuario['email'], $usuario['telefono'])) {
        $query = "INSERT INTO usuarioManos (nombreApellido, email, telefono, fecha_nac, contraseña, domicilio) VALUES (
            '{$usuario['nombreApellido']}', '{$usuario['email']}', '{$usuario['telefono']}', '{$usuario['fecha_nac']}', '{$usuario['contraseña']}', '{$usuario['domicilio']}'
        )";
        mysqli_query($conexion, $query) or die("Error al insertar usuario: " . mysqli_error($conexion));
    } else {
        echo "El usuario con email {$usuario['email']} o teléfono {$usuario['telefono']} ya existe.<br>";
    }
}

    // //Crear la tabla de admin/artesanos
    // $adminP = 'CREATE TABLE IF NOT EXISTS adminP (
    //     id_admin int AUTO_INCREMENT PRIMARY KEY, 
    //     nombre VARCHAR(50), 
    //     contraseña VARCHAR(50),
    //     telefono VARCHAR(50), 
    //     email VARCHAR(50), 
    //     imagen VARCHAR(50),
    //     descripcion VARCHAR(500)
    // )';
    // mysqli_query($conexion, $adminP) or die("Error al crear la tabla adminP: " . mysqli_error($conexion));
     //Crear la tabla de productos    
    //  $producto = 'CREATE TABLE IF NOT EXISTS producto (
    //     id_producto int AUTO_INCREMENT PRIMARY KEY, 
    //     id_admin int,
    //     nombre varchar(50),
    //     precio int,
    //     imagen varchar(50), 
    //     descripcion VARCHAR(500),
    //     talla VARCHAR(500), 
    //     stock int, 
    //     opcion_entrega TINYINT(1) NOT NULL, 
    //     FOREIGN KEY (id_admin) REFERENCES adminP(id_admin)
    // )';
    // mysqli_query($conexion, $producto) or die("Error al crear la tabla producto: " . mysqli_error($conexion));
     
    // //Crear la tabla de wishlist
    // $wishlist ='CREATE TABLE IF NOT EXISTS wishlist (
    //     id_wishlist int AUTO_INCREMENT PRIMARY KEY, 
    //     id_usuario int,
    //     id_producto int,
    //     FOREIGN KEY (id_producto) REFERENCES producto(id_producto),
    //     FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    // )';
    // mysqli_query($conexion, $wishlist) or die("Error al crear la tabla" . mysqli_error($conexion));
    

    // //Crear la tabla de pedidos
    // $pedidos = 'CREATE TABLE IF NOT EXISTS pedido (
    //     id_pedido int AUTO_INCREMENT PRIMARY KEY, 
    //     id_usuario int,
    //     id_admin int,
    //     gastos int, 
    //     tick_Compra VARCHAR(50),
    //     estado TINYINT(1) NOT NULL, 
    //     fecha_compra DATE NOT NULL,
    //     FOREIGN KEY (id_admin) REFERENCES adminP(id_admin),
    //     FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
    // )';
    // mysqli_query($conexion, $pedidos) or die("Error al crear la tabla" . mysqli_error($conexion));
    
    
// ?>