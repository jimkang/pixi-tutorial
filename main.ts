import { Rectangle, Sprite, Loader, Application, utils } from 'pixi.js';

utils.sayHello('wot');

Loader.shared
  .add('overworld', 'images/Overworld.png')
  .load(setup);
// TODO: Error handling?
// TODO: Is it really necessary to load images at runtime? Can I just build them into the bundle?

function setup() {
  var texture = utils.TextureCache['overworld'];
  var rect = new Rectangle(8 * 16, 0, 16, 16);
  texture.frame = rect;
  var stairsDown = new Sprite(texture);
  stairsDown.x = 64;
  stairsDown.y = 64;

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
}
