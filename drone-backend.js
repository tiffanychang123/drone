var Cylon = require('cylon');
var bot;
var utils = require('./utils/droneUtils.js');
<a class="co" id="co_flying_with_computer_vision_CO1-1" href="#callout_flying_with_computer_vision_CO1-1"><img src="callouts/1.png" alt="1"/></a>

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
    <a class="co" id="co_flying_with_computer_vision_CO2-1" href="#callout_flying_with_computer_vision_CO2-1"><img src="callouts/1.png" alt="1"/></a>
        .on("data", utils.sendFrame);
    a class="co" id="co_flying_with_computer_vision_CO2-2" href="#callout_flying_with_computer_vision_CO2-2"><img src="callouts/2.png" alt="2"/></a>

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

Cylon.start();