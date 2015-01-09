var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function smallImageSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function largeImageSuccess(imageData) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(smallImageSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(largeImageSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}