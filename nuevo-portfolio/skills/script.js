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
    background: "#1d1d1d", // Color de fondo del canvas
    wireframes: false, // Desactivar la visualización de wireframes
  },
});

// Crear límites (bounds)
var ground = Bodies.rectangle(
  window.innerWidth / 2 + 160,
  window.innerHeight + 80,
  window.innerWidth + 320,
  160,
  { render: { fillStyle: "#080808" }, isStatic: true } // Suelo
);
var wallLeft = Bodies.rectangle(
  -80,
  window.innerHeight / 2,
  160,
  window.innerHeight,
  { isStatic: true } // Pared izquierda
);
var wallRight = Bodies.rectangle(
  window.innerWidth + 80,
  window.innerHeight / 2,
  160,
  1200,
  { isStatic: true } // Pared derecha
);
var roof = Bodies.rectangle(
  window.innerWidth / 2 + 160,
  -80,
  window.innerWidth + 320,
  160,
  { isStatic: true } // Techo
);

var border = 2; // Tamaño del borde
var radius = 6; // Radio de redondeo de las esquinas

// Crear objetos
var illustration = Bodies.rectangle(200, 500, 190.99, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "./recursos/skill-wordpress.svg", // Textura del sprite
      xScale: 1, // Escala en X del sprite
      yScale: 1, // Escala en Y del sprite
    },
  },
});
var art = Bodies.rectangle(35, 460, 56, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/adobe_acrobat.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var threeD = Bodies.rectangle(90, 460, 52, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/after_effects.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var graphic = Bodies.rectangle(60, 420, 105, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var photo = Bodies.rectangle(50, 380, 86, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});

// Video
var documentary = Bodies.rectangle(220, 540, 165, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var animation = Bodies.rectangle(200, 490, 128, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var vintage = Bodies.rectangle(190, 440, 104, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var short = Bodies.rectangle(170, 390, 82, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var website = Bodies.rectangle(360, 420, 108, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var article = Bodies.rectangle(300, 380, 92, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var music = Bodies.rectangle(400, 360, 86, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var star = Bodies.rectangle(80, 260, 42, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var about = Bodies.rectangle(230, 140, 87, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});
var instagram = Bodies.rectangle(320, 180, 40, 45, {
  id: "instagramBody",
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
  url: "https://www.instagram.com/fuse.blog/", // URL de Instagram
});
var random = Bodies.rectangle(230, 180, 112, 45, {
  chamfer: { radius: radius },
  render: {
    sprite: {
      texture: "/recursos/iconos-herramientas/autocad.svg",
      xScale: 0.5,
      yScale: 0.5,
    },
  },
});

// Añadir todos los cuerpos al mundo
World.add(engine.world, [
  ground,
  wallLeft,
  wallRight,
  roof,
  illustration,
  art,
  threeD,
  graphic,
  photo,
  documentary,
  animation,
  vintage,
  short,
  website,
  article,
  music,
  star,
  about,
  instagram,
  random,
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
