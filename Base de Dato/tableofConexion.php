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
    subir BLOB DEFAULT NULL,
    UNIQUE KEY unique_product (nombre, ruta)
)';

mysqli_query($conexion, $crearTablaProductos) or die("Error al crear la tabla productos: " . mysqli_error($conexion));

// Verificar la estructura de la tabla
$result = $conexion->query("DESCRIBE productos");
// Datos a insertar
$productos = [

    ///--- Joyeria
    ['Collar De Perla', 'Madrid Arte', 3, 'Perla natural', 120.00, 'Nuestro colgante de perla blanca con cadena de oro amarillo, denominado "Collar De Perla", es una joya exquisita diseñada para añadir un toque de calidez y sofisticación a cualquier atuendo. Este colgante no solo destaca por su elegancia, sino también por su calidad y estilo atemporal.', 'Perla: Diámetro de la perla: 8-9 mm. Longitud de la cadena: 45 cm, con opción de ajuste a 40 cm para mayor versatilidad.', '1.png', 20, '2024-05-25 13:53:39.642000', '2024-05-25 21:42:55.637000', '2024-05-25 13:55:52.573000', 1, 1, 1, null],
    ['Pendiente Rojo', NULL, NULL, 'Piedra roja', 30.00, 'Nuestros pendientes rojos son una joya vibrante y elegante que añade un toque de color y sofisticación a cualquier atuendo. Estos pendientes están diseñados para destacar, convirtiéndose en el accesorio perfecto para diversas ocasiones.', 'Piedras: Tamaño de las piedras: 6-8 mm de diámetro.Longitud del Pendiente: Aproximadamente 2.5 cm, con un cierre seguro que asegura comodidad y facilidad de uso', '2.png', 30, '2024-05-25 21:10:08.820000', '2024-05-25 21:43:12.014000', '2024-05-25 21:11:15.212000', 1, 1, 1, null],
    ['Pendiente Rojo', NULL, NULL, 'Piedra roja', 20.00, 'Nuestros pendientes rojos son la encarnación de la elegancia y el estilo audaz. Diseñados para resaltar la belleza y personalidad de quien los lleva, estos pendientes son la elección perfecta para añadir un toque vibrante y sofisticado a cualquier conjunto.','Cristales: Tamaño de los cristales: 8-10 mm. Longitud del Pendiente: Varía entre 2 a 4 cm, dependiendo del diseño, con un cierre seguro tipo mariposa o gancho, asegurando comodidad y facilidad de uso.', '3.png', 10, '2024-05-25 21:10:08.820000', '2024-05-25 21:43:12.014000', '2024-05-25 21:11:15.212000', 1, 1, 1, null],
    ['Collar Ball', NULL, NULL, 'Perla metálica', 70.00, 'Nuestro collar "Ball" es una pieza de joyería moderna y sofisticada, diseñada para añadir un toque de elegancia y estilo a cualquier atuendo. Este collar destaca por su diseño simple y elegante, convirtiéndose en una elección perfecta tanto para el uso diario como para ocasiones especiales.', 'Colgante: Diámetro de la bola: 10-12 mm. Cadena: Longitud de la cadena: 45 cm, con opción de ajuste a 40 cm para mayor versatilidad. ', '4.png', 10, '2024-05-25 21:11:04.503000', '2024-05-25 21:42:48.074000', '2024-05-25 21:11:15.212000', 1, 1, 1, null],
    ['Collar Flores', NULL, NULL, 'Collar Hoja', 60.00, 'Nuestro collar "Flores" es una joya encantadora y delicada, diseñada para añadir un toque de frescura y feminidad a cualquier atuendo. Este collar destaca por su diseño detallado y su inspiración en la naturaleza, convirtiéndolo en una elección perfecta para quienes aman las piezas únicas y románticas.', 'Colgante: Tamaño del colgante floral: aproximadamente 2-3 cm de diámetro.  Longitud de la cadena: 45 cm, con opción de ajuste a 40 cm para mayor versatilidad.', '5.png', 10, '2024-05-25 21:44:45.088000', '2024-05-25 21:44:45.088000', '2024-05-25 21:44:54.934000', 1, 1, 1, null],
    ['Collar Ball', NULL, NULL, 'Collar Anilla Dorada Con Perla', 60.00, 'Nuestro collar "Ball" es una pieza de joyería moderna y elegante que destaca por su diseño simple pero impactante. Este collar es perfecto para añadir un toque de sofisticación a cualquier atuendo, ya sea casual o formal, y es ideal tanto para el uso diario como para ocasiones especiales.', 'Colgante: Diámetro de la bola: 10-12 mm. Longitud de la cadena: 45 cm, con opción de ajuste a 40 cm para mayor versatilidad. ', '7.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Collar Oro', NULL, NULL, 'Collar bañada de Oro 88k', 65.00, 'Nuestro collar de oro es una pieza de joyería lujosa y atemporal, diseñada para añadir un toque de sofisticación y elegancia a cualquier atuendo. Este collar es perfecto para quienes buscan una joya que combine calidad y estilo, siendo ideal tanto para el uso diario como para ocasiones especiales.', 'Longitud de la Cadena: Disponible en varias longitudes, típicamente entre 40 cm y 50 cm, adaptándose a diferentes estilos y preferencias.Grosor de la Cadena: Varía entre 1 mm y 5 mm, permitiendo elegir entre un look más delicado o uno más audaz.', '8.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Perla','Madrid Arte', 3, 'Pendiente de Perlas Naturales', 55.00, 'Nuestros pendientes de perla son una joya clásica y atemporal que añade un toque de elegancia y sofisticación a cualquier atuendo. Diseñados para resaltar la belleza natural de las perlas, estos pendientes son ideales tanto para el uso diario como para ocasiones especiales.', 'Perlas: Diámetro de las perlas: entre 7-9 mm.Longitud del Pendiente: Aproximadamente 2 cm, dependiendo del diseño específico de la montura y el estilo del cierre.', '9.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Perla', 'Madrid Arte', 3, 'Pendiente de Perlas Naturales', 60.00, 'Nuestros pendientes de perla son una joya atemporal y sofisticada que aporta un toque de elegancia clásica a cualquier conjunto. Diseñados con atención al detalle y hechos con materiales de la más alta calidad, estos pendientes son ideales tanto para ocasiones especiales como para el uso diario.', 'Perlas: Diámetro de las perlas: entre 8-10 mm. Longitud del Pendiente: Aproximadamente 1.5-2 cm, dependiendo del diseño específico de la montura y el estilo del cierre.', '10.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Piedra Roja', NULL, NULL, 'Pendiente de Madera Rojo', 30.00, 'Nuestros pendientes de piedra roja son una joya vibrante y sofisticada, diseñada para añadir un toque de color y elegancia a cualquier atuendo. Estos pendientes, con sus deslumbrantes piedras rojas y su diseño refinado, son perfectos tanto para el uso diario como para ocasiones especiales.', 'Piedras: Tamaño de las piedras: entre 6-8 mm de diámetro. Longitud del Pendiente: Varía entre 2-3 cm, dependiendo del diseño específico y el estilo del cierre, ya sea tipo mariposa o gancho.', '11.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Jaspe', NULL, NULL, 'Pendiente hecha con la piedra Jaspe', 30.00, 'Nuestros pendientes de jaspe son una joya única y sofisticada que aporta un toque de naturaleza y elegancia a cualquier atuendo. Diseñados con atención al detalle y hechos con materiales de la más alta calidad, estos pendientes son ideales tanto para el uso diario como para ocasiones especiales.', 'Piedras: Tamaño de las piedras de jaspe: entre 8-10 mm de diámetro. Longitud del Pendiente: Aproximadamente 2-4 cm, dependiendo del diseño específico y el estilo del cierre, ya sea tipo mariposa o gancho. ', '12.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pulsera Dorada', NULL, NULL, 'Pulsera Aros Doradas', 50.00, 'Nuestra pulsera dorada es una joya lujosa y sofisticada diseñada para añadir un toque de elegancia y glamour a cualquier atuendo. Esta pulsera, con su acabado brillante y diseño refinado, es perfecta tanto para el uso diario como para ocasiones especiales, siendo un complemento ideal para cualquier colección de joyas.', 'Longitud de la Pulsera: Disponible en varias longitudes, típicamente entre 17 cm y 20 cm, adaptándose a diferentes tamaños de muñeca. Grosor de la Pulsera: Varía entre 2 mm y 5 mm, permitiendo elegir entre un look más delicado o uno más audaz. ', '13.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pulsera Plata', NULL, NULL, 'Pulsera plateada con cristal', 60.00, 'Nuestra pulsera de plata es una joya elegante y versátil, diseñada para añadir un toque de sofisticación a cualquier atuendo. Con un diseño refinado y materiales de alta calidad, esta pulsera es perfecta tanto para el uso diario como para ocasiones especiales.', 'Plata Esterlina 925: La pulsera está fabricada en plata esterlina 925, garantizando durabilidad, brillo y resistencia al desgaste. Cierre Seguro: Equipado con un cierre de langosta o tipo caja, que proporciona seguridad y comodidad al usarla.', '14.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Elefante', NULL, NULL, 'Elefante plateada Diseño Unico', 30.00, 'El pendiente "Elefante" es una joya distintiva y encantadora, diseñada para quienes buscan añadir un toque único y significativo a su colección de accesorios. Con un diseño cuidadosamente elaborado de un elefante, este pendiente simboliza fuerza y sabiduría, siendo perfecto tanto para el uso diario como para ocasiones especiales.', 'Talla Única: El pendiente está diseñado en una talla única que se adapta cómodamente a la mayoría de las personas.', '15.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Perla', NULL, NULL, 'Perla Natural con hoja rosa', 50.00, 'Nuestros pendientes de perla son una joya clásica y atemporal diseñada para añadir un toque de elegancia y sofisticación a cualquier atuendo. Estas piezas son perfectas tanto para el uso diario como para ocasiones especiales, gracias a su diseño refinado y la calidad excepcional de sus materiales.', 'Perlas: Diámetro de las perlas: entre 7-9 mm.Longitud del Pendiente: Aproximadamente 1.5-2 cm, dependiendo del diseño específico de la montura y el estilo del cierre, ya sea tipo mariposa o gancho. ', '16.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Plateada', NULL, NULL, 'Pendiente de Perla bañado con Oro', 30.00, 'Nuestros pendientes plateados son una joya versátil y elegante, diseñada para añadir un toque de sofisticación a cualquier atuendo. Con un diseño moderno y materiales de alta calidad, estos pendientes son perfectos tanto para el uso diario como para ocasiones especiales.', 'Dimensiones: Disponibles en varias dimensiones para adaptarse a diferentes gustos, desde pendientes pequeños y discretos hasta opciones más grandes y llamativas.Cierre Seguro: Equipados con cierres tipo mariposa o de gancho, proporcionando seguridad y comodidad al usar. ', '17.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Perla', 'Madrid Arte', 3, 'Pulsera plateada', 60.00, 'Nuestros pendientes de perla son una joya clásica y elegante que añade un toque de sofisticación a cualquier atuendo. Diseñados con atención al detalle y utilizando materiales de la más alta calidad, estos pendientes son ideales tanto para el uso diario como para ocasiones especiales.', 'Perlas: Diámetro de las perlas: entre 7-9 mm.Longitud del Pendiente: Aproximadamente 1.5-2 cm, dependiendo del diseño específico de la montura y el estilo del cierre, ya sea tipo mariposa o gancho. ', '18.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    ['Pendiente Perla', 'Madrid Arte', 3,'Perdiente Perla natural Diseño Unico', 30.00, 'El pendiente de perla natural "Madrid Arte" es una joya exclusiva diseñada para aportar un toque de elegancia y sofisticación a cualquier atuendo. Hecho a mano con materiales de alta calidad, este pendiente es ideal tanto para el uso diario como para ocasiones especiales.', 'Talla Única: El pendiente está diseñado en una talla única que se adapta cómodamente a la mayoría de las personas.', '19.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null], 
    ['Pendiente Oro', NULL, NULL, 'Perla Oro', 30.00, 'El pendiente "Perla Oro" es una joya única y elegante, diseñada para resaltar la belleza natural de las perlas con un toque distintivo. Hecho a mano con un diseño de hoja, este pendiente es perfecto tanto para el uso diario como para ocasiones especiales.', 'Talla Única: El pendiente está diseñado en una talla única que se adapta cómodamente a la mayoría de las personas.', '20.png', 10, NULL, NULL, NULL, NULL, NULL, 1, null],
    
    ['Taza Azul', 'Azuzu', 4, 'Taza Azul', 3.00, 'Nuestra taza azul es un complemento perfecto para cualquier cocina u oficina, diseñada para añadir un toque de color y estilo a tu rutina diaria. Hecha con materiales de alta calidad y un acabado elegante, esta taza es ideal tanto para el uso diario como para ocasiones especiales.', 'Capacidad: La taza tiene una capacidad de 350 ml, perfecta para disfrutar de tu café, té o cualquier bebida favorita. Dimensiones: Altura de aproximadamente 9.5 cm y diámetro de 8 cm, proporcionando un tamaño ideal para una experiencia de bebida satisfactoria.', '25.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Azul', 'Azuzu', 4, 'Plato Azul', 6.00, 'El plato azul de "Azuzu" es una pieza elegante y funcional, diseñada para añadir un toque de color y sofisticación a cualquier mesa. Fabricado con materiales de alta calidad, este plato es ideal tanto para el uso diario como para ocasiones especiales.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 26 cm, proporcionando un tamaño ideal para servir una variedad de alimentos.', '26.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Taza Azul', 'Azuzu', 4, 'Taza Azul', 7.00, 'Nuestra taza azul es una pieza elegante y práctica, diseñada para realzar la experiencia de beber tu bebida favorita. Con un diseño atractivo y materiales de alta calidad, esta taza es perfecta para uso personal o como un regalo especial.', 'Capacidad Generosa: Con una capacidad de 350 ml, es perfecta para disfrutar de una generosa porción de café, té, chocolate caliente o cualquier otra bebida.', '27.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Taza Azul Raya', 'Azuzu', 4, 'Taza Azul Raya', 7.00, 'La taza azul con rayas de "Azuzu" es una pieza atractiva y funcional, diseñada para añadir un toque de color y estilo a tu experiencia de bebida diaria. Hecha con materiales de alta calidad, esta taza es ideal tanto para el uso personal como para regalar.', 'Capacidad Generosa: Con una capacidad de 350 ml, es perfecta para disfrutar de una generosa porción de café, té, chocolate caliente o cualquier otra bebida.', '28.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Tetera Azul', 'Azuzu', 4, 'Tetera Azul', 20.00, 'La tetera azul es una pieza elegante y funcional, diseñada para añadir un toque de estilo y sofisticación a tu experiencia de tomar té. Con su diseño atractivo y materiales de alta calidad, esta tetera es ideal tanto para el uso diario como para ocasiones especiales.', 'Capacidad Generosa: La tetera tiene una capacidad de 1.2 litros, perfecta para servir varias tazas de té, ideal para reuniones con amigos y familiares.', '29.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Imaginario', 'CieloA', 5, 'Plato Imaginario', 5.00, 'El plato "Imaginario" es una pieza única y artística, diseñada para añadir un toque de creatividad y estilo a cualquier mesa. Con su diseño innovador y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia visualmente atractiva.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '30.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Taza Blanca', 'CieloA', 5, 'Taza Blanca', 20.00, 'Nuestra taza blanca es un elemento esencial para cualquier hogar u oficina, diseñada para combinar simplicidad y elegancia. Con su diseño clásico y materiales de alta calidad, esta taza es perfecta tanto para el uso diario como para ocasiones especiales.', 'Capacidad Generosa: Con una capacidad de 350 ml, es perfecta para disfrutar de una generosa porción de café, té, chocolate caliente o cualquier otra bebida.', '31.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Taza Blanca', 'CieloA', 5, 'Taza Blanca', 10.00, 'La taza blanca con rayas es una pieza elegante y moderna, diseñada para añadir un toque de estilo y sofisticación a tu rutina diaria. Con su diseño atractivo y materiales de alta calidad, esta taza es perfecta tanto para el uso personal como para regalar.', 'Capacidad Generosa: Con una capacidad de 350 ml, es perfecta para disfrutar de una generosa porción de café, té, chocolate caliente o cualquier otra bebida.', '32.png', 10, NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Universo', NULL, NULL, 'Plato Universo', 5.00, 'El plato "Universo" es una pieza excepcional que combina arte y funcionalidad, diseñada para llevar una experiencia visual única a tu mesa. Inspirado en la majestuosidad del cosmos, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una celebración de la belleza del universo.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '33.png', 10,NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Hehua', NULL, NULL, 'Plato Hehua', 5.00, 'El plato "Hehua" es una pieza elegante y artística, diseñada para añadir un toque de sofisticación y belleza a cualquier mesa. Inspirado en la delicadeza y la belleza de las flores de loto, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia visualmente agradable.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '34.png', 10, NULL,NULL, NULL, NULL, NULL, 3, null],
    ['Plato Piedra', NULL, NULL, 'Plato Piedra', 3.00, 'El plato "Piedra" es una pieza elegante y robusta, diseñada para añadir un toque de sofisticación rústica y natural a cualquier mesa. Con su diseño inspirado en la textura y el color de la piedra natural, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia única y memorable.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '35.png', 10,NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Dorada', NULL, NULL, 'Plato Dorada', 6.00, 'El plato dorado es una pieza lujosa y elegante, diseñada para añadir un toque de opulencia y estilo a cualquier mesa. Con su acabado brillante y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia excepcional.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '36.png', 10,NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Liso', NULL, NULL, 'Plato Liso', 3.00, 'El plato liso es una pieza esencial y versátil, diseñada para combinar simplicidad y elegancia en cualquier mesa. Con su diseño minimalista y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, ofreciendo una base perfecta para cualquier comida.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '37.png', 10, NULL,NULL, NULL, NULL, NULL, 3, null],
    ['Plato Liso', NULL, NULL, 'Plato Liso', 3.00, 'El plato liso es una pieza versátil y elegante, diseñada para aportar un toque de sofisticación a cualquier mesa. Con su diseño sencillo y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, ofreciendo una base neutra que realza la presentación de cualquier comida.', 'Dimensiones Generosas: Con un diámetro estándar de aproximadamente 27 cm, el plato ofrece un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '38.png', 10,NULL, NULL, NULL, NULL, NULL, 3, null],
    ['Plato Flor', NULL, NULL, 'Plato Flor', 5.00, 'El plato "Flor" es una pieza encantadora y artística, diseñada para añadir un toque de elegancia y naturaleza a cualquier mesa. Con su diseño inspirado en flores y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia visualmente agradable.', 'Dimensiones Generosas: Con un diámetro estándar de aproximadamente 27 cm, el plato ofrece un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '39.png', 10, NULL,NULL, NULL, NULL, NULL, 3, null],
    ['Plato Dorada', NULL, NULL, 'Plato Dorada', 6.00, 'El plato dorado es una pieza lujosa y sofisticada, diseñada para añadir un toque de opulencia y estilo a cualquier mesa. Con su acabado brillante y materiales de alta calidad, este plato es perfecto tanto para el uso diario como para ocasiones especiales, convirtiendo cada comida en una experiencia excepcional.', 'Dimensiones: El plato tiene un diámetro estándar de aproximadamente 27 cm, proporcionando un tamaño ideal para servir una variedad de alimentos, desde aperitivos hasta platos principales.', '40.png', 10, NULL,NULL, NULL, NULL, NULL, 3, null],
    
    ['Serum Anticaida', NULL, NULL, 'Serum Anticaida', 16.00, 'El serum anticaída es una solución avanzada diseñada para fortalecer el cabello, reducir la caída y promover un crecimiento saludable. Formulado con ingredientes naturales y tecnologías innovadoras, este serum es perfecto para quienes buscan revitalizar y fortalecer su cabello.', 'Tamaño: Disponible en frascos de 50 ml y 100 ml, adaptándose a diferentes necesidades y duraciones de tratamiento.', '41.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null],
    ['Crema Hidratante', NULL, NULL, 'Crema Hidratante', 50.00, 'Nuestra crema hidratante es una fórmula avanzada diseñada para proporcionar hidratación profunda y duradera a la piel. Con una combinación de ingredientes naturales y científicamente probados, esta crema es perfecta para todos los tipos de piel, incluyendo las más sensibles, y es ideal tanto para el uso diario como para necesidades específicas de hidratación.', 'Envase Práctico: Viene en un frasco de 50 ml con un diseño práctico y elegante, fácil de llevar en el bolso o de viaje.', '42.png', 10,NULL, NULL, NULL, NULL, NULL, 2, null],
    ['Limpiador Facial', NULL, NULL, 'Limpiador Facial', 35.00, 'El limpiador facial liso es una fórmula suave y eficaz diseñada para limpiar profundamente la piel, eliminando impurezas y residuos de maquillaje sin irritar. Ideal para todo tipo de pieles, este limpiador deja la piel fresca, suave y preparada para los siguientes pasos de tu rutina de cuidado.', 'Envase Práctico: Viene en un tubo de 150 ml con un diseño práctico y elegante, fácil de usar y transportar.', '43.png', 10,NULL, NULL, NULL, NULL, NULL, 2, null],
    ['Serum para Acne', NULL, NULL, 'Serum para Acne', 25.00, 'El sérum para acné es una fórmula avanzada diseñada para tratar y prevenir brotes de acné, reducir la inflamación y mejorar la apariencia general de la piel. Con una combinación de ingredientes activos y naturales, este sérum es ideal para quienes buscan una solución eficaz para una piel clara y saludable.', 'Envase Práctico: Viene en un frasco de vidrio oscuro de 30 ml con un gotero para una aplicación precisa y controlada, preservando la integridad de los ingredientes activos.', '44.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null],
    ['Crema Reparación', NULL, NULL, 'Crema Reparación', 50.00, 'La crema reparación es una fórmula intensiva diseñada para restaurar y revitalizar la piel dañada. Con una combinación de ingredientes naturales y activos avanzados, esta crema es ideal para tratar áreas secas, irritadas o dañadas, proporcionando una hidratación profunda y una reparación visible.', 'Envase Práctico: Viene en un tubo de 50 ml con un diseño práctico y elegante, fácil de llevar en el bolso o de viaje.', '45.png', 10,NULL, NULL, NULL, NULL, NULL, 2, null],
    ['Limpiador Facial', NULL, NULL, 'Limpiador Facial', 40.00, 'El limpiador facial es una fórmula suave y eficaz diseñada para limpiar profundamente la piel, eliminando impurezas y residuos de maquillaje sin irritar. Ideal para todo tipo de pieles, este limpiador deja la piel fresca, suave y preparada para los siguientes pasos de tu rutina de cuidado.', 'Envase Práctico: Viene en un tubo de 150 ml con un diseño práctico y elegante, fácil de usar y transportar.', '46.png', 10,NULL, NULL, NULL, NULL, NULL, 2, null],
    ['Crema de Mano', NULL, NULL, 'Crema de Mano', 20.00, 'Nuestra crema de manos es una fórmula rica y nutritiva diseñada para proporcionar hidratación intensa y protección duradera a la piel de las manos. Con una combinación de ingredientes naturales y activos eficaces, esta crema es ideal para mantener las manos suaves, lisas y saludables, especialmente en climas secos o fríos.', 'Envase Práctico: Viene en un tubo de 75 ml con un diseño práctico y elegante, fácil de llevar en el bolso o de viaje.', '47.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null],
    ['Crema Antiedad', NULL, NULL, 'Crema Antiedad', 60.00, 'Nuestra crema antiedad es una fórmula avanzada diseñada para combatir los signos del envejecimiento y rejuvenecer la piel. Con una combinación de ingredientes activos y naturales, esta crema es ideal para reducir arrugas, mejorar la firmeza y restaurar la luminosidad de la piel, proporcionando un aspecto más joven y saludable.', 'Envase Práctico: Viene en un frasco de 50 ml con un diseño práctico y elegante, fácil de usar y transportar.', '48.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null],
    ['Serum D++', NULL, NULL, 'Serum D++', 80.00, 'El sérum D++ es una fórmula avanzada diseñada para proporcionar una hidratación intensa y mejorar la salud general de la piel. Enriquecido con vitamina D y otros ingredientes activos, este sérum es ideal para reforzar la barrera cutánea, mejorar la elasticidad y dar a la piel un brillo saludable.', 'Envase Práctico: Viene en un frasco de vidrio oscuro de 30 ml con un gotero para una aplicación precisa y controlada, preservando la integridad de los ingredientes activos.', '49.png', 10, NULL, NULL,NULL, NULL, NULL, 2, null],
    ['Serum VC', NULL, NULL, 'Serum VC', 60.00, 'El sérum VC es una potente fórmula antioxidante diseñada para iluminar y revitalizar la piel. Enriquecido con vitamina C y otros ingredientes activos, este sérum es ideal para combatir los signos del envejecimiento, mejorar la textura de la piel y reducir la apariencia de manchas oscuras.', 'Envase Práctico: Viene en un frasco de vidrio oscuro de 30 ml con un gotero para una aplicación precisa y controlada, preservando la integridad de los ingredientes activos.', '50.png', 10, NULL, NULL, NULL,NULL, NULL, 2, null],
    ['Champu Anticaida', NULL, NULL, 'Champu Anticaida', 16.00, 'El champú anticaída es una fórmula avanzada diseñada para fortalecer el cabello, reducir la caída y promover un crecimiento saludable. Enriquecido con ingredientes naturales y activos científicos, este champú es ideal para quienes buscan revitalizar y fortalecer su cabello desde la raíz hasta las puntas.', 'Envase Práctico: Viene en un frasco de 250 ml con un diseño práctico y elegante, fácil de usar y transportar.', '51.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null],
    ['Set de Regalo', NULL, NULL, 'Set de Regalo', 50.00, 'El set de regalo es una colección cuidadosamente seleccionada de productos de cuidado personal, diseñada para ofrecer una experiencia de lujo y bienestar. Perfecto para cualquier ocasión especial, este set es ideal para consentir a alguien especial o para darse un capricho personal. Champú Anticaída (250 ml): Fortalece el cabello, reduce la caída y promueve un crecimiento saludable.
    Acondicionador Hidratante (250 ml): Hidrata profundamente el cabello, dejándolo suave y manejable.
    Sérum Facial (30 ml): Proporciona hidratación intensa y mejora la salud general de la piel.
    Crema de Manos (75 ml): Hidrata y protege las manos, dejándolas suaves y lisas.', 'Caja de Regalo Elegante: El set viene en una caja de regalo atractiva y elegante, ideal para cualquier ocasión especial como cumpleaños, aniversarios, o festividades.', '52.png', 10, NULL,NULL, NULL, NULL, NULL, 2, null]

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
        $insertarProducto = "INSERT INTO productos (nombre, nombre_artesano, id_artesano, subtitulo, precio, detalles, tallas, ruta, stock, created_at, updated_at, published_at, created_by_id, updated_by_id, tipo, subir) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conexion->prepare($insertarProducto);
        $stmt->bind_param('ssisssssissiiiib', $producto[0], $producto[1], $producto[2], $producto[3], $producto[4], $producto[5], $producto[6], $producto[7], $producto[8], $producto[9], $producto[10], $producto[11], $producto[12], $producto[13], $producto[14], $producto[15]);

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