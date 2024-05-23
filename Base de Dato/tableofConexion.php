<?php
// Crear las tablas de usuario, pedidos, producto, admin, proveedor, mi wishlist

// Establecer las conexiones
include 'baseConexion.php';
$conexion = getConexion();

// Crear la tabla de usuario 
$usuario = 'CREATE TABLE `usuarioManos` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre_apellido` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `telefono` varchar(255) DEFAULT NULL,
    `fecha_nac` date DEFAULT NULL,
    `domicilio` longtext DEFAULT NULL,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `published_at` datetime(6) DEFAULT NULL,
    `created_by_id` int(10) UNSIGNED DEFAULT NULL,
    `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
    `password_user` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
)';

mysqli_query($conexion, $usuario) or die("Error al crear la tabla: " . mysqli_error($conexion));

// Función para verificar si un usuario ya existe
function usuario_existe($conexion, $email, $telefono) {
    $query = "SELECT * FROM usuarioManos WHERE email = ? OR telefono = ?";
    $stmt = mysqli_prepare($conexion, $query);
    mysqli_stmt_bind_param($stmt, 'ss', $email, $telefono);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    return mysqli_num_rows($result) > 0;
}

// Datos de los usuarios a insertar
$usuarios = array(
    array(
        'nombre_apellido' => 'Admin',
        'email' => 'manoscreadoras@gmail.com',
        'telefono' => '000000000',
        'fecha_nac' => '2024-05-07',
        'domicilio' => 'SDSDSD',
        'created_at' => '2024-05-21 16:57:43.537000',
        'updated_at' => '2024-05-21 16:57:46.123000',
        'published_at' => '2024-05-21 16:57:46.120000',
        'created_by_id' => '1',
        'updated_by_id' => '1',
        'password_user' => '$2a$10$qe5Fy574srAkUiKBETLYs.C0Nv3AZ5ff4GOAmYG4P2dPf3nBVxyZO'
    ),
    array(
        'nombre_apellido' => 'Amelia',
        'email' => 'amelia@gmail.com',
        'telefono' => '604200000',
        'fecha_nac' => '2024-05-20',
        'domicilio' => 'calle tajo 2',
        'created_at' => NULL,
        'updated_at' => NULL,
        'published_at' => NULL,
        'created_by_id' => NULL,
        'updated_by_id' => NULL,
        'password_user' => '1234'
    ),
    array(
        'nombre_apellido' => 'Madrid Arte',
        'email' => 'madrid@gmail.com',
        'telefono' => '900000000',
        'fecha_nac' => '2024-05-20',
        'domicilio' => 'calle tajo 3',
        'created_at' => NULL,
        'updated_at' => NULL,
        'published_at' => NULL,
        'created_by_id' => NULL,
        'updated_by_id' => NULL,
        'password_user' => '1234'
    )
);
// Insertar usuarios si no existen
foreach ($usuarios as $usuario) {
    if (!usuario_existe($conexion, $usuario['email'], $usuario['telefono'])) {
        $query = "INSERT INTO usuarioManos (nombre_apellido, email, telefono, fecha_nac, password_user, domicilio) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conexion, $query);
        mysqli_stmt_bind_param($stmt, 'ssssss', 
            $usuario['nombre_apellido'], 
            $usuario['email'], 
            $usuario['telefono'], 
            $usuario['fecha_nac'], 
            $usuario['password_user'], 
            $usuario['domicilio']
        );
        mysqli_stmt_execute($stmt) or die("Error al insertar usuario: " . mysqli_error($conexion));
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