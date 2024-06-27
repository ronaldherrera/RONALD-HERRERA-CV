// Importación de módulos de Matter.js
var Engine = Matter.Engine, // Motor físico que maneja la simulación
  Render = Matter.Render, // Renderizador que dibuja la simulación en el navegador
  Events = Matter.Events, // Manejador de eventos para la simulación
  MouseConstraint = Matter.MouseConstraint, // Manejador de restricciones del ratón
  Mouse = Matter.Mouse, // Herramienta para interactuar con el ratón
  World = Matter.World, // Contenedor para todos los cuerpos y restricciones
  Bodies = Matter.Bodies; // Utilidad para crear diferentes tipos de cuerpos

// Crear un motor
var engine = Engine.create(), // Crea una instancia del motor
  world = engine.world; // Referencia al mundo físico dentro del motor

// Crear un renderizador
var render = Render.create({
  element: document.body, // Elemento HTML donde se insertará el canvas
  engine: engine, // Motor a usar para la simulación
  options: {
    width: window.innerWidth, // Ancho del canvas
    height: window.innerHeight, // Alto del canvas
    pixelRatio: 2, // Relación de píxeles para alta resolución
    background: "#1d1d1d00", // Color de fondo del canvas
    wireframes: false, // Desactivar la visualización de wireframes
  },
});

// Crear límites (bounds)
var suelo = Bodies.rectangle(
  window.innerWidth / 2 + 160,
  window.innerHeight + 80,
  window.innerWidth + 320,
  160,
  { render: { fillStyle: "#080808" }, isStatic: true } // Suelo
);
var paredIzquierda = Bodies.rectangle(
  -80,
  window.innerHeight / 2,
  160,
  window.innerHeight,
  { isStatic: true } // Pared izquierda
);
var paredDerecha = Bodies.rectangle(
  window.innerWidth + 80,
  window.innerHeight / 2,
  160,
  1200,
  { isStatic: true } // Pared derecha
);
var techo = Bodies.rectangle(
  window.innerWidth / 2 + 160,
  -80,
  window.innerWidth + 320,
  160,
  { isStatic: true } // Techo
);

var border = 2; // Tamaño del borde
var radius = 6; // Radio de redondeo de las esquinas

// Calcular la escala progresivamente en función del ancho de la pantalla
var screenWidth = window.innerWidth;
var baseScale = 1.0; // Escala base para pantallas medianas
var scale;

if (screenWidth <= 600) {
  scale = baseScale * 0.6; // Reducir escala para pantallas pequeñas
} else if (screenWidth <= 1200) {
  scale = baseScale * 0.8; // Escala base para pantallas medianas
} else {
  scale = baseScale * 1; // Aumentar escala para pantallas grandes
}

var friccion = 0; // Ajusta la gravedad
var elasticidad = 0.5; // Ajusta la elasticidad (más alto = más elástico)

