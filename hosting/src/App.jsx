import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getValue, getRemoteConfig, fetchAndActivate} from "firebase/remote-config";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk-u6F9UAesAwj7NQh80Rlr-AHc69UtOY",
  authDomain: "rc-strawberry.firebaseapp.com",
  projectId: "rc-strawberry",
  storageBucket: "rc-strawberry.appspot.com",
  messagingSenderId: "105225960024",
  appId: "1:105225960024:web:a2c70ff84e835a7d22682d"
};

function App() {

  // window.FIREBASE_REMOTE_CONFIG_URL_BASE = "http://127.0.0.1:9399/"

  const app = initializeApp(firebaseConfig);
  // const remoteConfig = getRemotonfig(app);

  const [configs, setConfigs] = useState({
    "welcome_message": "",
    "welcome_message_caps": "",
    "header_text": ""
  })

  function getConfigs () {
    // fetchAndActivate(remoteConfig)
    // .then(async () => {
    //   console.log(remoteConfig, "?");
    //   const welcome_message = getValue(remoteConfig, "welcome_message");
    //   console.log("welcome_message", welcome_message);
    //   const welcome_message_caps = await getValue(remoteConfig, "welcome_message_caps")._value;
    //   const header_text = await getValue(remoteConfig, "header_text")._value;
    //   setConfigs({...configs, welcome_message: welcome_message, welcome_message_caps: welcome_message_caps, header_text: header_text})
    //   console.log("Configs: " + JSON.stringify(configs))
    // });
    const options = {
      headers: {
      }
    };
    fetch("http://127.0.0.1:9399/v1/projects/rc-strawberry/remoteConfig?clientType=emulator", options)
    .then( res => res.json() )
    .then( data => {
      setConfigs({
        ...configs,
        welcome_message: data.parameters.welcome_message.defaultValue.value,
        welcome_message_caps: data.parameters.welcome_message_caps.defaultValue.value,
        header_text: data.parameters.header_text.defaultValue.value,
      })
      console.log("configs", configs, data)
    } );
    
  }


  return (
    <div className="App">
      <h3>Welcome Message: {configs.welcome_message}</h3>
      <h3>Welcome Message Caps: {configs.welcome_message_caps}</h3>
      <h3>Header Text: {configs.header_text}</h3>
      <div className="card">
        <button onClick={async () => await getConfigs()}>
          Update
        </button>
        <p>
          {}
        </p>
      </div>
    </div>
  )
}

export default App
