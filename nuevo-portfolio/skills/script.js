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

// Crear objetos
var wordpress = Bodies.rectangle(200, 500, 190.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-wordpress.svg", // Textura del sprite
    },
  },
});
var dsmax = Bodies.rectangle(35, 460, 154.8, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-3dsMax.svg",
    },
  },
});
var acrobat = Bodies.rectangle(90, 460, 239.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-acrobat.svg",
    },
  },
});
var aftereffects = Bodies.rectangle(60, 420, 289.84, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-afetEffects.svg",
    },
  },
});
var autocad = Bodies.rectangle(50, 380, 162.58, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-autocad.svg",
    },
  },
});

// Video
var blender = Bodies.rectangle(220, 540, 165, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-blender.svg",
    },
  },
});
var css = Bodies.rectangle(200, 490, 129.27, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-css.svg",
    },
  },
});
var excel = Bodies.rectangle(190, 440, 243.01, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-excel.svg",
    },
  },
});
var figma = Bodies.rectangle(170, 390, 130.77, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-figma.svg",
    },
  },
});
var git = Bodies.rectangle(360, 420, 110.92, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-git.svg",
    },
  },
});
var github = Bodies.rectangle(300, 380, 148.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-github.svg",
    },
  },
});
var html = Bodies.rectangle(400, 360, 153.32, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-html.svg",
    },
  },
});
var illustrator = Bodies.rectangle(80, 260, 261.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-illustrator.svg",
    },
  },
});
var indesign = Bodies.rectangle(230, 140, 248, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-indesign.svg",
    },
  },
});
var javascript = Bodies.rectangle(320, 180, 187.99, 45, {
  id: "instagramBody",
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-javascript.svg",
    },
  },
  //url: "https://www.instagram.com/fuse.blog/", // URL de Instagram
});
var lumion = Bodies.rectangle(230, 180, 149.41, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-lumion.svg",
    },
  },
});
var mysql = Bodies.rectangle(230, 180, 155.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-mysql.svg",
    },
  },
});
var node = Bodies.rectangle(230, 180, 127.48, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-node.svg",
    },
  },
});
var photoshop = Bodies.rectangle(230, 180, 273.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-photoshop.svg",
    },
  },
});
var postman = Bodies.rectangle(230, 180, 168, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-postman.svg",
    },
  },
});
var react = Bodies.rectangle(230, 180, 133.44, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-react.svg",
    },
  },
});
var revit = Bodies.rectangle(230, 180, 121.67, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-revit.svg",
    },
  },
});
var sketchup = Bodies.rectangle(230, 180, 175.5, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-sketchup.svg",
    },
  },
});
var twinmotion = Bodies.rectangle(230, 180, 206.98, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-twinmotion.svg",
    },
  },
});
var visualStudioCode = Bodies.rectangle(230, 180, 168, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-visualStudioCode.svg",
    },
  },
});
var webflow = Bodies.rectangle(230, 180, 169, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-webflow.svg",
    },
  },
});
var word = Bodies.rectangle(230, 180, 243.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-word.svg",
    },
  },
});

// Añadir todos los cuerpos al mundo
World.add(engine.world, [
  suelo,
  paredIzquierda,
  paredDerecha,
  techo,
  wordpress,
  dsmax,
  acrobat,
  aftereffects,
  autocad,
  blender,
  css,
  excel,
  figma,
  git,
  github,
  html,
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
mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

// Detectar clics vs. arrastres
let click = false;

document.addEventListener("mousedown", () => (click = true));
document.addEventListener("mousemove", () => (click = false));
document.addEventListener("mouseup", () =>
  console.log(click ? "click" : "drag")
);

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
