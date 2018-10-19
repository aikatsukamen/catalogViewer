import fetchJsonp from 'fetch-jsonp';

// サークル配置をGETする
function getCicleMap(eventName) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`https://script.google.com/macros/s/AKfycbxJsiEfAMYurvZAYL4gbfkCfKTcO8Atq6THLfXeCJoTFbP2URc/exec?eventName=${eventName}`, {
      jsonpCallback: 'callback'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve({ data: json });
      })
      .catch(error => {
        reject({ error });
      });
  });
}

// サークル配置をGETする
function getCicleInfo(eventName) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`https://script.google.com/macros/s/AKfycbxDERIBmHAf4XBa6aM3_Tf3Rl9e-2Dpk-IJupwOXUWdf3xGBAw/exec?eventName=${eventName}`, {
      jsonpCallback: 'callback'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        resolve({ data: json });
      })
      .catch(error => {
        reject({ error });
      });
  });
}

export default { getCicleMap, getCicleInfo };
