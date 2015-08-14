function init() {
    tracker1 = initTracker("#example");
    tracking.track("#example .drone", tracker1);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();
    TrackerUtils.startTrackingColors(tracker);

    TrackerUtils.addTrackingColor("#A94A45", "red", tracker);
    TrackerUtils.addTrackingColor("#5EA24E", "green", tracker);
    TrackerUtils.addTrackingColor("#FFFF00","yellow", tracker);

    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        markColors(event.data, element);
    });

    return tracker;
}


function markColors(colors, element) {
    // Do the marking
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, context.width, context.height);

    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output");
    }
}

function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}


function writeRectangle(rect, element) {
    $(element)
        .append("<p>")
        .append(rect.color + ": " + rect.width + "X" + rect.height)
        .append(" @ " + rect.x + ":" + rect.y)
}


window.addEventListener("load", init);
