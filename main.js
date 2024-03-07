import { initializeApp } from "firebase/app";
import { getDatabase, ref, set  } from "firebase/database";
requere('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "pulsaid-ffc8b",
  storageBucket: "pulsaid-ffc8b.appspot.com",
  messagingSenderId: "702454418249",
  appId: "1:702454418249:web:75add6e53c768712ba6898",
  databaseURL: "https://pulsaid-ffc8b-default-rtdb.firebaseio.com/",
};




  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  let emergencyId
  let longitude
  let latitude
  let extraInfo



  document.querySelector('.submit').addEventListener('click', (e) => {
    let d = new Date();
    let timestamp = d.toString();
    e.preventDefault();
    //set emergecyId to the value of the date and time with milliseconds to make it unique
    emergencyId = d.getMilliseconds() +  d.getMinutes() + d.getHours() + d.getDate() + d.getMonth() + d.getFullYear();
    longitude = document.querySelector('input[name="longitude"]').value;
    latitude = document.querySelector('input[name="latitude"]').value;
    extraInfo = document.querySelector('textarea[name="info"').value;
    writeEmergencyData(emergencyId, longitude, latitude, timestamp, extraInfo);
  });



  function writeEmergencyData(emergencyId, longitude, latitude, timestamp, extraInfo) {
    const db = getDatabase();
    set(ref(db, 'emergency/' + emergencyId), {
        longitude: longitude,
        latitude: latitude,
        timestamp: timestamp,
        extraInfo: extraInfo
    });
  }