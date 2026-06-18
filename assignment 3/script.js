const canvas   = document.getElementById('canvas');
const cursorEl = document.getElementById('cursor');
const W = () => window.innerWidth;
const H = () => window.innerHeight;

const DEFS = [
  { grad: 'radial-gradient(circle at 45% 42%,rgb(127, 225, 219) 0%,rgb(58, 208, 193) 40%,rgb(200, 136, 183) 75%, #700040 100%)', baseSize: 220, activeSize: 340, speed: 0.20 },
  { grad: 'radial-gradient(circle at 50% 42%,rgb(109, 109, 251) 0%,rgb(80, 63, 234) 42%, #280060 100%)',               baseSize: 280, activeSize: 420, speed: 0.16 },
  { grad: 'radial-gradient(circle at 44% 46%,rgb(250, 94, 172) 0%,rgb(231, 49, 143) 48%, #700040 100%)',               baseSize: 200, activeSize: 310, speed: 0.23 },
  { grad: 'radial-gradient(circle at 42% 50%, #ff8820 0%,rgb(245, 178, 134) 46%, #782000 100%)',               baseSize: 250, activeSize: 380, speed: 0.26 },
  { grad: 'radial-gradient(circle at 50% 44%,rgb(196, 137, 255) 0%,rgb(105, 41, 187) 46%, #200060 100%)',               baseSize: 300, activeSize: 450, speed: 0.18 },
  { grad: 'radial-gradient(circle at 40% 50%,rgb(202, 255, 134) 0%,rgb(155, 245, 58) 40%, #004828 100%)',               baseSize: 230, activeSize: 350, speed: 0.22 },
  { grad: 'radial-gradient(circle at 44% 48%,rgb(86, 178, 244) 0%,rgb(42, 136, 238) 42%, #001868 100%)',               baseSize: 270, activeSize: 400, speed: 0.19 },
  { grad: 'radial-gradient(circle at 50% 42%,rgb(253, 140, 140) 0%,rgb(255, 109, 131) 44%, #600008 100%)',               baseSize: 210, activeSize: 320, speed: 0.21 }
];

const REVEAL_RADIUS = 200;

const orbs = DEFS.map(function(def) {
  const el = document.createElement('div');
  el.className        = 'orb';
  el.style.background = def.grad;
  el.style.width      = def.baseSize + 'px';
  el.style.height     = def.baseSize + 'px';
  canvas.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  return {
    el, def,
    x:      Math.random() * W(),
    y:      Math.random() * H(),
    vx:     Math.cos(angle) * def.speed,
    vy:     Math.sin(angle) * def.speed,
    active: false
  };
});

let mx = W() / 2;
let my = H() / 2;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX;
  my = e.clientY;
  cursorEl.style.left = mx + 'px';
  cursorEl.style.top  = my + 'px';
});

function loop() {
  const vw = W();
  const vh = H();

  orbs.forEach(function(o) {
    o.x += o.vx;
    o.y += o.vy;

    const b = o.def.baseSize * 0.3;
    if (o.x < -b)                      { o.vx =  Math.abs(o.vx); }
    if (o.x > vw - o.def.baseSize + b) { o.vx = -Math.abs(o.vx); }
    if (o.y < -b)                      { o.vy =  Math.abs(o.vy); }
    if (o.y > vh - o.def.baseSize + b) { o.vy = -Math.abs(o.vy); }

    const cx   = o.x + o.def.baseSize / 2;
    const cy   = o.y + o.def.baseSize / 2;
    const dist = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy));

    if (dist < REVEAL_RADIUS && !o.active) {
      o.active = true;
      o.el.style.width  = o.def.activeSize + 'px';
      o.el.style.height = o.def.activeSize + 'px';
      o.el.classList.add('active');
    } else if (dist >= REVEAL_RADIUS && o.active) {
      o.active = false;
      o.el.style.width  = o.def.baseSize + 'px';
      o.el.style.height = o.def.baseSize + 'px';
      o.el.classList.remove('active');
    }

    o.el.style.transform = 'translate3d(' + Math.round(o.x) + 'px,' + Math.round(o.y) + 'px,0)';
  });

  const anyActive = orbs.some(function(o) { return o.active; });
  cursorEl.style.width  = anyActive ? '44px' : '24px';
  cursorEl.style.height = anyActive ? '44px' : '24px';

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

/* SCRIPT.JS — HOVER AS ART Keira Izzard - Interactive Media A3*/

/*All circles are built and animated in JavaScript with randomised positions and directions so every page load looks slightly different. */
/* W() and H() return live viewport size so bounce boundaries stay correct if the window is resized. */
/* Circle definitions 
Each object sets a circle’s colour gradient, resisting size, revealed size and drift speed. Slow speeds (0.16-0.26px per frame) keep movement drifting. The colours do reference some in my mood board, like the intense purple; other shades have been lightened to create a more pastel feel. */
/* Reveal Radius
The cursor must be within 200px of a circle’s centre to trigger the reveal. This generous distance allows the orbs to feel like they are glowing before the cursor actually reaches them.*/
/* Build circles 
A div is used to create each individual circle, which forms the orbs floating on screen. Each has a random start position, velocity uses cos/sin on a random angle, so each circle drifts in a genuinely unique direction*/
/* Animation loop 
Runs ar 60fps via requestAnimationFrame. Each frame per circle:
Move – velocity added to position 
Bounce – velocity reverses at viewpoint edges, 30% bleed allowed so that circles ease off the screen gently rather than clipping abruptly off.
Proximity – distance from cursor to circle centre, anchored to base size so the threshold stays stable when a circle grows on its reveal, this helps prevent a twitching effect. 
Apply – translate3d positions the circle then GPU- composited for smooth 60fs rendering

/* Future considerations 
After completing thsi program in the future I would consider added more interactive elemnts otehr than just hover to allow the user to engage more deeply with the art this could be in the form of extending with audio tones appearing as the user hovers over the page while revealing the various orbs, mouse velocity to nudge circles away from the cursor, and CSS hue-rotate to slowly shift the colour palette over time */

