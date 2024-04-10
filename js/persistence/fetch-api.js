const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const endpoints = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const methods = {
  GET: 'GET',
  POST: 'POST',
};

const errorDescriptions = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Ошибка загрузки файла',
};

function load(endpoint, errorDescription, method = methods.GET, body = null) {
  return fetch(`${BASE_URL}${endpoint}`, {method, body})
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(errorDescription);
    })
    .catch(() => {
      throw new Error(errorDescription);
    });
}

function getData() {
  return load(endpoints.GET_DATA, errorDescriptions.GET_DATA);
}

function sendData(body) {
  return load(endpoints.SEND_DATA, errorDescriptions.SEND_DATA, methods.POST, body);
}

export { getData, sendData };
