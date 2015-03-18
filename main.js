// You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
var renderer = new PIXI.WebGLRenderer(800, 600);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0x000000, true);
var gameContainer = new PIXI.DisplayObjectContainer();
var headContainer = new PIXI.DisplayObjectContainer();
var armContainer = new PIXI.DisplayObjectContainer();

var emitter = new cloudkid.Emitter(
    armContainer,
    [PIXI.Texture.fromImage('particle-images/Snow100.png')],
    {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.01,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#e4f9ff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 200,
            "end": 50
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.2,
            "max": 0.8
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 466,
            "y": 210
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 0
        }
    }
);
var shootEmitter = new cloudkid.Emitter(
    stage,
    [PIXI.Texture.fromImage('particle-images/Snow100.png')],
    {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.01,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#e4f9ff",
            "end": "#3fcbff"
        },
        "speed": {
            "start": 200,
            "end": 100
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "startRotation": {
            "min": -5,
            "max": 5
        },
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 2,
            "max": 3
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 10000,
        "pos": {
            "x": 466,
            "y": 210
        },
        "addAtBack": false,
        "spawnType": "point"
    }
);

var elapsed = Date.now();

var update = function(){

    var now = Date.now();

    emitter.update((now - elapsed) * 0.001);
    shootEmitter.update((now - elapsed) * 0.001);
    elapsed = now;
};

emitter.emit = true;
shootEmitter.emit = false;

var leftArmTexture = PIXI.Texture.fromImage("left_arm.png");
var rightArmTexture = PIXI.Texture.fromImage("right_arm.png");
var robeTexture = PIXI.Texture.fromImage("robe_body.png");
var headTexture = PIXI.Texture.fromImage("head.png");
var staffTexture = PIXI.Texture.fromImage("staff.png");
var eyesTexture = PIXI.Texture.fromImage("eyes_open.png");

var leftArm = new PIXI.Sprite(leftArmTexture);
var rightArm = new PIXI.Sprite(rightArmTexture);
var robe = new PIXI.Sprite(robeTexture);
var head = new PIXI.Sprite(headTexture);
var staff = new PIXI.Sprite(staffTexture);
var eyes = new PIXI.Sprite(eyesTexture);


armContainer.pivot.x = 410;
armContainer.pivot.y = 280;
armContainer.x = 410;
armContainer.y = 280;

headContainer.pivot.x = 400;
headContainer.pivot.y = 225;
headContainer.x = 400;
headContainer.y = 225;
headContainer.rotation = 265 * Math.PI / 180;

leftArm.anchor.x = 0.9;
leftArm.anchor.y = 0.5;
leftArm.position.x = 410;
leftArm.position.y = 280;
leftArm.rotation = Math.PI;

rightArm.anchor.x = 0.9;
rightArm.anchor.y = 0.5;
rightArm.position.x = 400;
rightArm.position.y = 285;

robe.anchor.x = 0.5;
robe.anchor.y = 0.5;
robe.position.x = 400;
robe.position.y = 300;
robe.rotation = 3/2 * Math.PI;

head.anchor.x = 0.5;
head.anchor.y = 0.5;
head.position.x = 400;
head.position.y = 225;

staff.anchor.x = 0.5;
staff.anchor.y = 0.5;
staff.position.x = 466;
staff.position.y = 275;
staff.rotation = 3/2 * Math.PI;

eyes.anchor.x = 0.5;
eyes.anchor.y = 0.5;
eyes.position.x = 385;
eyes.position.y = 240;
eyes.rotation = 100 * Math.PI / 180;


headContainer.addChild(head);
headContainer.addChild(eyes);
armContainer.addChild(leftArm);
armContainer.addChild(staff);
gameContainer.addChild(rightArm);




stage.addChild(armContainer);
stage.addChild(robe);
stage.addChild(headContainer);
stage.addChild(gameContainer);

requestAnimationFrame(animate);

var headContainerDirectionPositive;
var mousePos = {x : renderer.width, y : renderer.height/2};

stage.mouseover = function() {};
stage.mouseout = function(data) {};
stage.mousedown = function() {shootEmitter.emit = true};
stage.mouseup = function() {shootEmitter.emit = false};

function animate() {
    var point = stage.getMousePosition().clone();
    if (point.x > 0 && point.y > 0) {
        mousePos = point;
    }
    var diffX = mousePos.x - leftArm.position.x;
    var diffY = mousePos.y - leftArm.position.y;
    var angle = Math.atan(Math.abs(diffY)/Math.abs(diffX));

    if (diffX >= 0 && diffY >= 0) {
        angle = angle;
    } else if (diffX < 0 && diffY <= 0) {
        angle = Math.PI + angle;
    } else if (diffX < 0 && diffY > 0) {
        angle = Math.PI - angle;
    } else if (diffX >= 0 && diffY < 0) {
        angle = 2 * Math.PI - angle;
    }

    rightArm.rotation = -angle;
    armContainer.rotation = angle;

    var shootPoint = armContainer.toGlobal(new PIXI.Point(466, 210));

    shootEmitter.spawnPos.x = shootPoint.x;
    shootEmitter.spawnPos.y = shootPoint.y;
    shootEmitter.rotate(Math.floor(angle * (180 / Math.PI)));

    if (headContainer.rotation > (270 * Math.PI / 180)) {
        headContainerDirectionPositive = false;
    }

    if (headContainer.rotation < (260 * Math.PI / 180)) {
        headContainerDirectionPositive = true;
    }

    headContainerDirectionPositive ? headContainer.rotation += 0.01 : headContainer.rotation -= 0.01;


    update();

    renderer.render(stage);

    requestAnimationFrame(animate);
}