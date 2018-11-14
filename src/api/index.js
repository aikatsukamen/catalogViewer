import fetchJsonp from 'fetch-jsonp';
import axios from 'axios';
import crypto from 'crypto';

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

// ユーザの存在チェック
function checkExistUser(user, eventName) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`https://script.google.com/macros/s/AKfycbxEKLw4RgwILxojlMBeMfX8VTE7-V6lYwSZRlxOGIsEbH97m40/exec?api=userExist&user=${user}&eventName=${eventName}`, {
      jsonpCallback: 'callback'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.error) {
          resolve({ error: { message: json.error } });
        }
        if (json.isExist) {
          resolve({ error: { message: '既に登録済みのユーザ名です' } });
        }
        resolve({ data: json });
      })
      .catch(error => {
        reject({ error });
      });
  });
}

/**
 * サーバからユーザのデータを取得
 * @param {string} user
 * @param {string} eventName
 * @param {string} pass
 */
function getUserData(user, eventName, pass) {
  const sha512 = crypto.createHash('sha512');
  sha512.update(pass);
  const hashedPass = sha512.digest('hex');

  return new Promise((resolve, reject) => {
    fetchJsonp(`https://script.google.com/macros/s/AKfycbxEKLw4RgwILxojlMBeMfX8VTE7-V6lYwSZRlxOGIsEbH97m40/exec?api=getData&user=${user}&eventName=${eventName}&pass=${hashedPass}`, {
      jsonpCallback: 'callback'
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        if (json.error) {
          resolve({ error: { message: json.error } });
        }
        resolve({ data: JSON.parse(json.data) });
      })
      .catch(error => {
        resolve({ error });
      });
  });
}

/**
 * サーバに保存
 * @param {string} user
 * @param {string} eventName
 * @param {string} pass
 * @param {string} data
 */
function saveData(user, eventName, pass, data) {
  const sha512 = crypto.createHash('sha512');
  sha512.update(pass);
  const hashedPass = sha512.digest('hex');

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'https://script.google.com/macros/s/AKfycbxEKLw4RgwILxojlMBeMfX8VTE7-V6lYwSZRlxOGIsEbH97m40/exec',
      data: {
        user: user,
        eventName: eventName,
        pass: hashedPass,
        data: data
      },
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      }
    })
      .then(function(response) {
        if (response.error) {
          resolve({ error: { message: response.error } });
        }
        resolve({ data: response });
      })
      .catch(function(error) {
        reject({ error: error });
      });
  });
}

export default { getCicleMap, getCicleInfo, checkExistUser, getUserData, saveData };
