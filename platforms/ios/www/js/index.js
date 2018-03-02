const toUpperCaseFirst = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const app = {
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady() {
    console.log('Device is ready!');
    this.init();
  },

  init() {
    console.log('Init...');
    const initName = `init${toUpperCaseFirst(device.platform)}`;
    if (!this[initName]) {
      throw new Error(`No init function "${initName}" for platform "${device.platform}"`);
    }

    this[initName]();
  },

  initIOS() {
    console.log('iOS!');

    this.onWebRTCReady();
  },

  initAndroid() {
    console.log('Android!');

    cordova.plugins.permissions.requestPermission(
      cordova.plugins.permissions.CAMERA,
      (result) => {
        console.log('Permission success', result);
        if (result.hasPermission) {
          this.onWebRTCReady();
        }
      }, (error) => {
        console.log('Permission error', error);
      }
    );
  },

  onWebRTCReady() {
    console.log('WebRTC is ready!');

    // const video = document.getElementById('video');
    //
    // video.addEventListener('abort', function (arg) { console.log('!!! simple video event abort', arg); });
    // video.addEventListener('canplay', function (arg) { console.log('!!! simple video event canplay', arg); });
    // video.addEventListener('canplaythrough', function (arg) { console.log('!!! simple video event canplaythrough', arg); });
    // video.addEventListener('durationchange', function (arg) { console.log('!!! simple video event durationchange', arg); });
    // video.addEventListener('emptied', function (arg) { console.log('!!! simple video event emptied', arg); });
    // video.addEventListener('encrypted', function (arg) { console.log('!!! simple video event encrypted', arg); });
    // video.addEventListener('ended', function (arg) { console.log('!!! simple video event ended', arg); });
    // video.addEventListener('error', function (arg) { console.log('!!! simple video event error', arg); });
    // video.addEventListener('interruptbegin', function (arg) { console.log('!!! simple video event interruptbegin', arg); });
    // video.addEventListener('interruptend', function (arg) { console.log('!!! simple video event interruptend', arg); });
    // video.addEventListener('loadeddata', function (arg) { console.log('!!! simple video event loadeddata', arg); });
    // video.addEventListener('loadedmetadata', function (arg) { console.log('!!! simple video event loadedmetadata', arg); });
    // video.addEventListener('loadstart', function (arg) { console.log('!!! simple video event loadstart', arg); });
    // video.addEventListener('mozaudioavailable', function (arg) { console.log('!!! simple video event mozaudioavailable', arg); });
    // video.addEventListener('pause', function (arg) { console.log('!!! simple video event pause', arg); });
    // video.addEventListener('play', function (arg) { console.log('!!! simple video event play', arg); });
    // video.addEventListener('playing', function (arg) { console.log('!!! simple video event playing', arg); });
    // video.addEventListener('progress', function (arg) { console.log('!!! simple video event progress', arg); });
    // video.addEventListener('ratechange', function (arg) { console.log('!!! simple video event ratechange', arg); });
    // video.addEventListener('seeked', function (arg) { console.log('!!! simple video event seeked', arg); });
    // video.addEventListener('seeking', function (arg) { console.log('!!! simple video event seeking', arg); });
    // video.addEventListener('stalled', function (arg) { console.log('!!! simple video event stalled', arg); });
    // video.addEventListener('suspend', function (arg) { console.log('!!! simple video event suspend', arg); });
    // video.addEventListener('timeupdate', function (arg) { console.log('!!! simple video event timeupdate', arg); });
    // video.addEventListener('volumechange', function (arg) { console.log('!!! simple video event volumechange', arg); });
    // video.addEventListener('waiting', function (arg) { console.log('!!! simple video event waiting', arg); });
    //
    // const mediaConfig = {
    //   video: true
    // };
    // const errBack = function(e) {
    //   console.log('An error has occurred!' + e.message);
    // };
    //
    // // Put video listeners into place
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia(mediaConfig).then((stream) => {
    //     console.log('Got stream from standard API!: ' + typeof stream);
    //     video.src = window.URL.createObjectURL(stream);
    //     video.play();
    //   }).catch(errBack);
    // } else if (navigator.getUserMedia) { // Standard
    //   navigator.getUserMedia(mediaConfig, (stream) => {
    //     console.log('Got stream from legacy API!: ' + typeof stream);
    //     video.src = stream;
    //     video.play();
    //   }, errBack);
    // } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    //   navigator.webkitGetUserMedia(mediaConfig, function(stream) {
    //     console.log('Got stream from webkit API!: ' + typeof stream);
    //     video.src = window.webkitURL.createObjectURL(stream);
    //     video.play();
    //   }, errBack);
    // } else if (window.cordova && cordova.plugins && cordova.plugins.iosrtc && cordova.plugins.iosrtc.getUserMedia) { // IOS RTC Plugin
    //   cordova.plugins.iosrtc.getUserMedia(mediaConfig).then((stream) => {
    //     console.log('Got stream from iosrtc plugin!: ' + typeof stream);
    //     video.src = window.URL.createObjectURL(stream);
    //     video.play();
    //   }).catch(errBack);
    // } else {
    //   console.log('No user media!');
    // }

    // navigator.mediaDevices = navigator.mediaDevices || cordova.plugins.iosrtc;

    // console.error = console.log;
    // console.log("Initialization Quagga");
    // try {
    //   Quagga.init({
    //       // numOfWorkers: 0,
    //       // locator: {
    //       //     patchSize: "medium",
    //       //     halfSample: true
    //       // },
    //       // locate: true,
    //       // frequency: 10,
    //       numOfWorkers: 0,
    //       inputStream : {
    //           name : "Live",
    //           type : "LiveStream",
    //           target: document.querySelector('#scanner'),
    //           constraints: {
    //             deviceId: 'com.apple.avfoundation.avcapturedevice.built-in_video:0',
    //               // facingMode: "environment"
    //           }
    //       },
    //       locator: {
    //           patchSize: "medium",
    //           halfSample: true
    //       },
    //       locate: true,
    //       decoder : {
    //           // readers : ["ean_reader"]
    //           readers : [
    //             "code_128_reader",
    //             "ean_reader",
    //             "ean_8_reader",
    //             "code_39_reader",
    //             "code_39_vin_reader",
    //             "codabar_reader",
    //             "upc_reader",
    //             "upc_e_reader",
    //             "i2of5_reader",
    //             "2of5_reader",
    //             "code_93_reader"
    //           ]
    //       }
    //   }, (err) => {
    //       if (err) {
    //           console.log('Err!', err);
    //           return;
    //       }
    //
    //       console.log("Initialization finished. Ready to start");
    //
    //
    //       Quagga.onProcessed(function(data) {
    //         console.log('!!! onProcessed', data);
    //       });
    //       Quagga.onDetected(function(data) {
    //           console.log('!!! onDetected', data);
    //           Quagga.offDetected();
    //           document.querySelector('#scanner').innerHTML  = JSON.stringify(data.codeResult);
    //       });
    //       Quagga.start();
    //   });
    // } catch (e) {
    //   console.log("Initialization Quagga Error", e);
    // }

    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
  }
};

app.initialize();
