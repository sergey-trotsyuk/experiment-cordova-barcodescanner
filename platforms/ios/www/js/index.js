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

    const video = document.getElementById('video');
    const mediaConfig = {
      video: true
    };
    const errBack = function(e) {
      console.log('An error has occurred!' + e.message);
    };

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(mediaConfig).then((stream) => {
        console.log('Got stream from standard API!: ' + typeof stream);
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }).catch(errBack);
    } else if (navigator.getUserMedia) { // Standard
      navigator.getUserMedia(mediaConfig, (stream) => {
        console.log('Got stream from legacy API!: ' + typeof stream);
        video.src = stream;
        video.play();
      }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
      navigator.webkitGetUserMedia(mediaConfig, function(stream) {
        console.log('Got stream from webkit API!: ' + typeof stream);
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
      }, errBack);
    } else if (window.cordova && cordova.plugins && cordova.plugins.iosrtc && cordova.plugins.iosrtc.getUserMedia) { // IOS RTC Plugin
      cordova.plugins.iosrtc.getUserMedia(mediaConfig).then((stream) => {
        console.log('Got stream from iosrtc plugin!: ' + typeof stream);
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }).catch(errBack);
    } else {
      console.log('No user media!');
    }
  }
};

app.initialize();
