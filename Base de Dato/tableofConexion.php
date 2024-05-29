<?php
// Crear las tablas de usuario, pedidos, producto, admin, proveedor, mi wishlist

// Establecer las conexiones
include 'baseConexion.php';
$conexion = getConexion();
// Crear la tabla de usuario
$usuario = 'CREATE TABLE IF NOT EXISTS `usuarioManos` (
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
    `acesso` int(1) DEFAULT NULL,
    `descripcion` varchar(500) DEFAULT NULL,
    `logo` varchar(255) DEFAULT NULL,
    `imagen` varchar(255) DEFAULT NULL,
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
        'email' => 'admin@gmail.com',
        'telefono' => '000000000',
        'fecha_nac' => '2024-05-07',
        'domicilio' => 'SDSDSD',
        'created_at' => '2024-05-21 16:57:43.537000',
        'updated_at' => '2024-05-21 16:57:46.123000',
        'published_at' => '2024-05-21 16:57:46.120000',
        'created_by_id' => '1',
        'updated_by_id' => '1',
        'password_user' => '1234',
        'acesso' => 1, // Nivel de acceso
        'descripcion' => NULL, // Descripción
        'logo' => NULL, // Logo
        'imagen' => NULL // Imagen
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
        'password_user' => '1234',
        'acesso' => 3, // Nivel de acceso
        'descripcion' => NULL, // Descripción
        'logo' => NULL, // Logo
        'imagen' => NULL // Imagen
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
        'password_user' => '1234',
        'acesso' => 2, // Nivel de acceso
        'descripcion' => 'Madrid Arte, con su profunda apreciación por la artesanía tradicional, transforma el arte de la joyería en exquisitas obras de arte para el uso diario. Esta destacada empresa, especializada en la creación de pendientes de diseño, encapsula la riqueza histórica y cultural en cada pieza. Inspirada en técnicas ancestrales, IndSafe ofrece diseños que son tanto clásicos como innovadores, garantizando que cada par de pendientes no solo sea hermoso, sino también duradero y perfecto para complementar cualquier atuendo. Sus productos, ideales para los amantes de la joyería fina, prometen convertir cada uso en una experiencia sublime, permitiendo que cada usuario deje su huella en cada momento especial.', // Descripción
        'logo' => 'logo1.png', // Logo
        'imagen' => 'imagen1.png' // Imagen
    ),
    array(
        'nombre_apellido' => 'Azuzu',
        'email' => 'azuzu@gmail.com',
        'telefono' => '652031005',
        'fecha_nac' => '2024-05-20',
        'domicilio' => 'calle tajo 3',
        'created_at' => NULL,
        'updated_at' => NULL,
        'published_at' => NULL,
        'created_by_id' => NULL,
        'updated_by_id' => NULL,
        'password_user' => '1234',
        'acesso' => 2, // Nivel de acceso
        'descripcion' => 'Azuzu, con su visión vanguardista de la cerámica, redefine la estética moderna en cada una de sus creaciones. Esta innovadora empresa se dedica a la fabricación de cerámicas que no solo sirven como elementos decorativos, sino como verdaderas piezas de arte funcional. Con un enfoque en diseños contemporáneos y líneas limpias, Artetis combina la precisión técnica con una estética minimalista y elegante. Cada taza, plato y objeto cerámico es diseñado pensando en la funcionalidad sin sacrificar la belleza, haciendo de cada pieza una adición esencial y chic para cualquier hogar moderno.', // Descripción
        'logo' => 'logo2.png', // Logo
        'imagen' => 'imagen2.png' // Imagen
    ),
    array(
        'nombre_apellido' => 'CieloA',
        'email' => 'cieloA@gmail.com',
        'telefono' => '652031002',
        'fecha_nac' => '2024-05-20',
        'domicilio' => 'calle tajo 3',
        'created_at' => NULL,
        'updated_at' => NULL,
        'published_at' => NULL,
        'created_by_id' => NULL,
        'updated_by_id' => NULL,
        'password_user' => '1234',
        'acesso' => 2, // Nivel de acceso
        'descripcion' => 'CieloA, con su dedicación a la excelencia y un enfoque en la innovación, redefine la experiencia diaria con productos de vidrio de alta calidad. Esta empresa pionera, especializada en la fabricación de vasos y jarras de vidrio, infunde modernidad y estilo en cada creación. Al emplear técnicas de vanguardia junto con un respeto por la tradición artesanal, Cielo ofrece productos que no solo destacan por su belleza estética, sino también por su resistencia y funcionalidad. Diseñados para ser el centro de cualquier reunión, los productos de Cielo son perfectos para quienes aprecian los momentos de calidad, transformando cada bebida en una celebración del buen gusto y la innovación.', // Descripción
        'logo' => 'logo3.png', // Logo
        'imagen' => 'imagen3.png' // Imagen
    ),
);

