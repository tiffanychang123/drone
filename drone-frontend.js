function init() {
    tracker = initTracker("#example");
    tracking.track("#example .drone", tracker);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();
    
    TrackerUtils.startTrackingColors(tracker);

    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        console.log(event.data);
    });

    return tracker;
}


function markColors(colors, element) {
    // Do the marking
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');
}

window.addEventListener("load", init);
