import 'rtcmulticonnection-v3/dist/RTCMultiConnection.min';

const createWebRTC = () => {
  const connection = new window.RTCMultiConnection();
  // for live broadcast
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.session = {
    audio: false,
    video: true,
    data: false,
  };
  connection.socketMessageEvent = 'video-broadcast';

  connection.session.broadcast = false;
  connection.session.oneway = true;

  connection.onstream = (event) => {
    // main-broadcast will be the id to which video will be streamed
    connection.mainContainer = document.getElementById('main-broadcast');
    connection.mainContainer.src = event.blobURL;
    connection.mainContainer.muted = false;
  };

  return connection;
};

export default createWebRTC;