// Insertar usuarios si no existen
foreach ($usuarios as $usuario) {
    if (!usuario_existe($conexion, $usuario['email'], $usuario['telefono'])) {
        $hashed_password = password_hash($usuario['password_user'], PASSWORD_BCRYPT);
        $query = "INSERT INTO usuarioManos (nombre_apellido, email, telefono, fecha_nac, password_user, domicilio, acesso, descripcion, logo, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conexion, $query);
        mysqli_stmt_bind_param($stmt, 'ssssssisss', 
            $usuario['nombre_apellido'], 
            $usuario['email'], 
            $usuario['telefono'], 
            $usuario['fecha_nac'], 
            $hashed_password, 
            $usuario['domicilio'],
            $usuario['acesso'], // Nivel de acceso
            $usuario['descripcion'], // Descripción
            $usuario['logo'], // Logo
            $usuario['imagen'] // Imagen
        );
        if (mysqli_stmt_execute($stmt)) {
            echo "Usuario {$usuario['nombre_apellido']} insertado correctamente.<br>";
        } else {
            echo "Error al insertar usuario {$usuario['nombre_apellido']}: " . mysqli_error($conexion) . "<br>";
        }
    } else {
        echo "El usuario con email {$usuario['email']} o teléfono {$usuario['telefono']} ya existe.<br>";
    }
}
// Crear la tabla de productos
$crearTablaProductos = 'CREATE TABLE IF NOT EXISTS productos (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) DEFAULT NULL,
    nombre_artesano VARCHAR(255) DEFAULT NULL,
    id_artesano INT(11) DEFAULT NULL,
    subtitulo VARCHAR(255) DEFAULT NULL,
    precio DECIMAL(10,2) DEFAULT NULL,
    detalles LONGTEXT DEFAULT NULL,
    tallas LONGTEXT DEFAULT NULL,
    ruta VARCHAR(255) DEFAULT NULL,
    stock INT DEFAULT NULL,
    created_at DATETIME(6) DEFAULT NULL,
    updated_at DATETIME(6) DEFAULT NULL,
    published_at DATETIME(6) DEFAULT NULL,
    created_by_id INT(10) UNSIGNED DEFAULT NULL,
    updated_by_id INT(10) UNSIGNED DEFAULT NULL,
    tipo INT(11) DEFAULT NULL,
    UNIQUE KEY unique_product (nombre, ruta)
)';

mysqli_query($conexion, $crearTablaProductos) or die("Error al crear la tabla productos: " . mysqli_error($conexion));

