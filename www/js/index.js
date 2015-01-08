var pictureSource;   // picture source
var destinationType; // sets the format of returned value
// The watch id references the current `watchAcceleration`
var watchID = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    startWatch();
}

// Start watching the acceleration
//
function startWatch() {

    // Update acceleration every 3 seconds
    var options = { frequency: 3000 };

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

// Stop watching the acceleration
//
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

// onSuccess: Get a snapshot of the current acceleration
//
function onSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x         + '<br />' +
    'Acceleration Y: ' + acceleration.y         + '<br />' +
    'Acceleration Z: ' + acceleration.z         + '<br />' +
    'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}


// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}
