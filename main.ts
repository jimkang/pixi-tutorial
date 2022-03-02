import { Rectangle, Sprite, Loader, Application, utils } from 'pixi.js';
import StrokeRouter from 'strokerouter';

utils.sayHello('wot');

Loader.shared
  .add('overworld', 'images/Overworld.png')
  .load(setup);
// TODO: Error handling?
// TODO: Is it really necessary to load images at runtime? Can I just build them into the bundle?

var stairsDown;

function setup() {
  // TODO: Texture atlas.
  var texture = utils.TextureCache['overworld'];
  var rect = new Rectangle(8 * 16, 0, 16, 16);
  texture.frame = rect;
  stairsDown = new Sprite(texture);
  stairsDown.x = 64;
  stairsDown.y = 64;

  var docStrokeRouter = StrokeRouter(document);
  docStrokeRouter.routeKeyUp('h', null, () => move(-1, 0));
  docStrokeRouter.routeKeyUp('j', null, () => move(1, 0));
  docStrokeRouter.routeKeyUp('k', null, () => move(0, -1));
  docStrokeRouter.routeKeyUp('l', null, () => move(0, 1));
  document.addEventListener('keyup', docStrokeRouter.onKeyUp);
 
  var app = new Application({
    width: 800,
    height: 600,
    antialias: false,
    transparent: false,
    resolution: 1
  });

  app.stage.addChild(stairsDown);
  app.renderer.render(app.stage);

  document.body.append(app.view);

  stairsDown.vx = 0;
  stairsDown.vy = 0;

  app.ticker.add(gameLoop);

  function move(x: number, y: number) {
    stairsDown.vx += x;
    stairsDown.vy += y;
  }
}

function gameLoop(delta: number) {
  stairsDown.x += stairsDown.vx * (1.0 + delta);
  stairsDown.y += stairsDown.vy * (1.0 + delta);
}

