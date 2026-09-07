/*
 * Datos por defecto del plan de terapia ocupacional en casa.
 *
 * IMPORTANTE (privacidad): este archivo es PÚBLICO. No pongas aquí el nombre
 * del niño, fotos ni notas clínicas. Todo eso vive solo en el navegador de la
 * familia (localStorage) y se maneja con Exportar / Importar dentro del sitio.
 *
 * El contenido de las actividades está basado en el enfoque de integración
 * sensorial recomendado en la evaluación: exposición táctil gradual, tolerancia
 * auditiva, trabajo vestibular y propioceptivo para autorregulación, motor oral,
 * y mantener motricidad fina/gruesa e independencia en la vida diaria.
 * No sustituye la terapia con la profesional ni sus indicaciones.
 */

window.DEFAULT_DATA = {
  version: 3,

  child: {
    name: "",        // se llena desde el sitio, no se sube a GitHub
    photo: "",       // dataURL, solo en el navegador
    ageNote: "2 años"
  },

  // Etiquetas de los días (editables)
  days: [
    { id: "lun", label: "Lunes" },
    { id: "mar", label: "Martes" },
    { id: "mie", label: "Miércoles" },
    { id: "jue", label: "Jueves" },
    { id: "vie", label: "Viernes" },
    { id: "sab", label: "Sábado" },
    { id: "dom", label: "Domingo" }
  ],

  categories: [
    { id: "tactil",   label: "Táctil",              icon: "🖐️", color: "#F4A259", hint: "Tolerar texturas poco a poco, a su ritmo." },
    { id: "auditivo", label: "Auditivo",            icon: "👂", color: "#5B8E7D", hint: "Que los sonidos sean predecibles y él controle el volumen." },
    { id: "movimiento", label: "Movimiento",        icon: "🤸", color: "#4E8FD6", hint: "Balanceo y giro suaves para regular el nivel de alerta." },
    { id: "pesado",   label: "Trabajo pesado",      icon: "💪", color: "#8367C7", hint: "Empujar, cargar y apretar: organiza y calma el cuerpo." },
    { id: "oral",     label: "Motor oral",          icon: "😛", color: "#E76F72", hint: "Soplar, sorber y morder para la boca." },
    { id: "fina",     label: "Motricidad fina",     icon: "✏️", color: "#3FA7A1", hint: "Manos y dedos: mantener lo que ya logra." },
    { id: "gruesa",   label: "Motricidad gruesa",   icon: "🏃", color: "#F2C14E", hint: "Correr, trepar, saltar, lanzar." },
    { id: "avd",      label: "Vida diaria",         icon: "🧦", color: "#6FB1FC", hint: "Vestirse, comer y recoger con más independencia." },
    { id: "calma",    label: "Calma",               icon: "🧘", color: "#9BC1BC", hint: "Bajar revoluciones antes del colapso, no después." }
  ],

  // Cada actividad: pasos claros para que cualquiera en casa la guíe.
  activities: [
    {
      id: "caja-texturas",
      title: "Caja de los tesoros escondidos",
      category: "tactil",
      icon: "📦",
      duration: "5–10 min",
      materials: ["Recipiente grande", "Arroz, pasta seca o pompones", "3–4 juguetes pequeños"],
      steps: [
        "Llena el recipiente con arroz o pasta seca (texturas 'fáciles' para empezar).",
        "Esconde juguetes pequeños dentro y anímalo a buscarlos.",
        "Si no quiere meter la mano, que empiece con una cuchara o una pala.",
        "Celebra cada juguete que encuentre; deja que él marque el ritmo."
      ],
      watch: "Si aumenta la saliva, hace muecas o retira la mano, baja la exigencia (vuelve a la cuchara) y termina en positivo.",
      why: "Exposición táctil gradual y controlada. Busca objetos = motivación para tolerar la textura."
    },
    {
      id: "pintura-bolsa",
      title: "Pintura mágica sin ensuciar",
      category: "tactil",
      icon: "🎨",
      duration: "5–10 min",
      materials: ["Bolsa hermética resistente", "Pintura de dedos o gel de colores", "Cinta adhesiva"],
      steps: [
        "Pon dos cucharadas de pintura dentro de la bolsa y sácale el aire.",
        "Pega la bolsa a la mesa o al ventanal con cinta.",
        "Que aplaste, dibuje líneas y haga círculos con los dedos por encima del plástico.",
        "Cuando lo disfrute, otro día prueben pintura directa en una bandeja."
      ],
      watch: "Es el primer escalón del juego táctil: casi todos los niños lo toleran. Si le encanta, avanza a texturas reales.",
      why: "Estimulación táctil y visomotora con una barrera que le da seguridad."
    },
    {
      id: "masa",
      title: "Panadería: masa y plastilina",
      category: "tactil",
      icon: "🥨",
      duration: "10 min",
      materials: ["Plastilina o masa casera (harina, sal, agua, aceite)", "Rodillo", "Moldes o vasos"],
      steps: [
        "Primero deja que use el rodillo y los moldes (sin tocar la masa directamente).",
        "Luego invítalo a aplastar con un dedo, después con toda la mano.",
        "Escondan objetos dentro y que los rescate amasando.",
        "Hagan 'galletas' y cuéntenlas juntos."
      ],
      watch: "Progresión: herramienta → un dedo → mano completa. No lo fuerces a amasar si aún rechaza el contacto.",
      why: "Trabajo táctil + fuerza de manos (propiocepción de dedos) para motricidad fina."
    },
    {
      id: "espuma-afeitar",
      title: "Espuma de nubes en el espejo",
      category: "tactil",
      icon: "☁️",
      duration: "5–10 min",
      materials: ["Espuma de afeitar sin perfume", "Espejo, azulejos o bandeja", "Pincel y esponja"],
      steps: [
        "Haz un montón de espuma en el espejo o en la bañera.",
        "Empieza tú: dibuja con el pincel y pídele que borre con la esponja.",
        "Invítalo a tocar con un dedo, luego a hacer líneas, luego a 'lavar' con la mano.",
        "Terminen enjuagando juntos: el agua tibia también es parte del juego."
      ],
      watch: "La espuma de afeitar fue de las texturas que más rechazó en la evaluación. Ve MUY gradual: pincel varios días antes de pedir la mano. Nunca en la cara.",
      why: "Desensibilización táctil planificada a un estímulo concreto que le costaba."
    },
    {
      id: "lavar-juguetes",
      title: "Lavadero de juguetes",
      category: "tactil",
      icon: "🫧",
      duration: "10 min",
      materials: ["Dos recipientes con agua tibia", "Esponja y cepillo", "Jabón que haga burbujas", "Juguetes de plástico"],
      steps: [
        "Un recipiente con agua jabonosa, otro para enjuagar.",
        "Que lave los juguetes con la esponja y el cepillo y los pase al agua limpia.",
        "Añade burbujas y anímalo a reventarlas con los dedos.",
        "Al final seca los juguetes con una toalla: otra textura más."
      ],
      watch: "El agua suele ser bien tolerada y 'prepara' la mano para texturas más difíciles. Buen calentamiento antes de la masa o la arena.",
      why: "Juego táctil húmedo + secuencia con propósito + coordinación bilateral."
    },
    {
      id: "camino-texturas",
      title: "Camino de texturas descalzo",
      category: "tactil",
      icon: "👣",
      duration: "5 min",
      materials: ["Toalla, alfombra, esponja grande, papel burbuja, tapete de goma"],
      steps: [
        "Pon 4–5 superficies distintas en fila por el piso.",
        "Caminen juntos de la mano por el camino, nombrando cada textura ('suave', 'pinchudo').",
        "Repítanlo hacia atrás y luego gateando.",
        "Deja que escoja su textura favorita para saltar sobre ella."
      ],
      watch: "Si no quiere quitarse las medias, empieza con medias puestas y avanza otro día.",
      why: "Entrada táctil por los pies + equilibrio y planificación motora."
    },
    {
      id: "botellas-sonido",
      title: "Botellas de sonido caseras",
      category: "auditivo",
      icon: "🔊",
      duration: "10 min (hacerlas) + juego",
      materials: ["Botellas plásticas pequeñas con tapa", "Arroz, frijoles, campanitas, agua", "Cinta para sellar las tapas"],
      steps: [
        "Llénenlas juntos: una con arroz (suave), otra con frijoles, otra con campanitas (fuerte).",
        "Sella bien las tapas.",
        "Que las sacuda y descubra cuál suena bajito y cuál fuerte: él controla el volumen.",
        "Jueguen a esconder una y encontrarla por el sonido."
      ],
      watch: "La clave es que el sonido fuerte lo produce y lo detiene él. Nunca lo sorprendas con la botella ruidosa.",
      why: "Tolerancia auditiva con control propio del estímulo; discriminación de sonidos."
    },
    {
      id: "adivina-sonido",
      title: "¿Qué suena en casa?",
      category: "auditivo",
      icon: "🎧",
      duration: "5–10 min",
      materials: ["Electrodomésticos de casa", "Opcional: orejeras o audífonos"],
      steps: [
        "Antes de encender algo ruidoso (licuadora, secadora, aspiradora), avísale: 'En 3… 2… 1… licuadora'.",
        "Empieza con el aparato lejos y por poco tiempo.",
        "Si lo tolera, que sea él quien apriete el botón (con tu mano encima).",
        "Ten a mano las orejeras por si se abruma; ofrecerlas no es 'rendirse'."
      ],
      watch: "En la evaluación mostró mayor reactividad a sonidos inesperados. La previsibilidad ('3-2-1') es la estrategia principal.",
      why: "Reduce la respuesta de alarma dando anticipación y control sobre sonidos cotidianos."
    },
    {
      id: "banda-musical",
      title: "Nuestra banda musical",
      category: "auditivo",
      icon: "🥁",
      duration: "10 min",
      materials: ["Ollas, cucharas de madera, un tambor", "Maracas caseras"],
      steps: [
        "Toquen suave ('lluviecita') y fuerte ('tormenta'), alternando.",
        "Que él dirija: cuando levanta la mano todos tocan fuerte, cuando la baja, silencio.",
        "Canten una canción conocida marcando el ritmo.",
        "Terminen con 'música de dormir' muy bajita."
      ],
      watch: "Darle el rol de director le da control del volumen. Si se tapa los oídos, bajen todos de inmediato y validen ('estaba fuerte, ¿verdad?').",
      why: "Tolerancia auditiva activa + ritmo, imitación y turnos."
    },
    {
      id: "columpio-manta",
      title: "Hamaca en la manta",
      category: "movimiento",
      icon: "🌙",
      duration: "3–5 min",
      materials: ["Una manta o sábana firme", "Dos adultos"],
      steps: [
        "Acuéstalo en el centro de la manta boca arriba.",
        "Cada adulto toma dos puntas y lo mecen LENTO y parejo, de lado a lado.",
        "Cuéntenle o cántenle mientras lo mecen.",
        "Bájenlo con cuidado al piso y déjenlo quieto un momento antes de levantarse."
      ],
      watch: "Solo balanceo lineal y lento. Si aumenta la saliva, se pone pálido o muy risueño/acelerado, PARA: son señales de sobrecarga vestibular.",
      why: "Estímulo vestibular suave y organizado; muy regulador antes de la siesta."
    },
    {
      id: "taquito-rodar",
      title: "Taquito rodante",
      category: "movimiento",
      icon: "🌯",
      duration: "5 min",
      materials: ["Colchoneta, alfombra o cama", "Una manta"],
      steps: [
        "Envuélvelo en la manta como un 'taquito' (brazos adentro, cabeza libre).",
        "Rueden juntos por la colchoneta despacio.",
        "Desenróllenlo tirando de la manta mientras él gira.",
        "Repitan 3–4 veces según lo disfrute."
      ],
      watch: "Cabeza siempre destapada y a la vista. Para si se marea.",
      why: "Movimiento rotatorio controlado + presión de la manta (propiocepción) = combinación calmante."
    },
    {
      id: "saltos-cojines",
      title: "Saltar y congelarse",
      category: "movimiento",
      icon: "⛰️",
      duration: "5–8 min",
      materials: ["Trampolín pequeño o pila de cojines", "Colchoneta alrededor"],
      steps: [
        "Que salte 10 veces contigo contando en voz alta.",
        "Di '¡congelados!' y que se quede quieto como estatua 3 segundos.",
        "Repitan alternando saltar (alerta) y congelarse (control).",
        "Terminen con un salto grande a los brazos de un adulto."
      ],
      watch: "Alternar movimiento y quietud entrena la autorregulación. Supervisa siempre el salto.",
      why: "Descarga vestibular y propioceptiva + práctica de 'encender y apagar' el cuerpo."
    },
    {
      id: "pelota-suiza",
      title: "Superhéroe en la pelota",
      category: "movimiento",
      icon: "🦸",
      duration: "5 min",
      materials: ["Pelota grande de ejercicio (Swiss ball)", "Juguetes en el piso"],
      steps: [
        "Acuéstalo boca abajo sobre la pelota, sujétalo por las caderas.",
        "Mécelo despacio hacia adelante para que alcance juguetes del piso con las manos.",
        "Mécelo hacia atrás para 'volar'.",
        "Hazlo 5–6 veces; nunca lo sueltes."
      ],
      watch: "Sujeción firme todo el tiempo. Movimiento lento y predecible.",
      why: "Extensión contra gravedad, control de cabeza/tronco y entrada vestibular suave."
    },
    {
      id: "canasta-pesada",
      title: "El ayudante de la mudanza",
      category: "pesado",
      icon: "🧺",
      duration: "5 min",
      materials: ["Canasta o caja", "Libros o botellas de agua"],
      steps: [
        "Pon 2–4 libros o botellas en la canasta (que pese, pero que pueda con ella).",
        "Pídele que la lleve de un cuarto a otro: 'Llévale los libros a papá'.",
        "Que la deje, la vuelva a cargar y la traiga de regreso.",
        "Agradécele mucho: le encanta ser útil."
      ],
      watch: "El peso debe hacerle esforzar sin tambalearse peligrosamente. Distancias cortas.",
      why: "'Trabajo pesado': la propiocepción de cargar peso organiza y calma el sistema nervioso."
    },
    {
      id: "empujar-caja",
      title: "Empuja la caja pesada",
      category: "pesado",
      icon: "📦",
      duration: "5 min",
      materials: ["Caja de cartón resistente", "Almohadas, libros o juguetes para llenarla"],
      steps: [
        "Llena la caja para que ofrezca resistencia al empujar.",
        "Márcale una 'ruta de mudanza' por la casa y que la empuje hasta la meta.",
        "Cambia el peso: más pesada para 'músculos fuertes', más liviana para descansar.",
        "Que también la jale con una cuerda."
      ],
      watch: "Piso liso funciona mejor. Que empuje con las dos manos, cuerpo inclinado.",
      why: "Input propioceptivo intenso a brazos, piernas y tronco: regulación y fuerza."
    },
    {
      id: "abrazo-sandwich",
      title: "Sándwich de cojines",
      category: "pesado",
      icon: "🥪",
      duration: "3–5 min",
      materials: ["2 cojines grandes del sofá"],
      steps: [
        "Él es el 'relleno': se acuesta sobre un cojín.",
        "Pon el otro cojín encima y presiona firme y parejo (espalda, piernas, brazos; nunca la cabeza ni el cuello).",
        "Pregúntale '¿más queso?' y añade presión donde te pida.",
        "Cuenta hasta 10 y libera; repite si lo pide."
      ],
      watch: "Presión firme y constante, nunca brusca. Para si dice o muestra que no le gusta. Nunca sobre cabeza/cuello.",
      why: "Presión profunda: una de las herramientas más efectivas para calmar y organizar."
    },
    {
      id: "tunel-animales",
      title: "Animales por el túnel",
      category: "pesado",
      icon: "🐛",
      duration: "5–8 min",
      materials: ["Túnel de tela o sillas con una sábana encima", "Almohadas"],
      steps: [
        "Que cruce el túnel gateando como oso, culebra (arrastrándose) y cangrejo.",
        "Pon almohadas dentro para que tenga que empujarlas mientras avanza.",
        "Al salir, que empuje la pared con las manos 5 veces ('empuja fuerte').",
        "Repitan cambiando de animal."
      ],
      watch: "Gatear y arrastrarse carga peso en los brazos: eso es lo que buscamos.",
      why: "Trabajo pesado + coordinación cruzada + esquema corporal."
    },
    {
      id: "soplar",
      title: "Todo lo que se puede soplar",
      category: "oral",
      icon: "🫧",
      duration: "5 min",
      materials: ["Burbujas", "Molinillo de viento", "Pompones y una pajilla", "Silbato o matasuegras"],
      steps: [
        "Empiecen con burbujas: soplar fuerte y soplar suavecito.",
        "Carreras de pompones: soplar el pompón por la mesa con una pajilla.",
        "Que apague 'velas' (tus dedos) de un soplido.",
        "Terminen con el molinillo o el silbato."
      ],
      watch: "Si se marea o se cansa, pausa. Un par de minutos bastan.",
      why: "El soplo trabaja labios, mejillas y respiración; ayuda a la regulación y al habla."
    },
    {
      id: "sorber-morder",
      title: "Sorber espeso y morder frío",
      category: "oral",
      icon: "🥤",
      duration: "en la merienda",
      materials: ["Batido espeso o yogur", "Pajilla ancha", "Mordedor frío de la nevera", "Trozos de fruta fría"],
      steps: [
        "Ofrécele el batido o yogur con pajilla: sorber algo espeso da mucho input oral.",
        "Antes de comer, deja que muerda un mordedor frío 1–2 minutos.",
        "Incluye alimentos que requieran masticar (fruta firme, según lo que ya come).",
        "Deja que explore la comida con las manos sin presión por 'ensuciarse'."
      ],
      watch: "Vigila atragantamiento: trozos apropiados para su edad y siempre acompañado.",
      why: "Input propioceptivo a la boca (sorber, morder, masticar) mejora tolerancia oral y prepara la alimentación."
    },
    {
      id: "meter-sacar",
      title: "Meter, sacar y encajar",
      category: "fina",
      icon: "🪙",
      duration: "5–10 min",
      materials: ["Alcancía o caja con ranura", "Fichas, tapas o monedas grandes", "Colador y palitos de espagueti", "Aros apilables"],
      steps: [
        "Que meta fichas por la ranura de una en una.",
        "Clavar palitos de espagueti en los huecos de un colador puesto boca abajo.",
        "Sacar y poner los aros en un palo.",
        "Guardar todo en un frasco con tapa de rosca (que la enrosque él)."
      ],
      watch: "Supervisa piezas pequeñas (no a la boca). En la evaluación esta área estaba dentro de lo esperado: aquí solo mantenemos.",
      why: "Pinza, coordinación ojo-mano y control de soltar objetos."
    },
    {
      id: "trasvasar",
      title: "Trasvasar y garabatear",
      category: "fina",
      icon: "🥄",
      duration: "5–10 min",
      materials: ["Dos tazones", "Cuchara grande y pinzas de cocina", "Pompones, agua o arroz", "Crayones gruesos y papel grande"],
      steps: [
        "Pasar pompones de un tazón a otro con la cuchara, luego con la pinza.",
        "Con agua: pasar de una taza a otra con una esponja o jeringa sin aguja.",
        "En papel grande pegado a la mesa, garabatear líneas y círculos con crayón grueso.",
        "Que imite tus trazos: línea hacia abajo, círculo, puntitos."
      ],
      watch: "Agarre del crayón: déjalo como le salga natural, sin corregir a los 2 años.",
      why: "Fuerza y control de dedos, coordinación bilateral y primeros trazos visomotores."
    },
    {
      id: "circuito",
      title: "Circuito de obstáculos",
      category: "gruesa",
      icon: "🚧",
      duration: "10 min",
      materials: ["Cojines, sillas, cinta en el piso", "Una pelota"],
      steps: [
        "Arma una ruta: gatear bajo la mesa → caminar sobre la línea de cinta → saltar de un cojín → patear la pelota → subir un escalón.",
        "Recórranlo juntos la primera vez, despacio.",
        "Luego que lo haga solo mientras lo animas.",
        "Cambien un obstáculo cada día para que sea nuevo."
      ],
      watch: "Supervisa saltos y el escalón. Ocasionalmente se cae al correr: normal a su edad.",
      why: "Equilibrio, planificación motora, coordinación y resistencia."
    },
    {
      id: "lanzar-encestar",
      title: "Lanzar, encestar y derribar",
      category: "gruesa",
      icon: "🏀",
      duration: "5–10 min",
      materials: ["Pelotas blandas o medias enrolladas", "Canasta, balde o caja", "Vasos o bloques para torres"],
      steps: [
        "Que lance las pelotas a la canasta con las dos manos, luego con una.",
        "Acerca o aleja la canasta según le salga.",
        "Armen una torre de vasos y que la derribe de un pelotazo.",
        "Hagan rodar la pelota de ida y vuelta sentados en el piso."
      ],
      watch: "Atrapar todavía le cuesta (acerca la pelota al cuerpo): ofrécele pelotas grandes y blandas.",
      why: "Coordinación ojo-mano gruesa, control de fuerza y turnos."
    },
    {
      id: "vestirse",
      title: "Me visto yo",
      category: "avd",
      icon: "👕",
      duration: "en la rutina",
      materials: ["Su ropa", "Un banquito"],
      steps: [
        "Ofrécele elegir entre dos camisas: decidir lo engancha.",
        "Tú empiezas la manga y él mete el brazo y jala; tú empiezas la media y él la sube.",
        "Sentado en el banquito, que se quite medias y zapatos solo.",
        "Celebra cada paso que haga sin ayuda, aunque tome más tiempo."
      ],
      watch: "Si una prenda le molesta por la textura (etiquetas, costuras), hazle caso: es parte de su perfil sensorial.",
      why: "Independencia en vestido, secuencias y motricidad; tolerancia táctil a la ropa."
    },
    {
      id: "comer-recoger",
      title: "Cuchara, vaso y a recoger",
      category: "avd",
      icon: "🍽️",
      duration: "en las comidas",
      materials: ["Cuchara y vaso abierto pequeño", "Caja de juguetes"],
      steps: [
        "En la comida, que use la cuchara solo la mayor parte del tiempo (ayuda al final si se cansa).",
        "Ofrécele agua en vaso abierto pequeño, con poca cantidad.",
        "Después de jugar, canten la 'canción de recoger' y guarden juntos, turnándose juguete por juguete.",
        "Que él lleve la caja a su lugar (¡trabajo pesado incluido!)."
      ],
      watch: "Los derrames son parte del aprendizaje. Mantén la misma canción para marcar la transición.",
      why: "Autonomía en alimentación, participación en tareas de casa y anticipación de transiciones."
    },
    {
      id: "rincon-calma",
      title: "El rincón de la calma",
      category: "calma",
      icon: "⛺",
      duration: "cuando lo necesite",
      materials: ["Carpa, casita o esquina con cojines", "Luz suave o linterna", "Peluche pesado o cobija", "1–2 libros"],
      steps: [
        "Arma un espacio pequeño, cerrado y con poca luz, siempre disponible.",
        "Preséntalo como un lugar rico (no un castigo): entren juntos a mirar un libro.",
        "Cuando notes que se acelera o se satura, invítalo ANTES del colapso: 'Vamos a la cuevita'.",
        "Adentro: presión con la cobija, voz baja, respirar 'oliendo la flor / apagando la vela'."
      ],
      watch: "La regla de oro: ir antes del berrinche, no después. Con el tiempo él lo pedirá solo.",
      why: "Espacio de baja estimulación para autorregularse; clave por su reactividad sensorial y a los cambios de rutina."
    },
    {
      id: "rutina-visual",
      title: "La rutina con fotos",
      category: "calma",
      icon: "🗓️",
      duration: "5 min al armarla + uso diario",
      materials: ["Fotos o dibujos de las actividades del día", "Cartulina y velcro o imanes"],
      steps: [
        "Toma fotos de los momentos del día: despertar, desayuno, jugar, siesta, baño, dormir.",
        "Ordénalas en una tira y repásala con él en la mañana.",
        "Antes de cada cambio, muéstrale la foto de lo que sigue: 'Terminó el juego, ahora el baño'.",
        "Que él quite o voltee la foto de lo que ya hicieron."
      ],
      watch: "La transición avisada reduce la resistencia a los cambios. Mantén el orden estable.",
      why: "Anticipación visual: le da previsibilidad y baja la ansiedad ante las transiciones."
    }
  ],

  // Plan semanal por defecto: cada día mezcla activación y calma,
  // con algo de trabajo pesado y algo táctil casi a diario.
  schedule: {
    lun: ["canasta-pesada", "caja-texturas", "circuito", "rincon-calma"],
    mar: ["saltos-cojines", "botellas-sonido", "meter-sacar", "abrazo-sandwich"],
    mie: ["empujar-caja", "espuma-afeitar", "soplar", "columpio-manta"],
    jue: ["tunel-animales", "lavar-juguetes", "lanzar-encestar", "rincon-calma"],
    vie: ["canasta-pesada", "masa", "banda-musical", "taquito-rodar"],
    sab: ["circuito", "camino-texturas", "pelota-suiza", "abrazo-sandwich"],
    dom: ["empujar-caja", "pintura-bolsa", "adivina-sonido", "columpio-manta"]
  },

  // Consejos generales que se muestran en el inicio
  tips: [
    "Poco y seguido gana: 2–3 ratos cortos al día valen más que una sesión larga.",
    "Ofrece, no obligues. Si rechaza una textura, baja un escalón y vuelve otro día.",
    "Trabajo pesado (empujar, cargar, apretar) antes de momentos difíciles: calma el cuerpo.",
    "Avisa siempre los sonidos fuertes con un '3 – 2 – 1'.",
    "Termina cada actividad en positivo, aunque sea antes de lo planeado.",
    "Señales de sobrecarga: más saliva, muecas, se tapa los oídos, se acelera o se paraliza. Ahí toca bajar el ritmo.",
    "Anota qué funcionó en las notas de cada actividad: le sirve a la terapeuta."
  ]
};
