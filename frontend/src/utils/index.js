import React        from 'react';
import fetch        from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

const URL_API = 'http://localhost:8000'

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders() {
  const authToken = localStorage.getItem('access_token');

  return { ...defaultHeaders, Authorization: authToken };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.error.message);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export function httpGet(url) {

  return fetch(URL_API + url, {
    headers: buildHeaders()
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(URL_API + url, {
    method: 'post',
    headers: buildHeaders(),
    body: body,
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpDelete(url, id) {

  return fetch(`${URL_API}${url}/${id}` , {
    method: 'delete',
    headers: buildHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
}

export function httpPut(url, id, data) {
  const body = JSON.stringify(data);
  return fetch(`${URL_API}/${url}/${id}`, {
    method: 'put',
    headers: buildHeaders(),
    body
  })
  .then(checkStatus)
  .then(parseJSON)
}

export function setDocumentTitle(title) {
  document.title = `${title} | Time Managment`;
}

export function renderErrorsFor(errors, ref) {
  if (!errors) return false;

  return errors.map((error, i) => {
    if (error[ref]) {
      return (
        <div key={i} className="error">
          {error[ref]}
        </div>
      );
    }
  });
}