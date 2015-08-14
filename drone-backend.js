var Cylon = require('cylon');
var bot;

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

    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data) {
        // console.log(data);
    });

    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        // Drone is higher than 1.5 meters up
        if (altitude > 1.5) {
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
    after(7*1000, function() {
        bot.drone.left(0.2);
    })
    after(14*1000, function() {
        bot.drone.left(0.2);
    })


    after(20*1000, function() {
        bot.drone.left(0.2);
    })
    after(27*1000, function() {
        bot.drone.leftt(0.2);
    })
    after(31*1000, function() {
        bot.drone.land(0.1);
    });
    after(34*1000, function() {
        bot.drone.stop();
    });
    }

Cylon.start();