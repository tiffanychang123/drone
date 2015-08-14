var Cylon = require('cylon');
var bot;
var utils = require('./utils/droneUtils.js');

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })

    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);
    
// Fly the bot


function fly(robot) {
    bot = robot;


    bot.drone.getPngStream()

        .on("data", utils.sendFrame);


    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (data > 1.5) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });

    // Disable emergency setting if there was any
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(3*1000, function() {
        bot.drone.forward(0.2);
    })
    after(6*1000, function() {
        bot.drone.left(0.2);
    })
    after(9*1000, function() {
        bot.drone.back(0.2);
    })
    after(12*1000, function() {
        bot.drone.right(0.2);
    })
    after(14*1000, function() {
        bot.drone.land(0.1);
    });
    after(16*1000, function() {
        bot.drone.stop();
    });
    }
function moveDrone(move) {
    console.log("received", move);
    if (move.left) {
        console.log("Moving left");
        bot.drone.left(0.2);
        bot.drone.forward(0);
        after(0.5*1000, function() {
            bot.drone.left(0);
            bot.drone.forward(0.05);
        });
    }

    if (move.right) {
        console.log("Moving right");
        bot.drone.right(0.2);
        bot.drone.forward(0);
        after(0.5*1000, function() {
            bot.drone.right(0);
            bot.drone.forward(0.05);
        });
    }
}
Cylon.start();