// Datos a insertar
$productos = [
    ['Collar De Perla', 'Madrid Arte', 3, 'Perla natural', 500.00, '+ Material: Oro amarillo de 14 k\n+ Hecho en Estado Unidos\n+ Perla I peso total: 0.16', 'Talla único', '1.png', 20, '2024-05-25 13:53:39.642000', '2024-05-25 21:42:55.637000', '2024-05-25 13:55:52.573000', 1, 1, 1],
    ['Pendiente Rojo', NULL, NULL, 'Piedra roja', 30.00, '+ Material: Piedra Roja\n+ Hecho a mano\n+ Color: Rojo', 'Talla único', '2.png', 30, '2024-05-25 21:10:08.820000', '2024-05-25 21:43:12.014000', '2024-05-25 21:11:15.212000', 1, 1, 1],
    ['Pendiente Rojo', NULL, NULL, 'Madera Roja', 20.00, '+ Material: Madera Roja\n+ Hecho a mano\n+ Color: Rojo', 'Talla único', '3.png', 10, '2024-05-25 21:10:34.010000', '2024-05-25 21:43:32.698000', '2024-05-25 21:11:15.212000', 1, 1, 1],
['Collar Ball', NULL, NULL, 'Perla metálica', 70.00, '+ Material: Metal\n+ Hecho a mano\n+ Color: Plateado', 'Talla único', '4.png', 10, '2024-05-25 21:11:04.503000', '2024-05-25 21:42:48.074000', '2024-05-25 21:11:15.212000', 1, 1, 1],

['Collar Flores', NULL, NULL, 'Collar Hoja', 60.00, '+ Material: Metal y perlas\n+ Hecho a mano\n+ Diseño de hojas', 'Talla único', '5.png', 10, '2024-05-25 21:44:45.088000', '2024-05-25 21:44:45.088000', '2024-05-25 21:44:54.934000', 1, 1, 1],
['Collar De Perla', 'Madrid Arte', 3, 'Collar Anilla Dorada Con Perla', 120.00, '+ Material: Oro amarillo de 14 k\n+ Perla natural\n+ Diseño de anilla', 'Talla único', '6.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Collar Ball', NULL, NULL, 'Collar Anilla Dorada Con Perla', 60.00, '+ Material: Oro amarillo de 14 k\n+ Perla natural\n+ Diseño de anilla', 'Talla único', '7.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Collar Oro', NULL, NULL, 'Collar bañada de Oro 88k', 65.00, '+ Material: Oro de 88 k\n+ Hecho a mano\n+ Color: Dorado', 'Talla único', '8.png', 10, NULL, NULL, NULL, NULL, NULL, 1],

['Pendiente Perla','Madrid Arte', 3, 'Pendiente de Perlas Naturales', 55.00, '+ Material: Perlas naturales\n+ Hecho a mano\n+ Color: Blanco', 'Talla único', '9.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Perla', 'Madrid Arte', 3, 'Pendiente de Perlas Naturales', 60.00, '+ Material: Perlas naturales\n+ Hecho a mano\n+ Color: Blanco', 'Talla único', '10.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Piedra Roja', NULL, NULL, 'Pendiente de Madera Rojo', 30.00, '+ Material: Madera Roja\n+ Hecho a mano\n+ Color: Rojo', 'Talla único', '11.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Jaspe', NULL, NULL, 'Pendiente hecha con la piedra Jaspe', 30.00, '+ Material: Piedra Jaspe\n+ Hecho a mano\n+ Color: Rojo', 'Talla único', '12.png', 10, NULL, NULL, NULL, NULL, NULL, 1],

['Pulsera Dorada', NULL, NULL, 'Pulsera Aros Doradas', 50.00, '+ Material: Metal dorado\n+ Hecho a mano\n+ Diseño de aros', 'Talla único', '13.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pulsera Plata', NULL, NULL, 'Pulsera plateada con cristal', 60.00, '+ Material: Plata y cristal\n+ Hecho a mano\n+ Color: Plateado', 'Talla único', '14.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Elefante', NULL, NULL, 'Elefante plateada Diseño Unico', 30.00, '+ Material: Metal plateado\n+ Hecho a mano\n+ Diseño de elefante', 'Talla único', '15.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Perla', NULL, NULL, 'Perla Natural con hoja rosa', 50.00, '+ Material: Perla natural y metal\n+ Hecho a mano\n+ Diseño de hoja', 'Talla único', '16.png', 10, NULL, NULL, NULL, NULL, NULL, 1],

['Pendiente Plateada', NULL, NULL, 'Pendiente de Perla bañado con Oro', 30.00, '+ Material: Oro amarillo de 14 k\n+ Hecho a mano\n+ Color: Dorado', 'Talla único', '17.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Perla', 'Madrid Arte', 3, 'Pulsera plateada', 60.00, '+ Material: Plata \n+ Hecho a mano\n+ Color: Plateado', 'Talla único', '18.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Perla', 'Madrid Arte', 3,'Perdiente Perla natural Diseño Unico', 30.00, '+ Material: Metal plateado y perla \n+ Hecho a mano\n+ Diseño Unico', 'Talla único', '19.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Oro', NULL, NULL, 'Perla Oro', 30.00, '+ Material: Metal\n+ Hecho a mano\n+ Diseño de hoja', 'Talla único', '20.png', 10, NULL, NULL, NULL, NULL, NULL, 1],

['Pendiente Oro Ball', NULL, NULL, 'Pendiente ball bañado con Oro', 30.00, '+ Material: Oro amarillo de 14 k\n+ Hecho a mano\n+ Diseño de bola', 'Talla único', '21.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pendiente Elefante', NULL, NULL, 'Elefante dorada Diseño Unico', 60.00, '+ Material: Metal dorado\n+ Hecho a mano\n+ Diseño de elefante', 'Talla único', '22.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pulsera Plateada', NULL, NULL, 'Pulsera plateada con Arbol de la madre', 50.00, '+ Material: Metal plateado\n+ Hecho a mano\n+ Diseño de árbol', 'Talla único', '23.png', 10, NULL, NULL, NULL, NULL, NULL, 1],
['Pulsera Plateada', NULL, NULL, 'Pulsera plateada Corazón', 50.00, '+ Material: Metal plateado\n+ Hecho a mano\n+ Diseño de corazón', 'Talla único', '24.png', 10, NULL, NULL, NULL, NULL, NULL, 1],

    ['Taza Azul', 'Azuzu', 4, 'Taza Azul', 3.00, NULL, NULL, '25.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
    ['Plato Azul', 'Azuzu', 4, 'Plato Azul', 6.00, NULL, NULL, '26.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
    ['Taza Azul', 'Azuzu', 4, 'Taza Azul', 7.00, NULL, NULL, '27.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
    ['Taza Azul Raya', 'Azuzu', 4, 'Taza Azul Raya', 7.00, NULL, NULL, '28.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
    ['Tetera Azul', 'Azuzu', 4, 'Tetera Azul', 20.00, NULL, NULL, '29.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
['Plato Imaginario','CieloA',5 , 'Plato Imaginario', 5.00, NULL, NULL, '30.png', 10, NULL, NULL, NULL, NULL, NULL, 3],
['Taza Blanca', 'CieloA',5 ,'Taza Blanca', 20.00, NULL, NULL, '31.png', 10,NULL, NULL, NULL, NULL, NULL, 3],
['Taza Blanca', 'CieloA',5 , 'Taza Blanca', 10.00, NULL, NULL, '32.png', 10,NULL, NULL, NULL, NULL, NULL, 3],

['Plato Universo', NULL, NULL, 'Plato Universo', 5.00, NULL, NULL, '33.png', 10,NULL, NULL, NULL, NULL, NULL, 3],
['Plato Hehua', NULL, NULL, 'Plato Hehua', 5.00, NULL, NULL, '34.png', 10, NULL,NULL, NULL, NULL, NULL, 3],
['Plato Piedra', NULL, NULL, 'Plato Piedra', 3.00, NULL, NULL, '35.png', 10,NULL, NULL, NULL, NULL, NULL, 3],
['Plato Dorada', NULL, NULL, 'Plato Dorada', 6.00, NULL, NULL, '36.png', 10,NULL, NULL, NULL, NULL, NULL, 3],

['Plato Liso', NULL, NULL, 'Plato Liso', 3.00, NULL, NULL, '37.png', 10, NULL,NULL, NULL, NULL, NULL, 3],
['Plato Liso', NULL, NULL, 'Plato Liso', 3.00, NULL, NULL, '38.png', 10,NULL, NULL, NULL, NULL, NULL, 3],
['Plato Flor', NULL, NULL, 'Plato Flor', 5.00, NULL, NULL, '39.png', 10, NULL,NULL, NULL, NULL, NULL, 3],
['Plato Dorada', NULL, NULL, 'Plato Dorada', 6.00, NULL, NULL, '40.png', 10, NULL,NULL, NULL, NULL, NULL, 3],

//  comestico
['Serum Anticaida', NULL, NULL, 'Serum Anticaida', 16.00, NULL, NULL, '41.png', 10, NULL,NULL, NULL, NULL, NULL, 2],
['Crema Hidratante', NULL, NULL, 'Crema Hidratante', 50.00, NULL, NULL, '42.png', 10,NULL, NULL, NULL, NULL, NULL, 2],
['Limpiador Facial', NULL, NULL, 'Limpiador Facial', 35.00, NULL, NULL, '43.png', 10,NULL, NULL, NULL, NULL, NULL, 2],
['Serum para Acne', NULL, NULL, 'Serum para Acne', 25.00, NULL, NULL, '44.png', 10, NULL,NULL, NULL, NULL, NULL, 2],
['Crema Reparación', NULL, NULL, 'Crema Reparación', 50.00, NULL, NULL, '45.png', 10,NULL, NULL, NULL, NULL, NULL, 2],
['Limpiador Facial', NULL, NULL, 'Limpiador Facial', 40.00, NULL, NULL, '46.png', 10,NULL, NULL, NULL, NULL, NULL, 2],
['Crema de Mano', NULL, NULL, 'Crema de Mano', 20.00, NULL, NULL, '47.png', 10, NULL,NULL, NULL, NULL, NULL, 2],
['Crema Antiedad', NULL, NULL, 'Crema Antiedad', 60.00, NULL, NULL, '48.png', 10, NULL,NULL, NULL, NULL, NULL, 2],
['Serum D++', NULL, NULL, 'Serum D++', 80.00, NULL, NULL, '49.png', 10, NULL, NULL,NULL, NULL, NULL, 2],
['Serum VC', NULL, NULL, 'Serum VC', 60.00, NULL, NULL, '50.png', 10, NULL, NULL, NULL,NULL, NULL, 2],
['Champu Anticaida', NULL, NULL, 'Champu Anticaida', 16.00, NULL, NULL, '51.png', 10, NULL,NULL, NULL, NULL, NULL, 2],
['Set de Regalo', NULL, NULL, 'Set de Regalo', 50.00, NULL, NULL, '52.png', 10, NULL,NULL, NULL, NULL, NULL, 2]

];

foreach ($productos as $producto) {
    $nombre = $producto[0];
    $ruta = $producto[7];

    // Consulta de verificación
    $consultaVerificacion = "SELECT COUNT(*) AS total FROM productos WHERE nombre = ? AND ruta = ?";
    $stmt = $conexion->prepare($consultaVerificacion);
    $stmt->bind_param('ss', $nombre, $ruta);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row['total'] > 0) {
        echo "Error: El producto '$nombre' con la ruta '$ruta' ya existe.<br>";
    } else {
        // Inserción del producto
        $insertarProducto = "INSERT INTO productos (nombre, nombre_artesano, id_artesano, subtitulo, precio, detalles, tallas, ruta, stock, created_at, updated_at, published_at, created_by_id, updated_by_id, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conexion->prepare($insertarProducto);
        $stmt->bind_param('ssisssssissiiii', $producto[0], $producto[1], $producto[2], $producto[3], $producto[4], $producto[5], $producto[6], $producto[7], $producto[8], $producto[9], $producto[10], $producto[11], $producto[12], $producto[13], $producto[14]);

        if ($stmt->execute()) {
            echo "Producto '$nombre' insertado correctamente.<br>";
        } else {
            echo "Error al insertar el producto '$nombre': " . $stmt->error . "<br>";
        }
    }
}
// Crear la tabla `pedidos`
$pedidos = " CREATE TABLE IF NOT EXISTS `pedidos` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `fecha_pedidos` date DEFAULT NULL,
    `id_usuario` int(11) DEFAULT NULL,
    `id_artesano` int(11) DEFAULT NULL,
    `domicilio` longtext DEFAULT NULL,
    `gasto` int(11) DEFAULT NULL,
    `productos_comprados` longtext DEFAULT NULL,
    `forma_pago` int(11) DEFAULT NULL,
    `estado` tinyint(1) DEFAULT NULL,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `published_at` datetime(6) DEFAULT NULL,
    `created_by_id` int(10) UNSIGNED DEFAULT NULL,
    `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
    `fecha_envi` date DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  ";
  
  if (mysqli_query($conexion, $pedidos)) {
      echo "Tabla `pedidos` creada exitosamente.<br>";
  } else {
      echo "Error al crear la tabla: " . mysqli_error($conexion) . "<br>";
  }
  
  // Función para verificar si un pedido ya existe
  function pedido_existe($conexion, $fecha_pedidos, $id_usuario, $id_artesano) {
      $query = "SELECT * FROM pedidos WHERE fecha_pedidos = ? AND id_usuario = ? AND id_artesano = ?";
      $stmt = mysqli_prepare($conexion, $query);
      mysqli_stmt_bind_param($stmt, 'sii', $fecha_pedidos, $id_usuario, $id_artesano);
      mysqli_stmt_execute($stmt);
      $result = mysqli_stmt_get_result($stmt);
      return mysqli_num_rows($result) > 0;
  }
  
  // Datos de los pedidos a insertar
  $datosPedidos = array(
      array(
          'fecha_pedidos' => '2024-05-26',
          'id_usuario' => 2,
          'id_artesano' => 3,
          'domicilio' => 'Calle Tajo',
          'gasto' => 10,
          'productos_comprados' => 'Vaso Verde',
          'forma_pago' => 2,
          'estado' => 1,
          'created_at' => '2024-05-26 14:31:56.690000',
          'updated_at' => '2024-05-26 15:44:15.726000',
          'published_at' => '2024-05-26 14:31:58.692000',
          'created_by_id' => 1,
          'updated_by_id' => 1, 
          'fecha_envi'=> null
      ),
      array(
          'fecha_pedidos' => '2024-05-27',
          'id_usuario' => 2,
          'id_artesano' => 3,
          'domicilio' => 'Calle Tajo',
          'gasto' => 60,
          'productos_comprados' => 'Pendientes Precios',
          'forma_pago' => 1,
          'estado' => 0,
          'created_at' => '2024-05-26 14:32:45.263000',
          'updated_at' => '2024-05-26 15:40:47.195000',
          'published_at' => '2024-05-26 14:32:45.989000',
          'created_by_id' => 1,
          'updated_by_id' => 1,
          'fecha_envi'=> null
      ),
  );
  
  // Insertar pedidos si no existen
  foreach ($datosPedidos as $pedido) {
      if (!pedido_existe($conexion, $pedido['fecha_pedidos'], $pedido['id_usuario'], $pedido['id_artesano'])) {
          $query = "INSERT INTO pedidos (fecha_pedidos, id_usuario, id_artesano, domicilio, gasto, productos_comprados, forma_pago, estado, created_at, updated_at, published_at, created_by_id, updated_by_id, fecha_envi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          $stmt = mysqli_prepare($conexion, $query);
          mysqli_stmt_bind_param($stmt, 'siisississsiii', 
              $pedido['fecha_pedidos'], 
              $pedido['id_usuario'], 
              $pedido['id_artesano'], 
              $pedido['domicilio'], 
              $pedido['gasto'], 
              $pedido['productos_comprados'], 
              $pedido['forma_pago'], 
              $pedido['estado'], 
              $pedido['created_at'], 
              $pedido['updated_at'], 
              $pedido['published_at'], 
              $pedido['created_by_id'], 
              $pedido['updated_by_id'],
              $pedido['fecha_envi']
          );
          if (mysqli_stmt_execute($stmt)) {
              echo "Pedido del {$pedido['fecha_pedidos']} insertado correctamente.<br>";
          } else {
              echo "Error al insertar pedido del {$pedido['fecha_pedidos']}: " . mysqli_error($conexion) . "<br>";
          }
      } else {
          echo "El pedido del {$pedido['fecha_pedidos']} para el usuario {$pedido['id_usuario']} y artesano {$pedido['id_artesano']} ya existe.<br>";
      }
  }

// Crear la tabla `miwishlists`
$miwishlists = "CREATE TABLE IF NOT EXISTS `miwishlists` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre_producto` varchar(255) DEFAULT NULL,
    `precio_producto` int(11) DEFAULT NULL,
    `id_producto` int(11) DEFAULT NULL,
    `id_usuario` int(11) DEFAULT NULL,
    `ruta` varchar(255) DEFAULT NULL,
    `created_at` datetime(6) DEFAULT NULL,
    `updated_at` datetime(6) DEFAULT NULL,
    `published_at` datetime(6) DEFAULT NULL,
    `created_by_id` int(10) UNSIGNED DEFAULT NULL,
    `updated_by_id` int(10) UNSIGNED DEFAULT NULL,
    `tipo` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_wishlist` (`id_producto`, `id_usuario`)
  )";
  
  if (mysqli_query($conexion, $miwishlists)) {
      echo "Tabla `miwishlists` creada exitosamente.<br>";
  } else {
      echo "Error al crear la tabla: " . mysqli_error($conexion) . "<br>";
  }
  
  // Insertar datos en la tabla `miwishlists`
  $insertmiwishlists = "INSERT INTO `miwishlists` (`nombre_producto`, `precio_producto`, `id_producto`, `id_usuario`, `ruta`, `created_at`, `updated_at`, `published_at`, `created_by_id`, `updated_by_id`, `tipo`) VALUES
  ('Plato Universal', 5, 33, 2, '33.png', '2024-05-26 22:11:05.676000', '2024-05-26 22:11:07.229000', '2024-05-26 22:11:07.226000', 1, 1, 3),
  ('Pendiente Rojo', 30, 2, 2, '2.png', NULL, NULL, NULL, 1, 1, 1),
  ('Collar Ball', 20, 3, 2, '3.png', NULL, NULL, NULL, 1, 1, 1),
  ('Taza Azul', 3, 27, 2, '27.png', NULL, NULL, NULL, 1, 1, 3)
  ON DUPLICATE KEY UPDATE
    nombre_producto = VALUES(nombre_producto),
    precio_producto = VALUES(precio_producto),
    ruta = VALUES(ruta),
    updated_at = VALUES(updated_at),
    tipo = VALUES(tipo);
  ";
  
  if (mysqli_query($conexion, $insertmiwishlists)) {
      echo "Datos insertados exitosamente en la tabla `miwishlists`.<br>";
  } else {
      echo "Error al insertar datos: " . mysqli_error($conexion) . "<br>";
  }
  
?>