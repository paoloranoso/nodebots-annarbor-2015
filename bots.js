var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function () {
	//led stuff
	// var led = new five.Led(13);

	// this.repl.inject({
	// led: led
	// });


    var wheels = {
        left: new five.Servo({ pin: 9, type: 'continuous' }),
        right: new five.Servo({ pin: 10, type: 'continuous' }),
        stop: function () {
            wheels.left.center();
            wheels.right.center();
        },
        forward: function () {
            wheels.left.ccw(0.1);
            wheels.right.cw(0.1);
            console.log("goForward");
        },
        pivotLeft: function () {
            wheels.left.cw(0.1);
            wheels.right.cw(0.1);
            console.log("turnLeft");
        },
        pivotRight: function () {
            wheels.left.ccw(0.1);
            wheels.right.ccw(0.1);
            console.log("turnRight");
        },
        back: function () {
            wheels.left.cw(0.1);
            wheels.right.ccw(0.1);
        }
    };
    
    wheels.stop();
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");
    
    stdin.on("keypress", function(chunk, key) {
        if (!key) return;
        
        switch (key.name) {
        case 'up':
        case 'w':
            wheels.forward();
            break;
            
        case 'down':
        case 's':
            wheels.back();
            break;
            
        case 'left':
        case 'a':
            wheels.pivotLeft();
            break;
            
        case 'right':
        case 'd':
            wheels.pivotRight();
            break;
            
        case 'space':
        case 'escape':
            wheels.stop();
            break;
        }
    });
});