// Crear objetos
var skillFeliz = Bodies.rectangle(310, 500, 52 * scale, 52 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-feliz.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion, // Ajuste de la fricción del aire
  restitution: elasticidad, // Ajuste de la restitución (elasticidad)
});
var skillCerebro = Bodies.rectangle(230, 80, 52 * scale, 52 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-cerebro.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var skillDiversion = Bodies.rectangle(310, 280, 52 * scale, 52 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-diversion.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var skillCorazon = Bodies.rectangle(390, 180, 52 * scale, 52 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-corazon.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var skillAvatar = Bodies.rectangle(330, 0, 148 * scale, 148 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-avatar.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var chatgpt = Bodies.rectangle(190, 190, 184 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-chatgpt.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var skillsItem = Bodies.rectangle(250, 80, 256 * scale, 71 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skills.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var wordpress = Bodies.rectangle(200, 500, 190.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-wordpress.svg", // Textura del sprite
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var dsmax = Bodies.rectangle(35, 460, 154.8 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-3dsMax.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var acrobat = Bodies.rectangle(90, 460, 239.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-acrobat.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var aftereffects = Bodies.rectangle(60, 420, 289.84 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-afetEffects.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var autocad = Bodies.rectangle(50, 380, 162.58 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-autocad.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var blender = Bodies.rectangle(220, 540, 165 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-blender.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var css = Bodies.rectangle(200, 490, 129.27 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-css.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var excel = Bodies.rectangle(190, 440, 243.01 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-excel.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var figma = Bodies.rectangle(170, 390, 130.77 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-figma.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var git = Bodies.rectangle(360, 420, 110.92 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-git.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var github = Bodies.rectangle(300, 380, 148.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-github.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var html = Bodies.rectangle(400, 360, 153.32 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-html.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var illustrator = Bodies.rectangle(80, 260, 261.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-illustrator.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var indesign = Bodies.rectangle(230, 140, 248 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-indesign.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var javascript = Bodies.rectangle(320, 180, 187.99 * scale, 45 * scale, {
  id: "instagramBody",
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-javascript.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var lumion = Bodies.rectangle(230, 180, 149.41 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-lumion.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var mysql = Bodies.rectangle(230, 180, 155.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-mysql.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var notion = Bodies.rectangle(230, 180, 146 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-notion.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var node = Bodies.rectangle(230, 180, 127.48 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-node.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var photoshop = Bodies.rectangle(230, 180, 273.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-photoshop.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var postman = Bodies.rectangle(230, 180, 168 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-postman.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var react = Bodies.rectangle(230, 180, 133.44 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-react.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var revit = Bodies.rectangle(230, 180, 121.67 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-revit.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var sketchup = Bodies.rectangle(230, 180, 175.5 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-sketchup.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var twinmotion = Bodies.rectangle(230, 180, 206.98 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-twinmotion.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var visualStudioCode = Bodies.rectangle(230, 180, 168 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-visualStudioCode.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var webflow = Bodies.rectangle(230, 180, 169 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-webflow.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});
var word = Bodies.rectangle(230, 180, 243.99 * scale, 45 * scale, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-word.svg",
      xScale: scale,
      yScale: scale,
    },
  },
  frictionAir: friccion,
  restitution: elasticidad,
});

// Añadir todos los cuerpos al mundo
World.add(engine.world, [
  suelo,
  paredIzquierda,
  paredDerecha,
  techo,
  skillCorazon,
  skillFeliz,
  skillCerebro,
  skillDiversion,
  skillAvatar,
  skillsItem,
  wordpress,
  dsmax,
  acrobat,
  aftereffects,
  autocad,
  blender,
  chatgpt,
  css,
  excel,
  figma,
  git,
  github,
  html,
  notion,
  illustrator,
  indesign,
  javascript,
  lumion,
  mysql,
  node,
  photoshop,
  postman,
  react,
  revit,
  sketchup,
  twinmotion,
  visualStudioCode,
  webflow,
  word,
]);

// Añadir control del ratón
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

World.add(world, mouseConstraint);

// Mantener el ratón sincronizado con el renderizado
render.mouse = mouse;

// Permitir desplazamiento de página en la ventana de matter.js
mouse.element.removeEventListener("mousewheel", mouse.mousewheel, {
  passive: true,
});
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel, {
  passive: true,
});

// Detectar clics vs. arrastres
let click = false;

document.addEventListener("mousedown", () => (click = true));
document.addEventListener("mousemove", () => (click = false));
document.addEventListener("mouseup", () =>
  console.log(click ? "click" : "drag")
);

// Cambiar cursor a 'grabbing' cuando esté sobre un body
render.canvas.addEventListener("mousemove", function (event) {
  var mousePosition = mouse.position;

  // Obtener todos los cuerpos en el mundo
  var bodies = engine.world.bodies;

  // Verificar si el cursor está sobre algún body
  for (var i = 0; i < bodies.length; i++) {
    var body = bodies[i];

    if (Matter.Bounds.contains(body.bounds, mousePosition)) {
      // Si el cursor está sobre el body, cambiar el cursor a 'grabbing'
      render.canvas.style.cursor = "grabbing";
      return; // Salir del bucle una vez que se cambie el cursor
    }
  }

  // Si no hay ningún body debajo del cursor, cambiar el cursor de nuevo a su estado normal
  render.canvas.style.cursor = "default";
});

// Crear un manejador de eventos On-Mouseup
Events.on(mouseConstraint, "mouseup", function (event) {
  var mouseConstraint = event.source;
  var bodies = engine.world.bodies;
  if (!mouseConstraint.bodyB) {
    for (i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      // Verificar si se hizo clic o se arrastró
      if (click === true) {
        if (
          Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)
        ) {
          var bodyUrl = body.url;
          console.log("Body.Url >> " + bodyUrl);
          // Funcionalidad de hipervínculo
          if (bodyUrl != undefined) {
            //window.location.href = bodyUrl;
            window.open(bodyUrl, "_blank");
            console.log("Hyperlink was opened");
          }
          break;
        }
      }
    }
  }
});

// Ejecutar el motor
Engine.run(engine);

// Ejecutar el renderizador
Render.run(render);
