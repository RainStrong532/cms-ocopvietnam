
import {DOMAIN} from '../../constants'
import Cookies from 'js-cookie'

export const loginApi = (username, password) => {
    return new Promise((resolve, reject)=> {
        fetch(DOMAIN + 'authen-token/', {
          headers: { "Content-type": "application/json" },
          method: 'POST',
          body: JSON.stringify({ username, password })
        })
          .then((res) => {
            return res.json();
          })
          .then(res => {
            console.log("response: ", res);
            resolve(res);
          })
          .catch(err => {
            console.log('=================Login error===================');
            console.log(err);
            console.log('====================================');
            reject(err);
          })
        })
}

export const getListProduct = (data) => {
  return new Promise((resolve, reject)=> {
    let token =  Cookies.get('token');
    fetch(DOMAIN + 'product-info/', {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
    },
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(res => {
        console.log("response: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log('=================Login error===================');
        console.log(err);
        console.log('====================================');
        reject(err);
      })
    })
}

export const getProductById = (data) => {
  return new Promise((resolve, reject)=> {
    let token =  Cookies.get('token');
    fetch(DOMAIN + 'product-info/'+data.id, {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
    },
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(res => {
        console.log("response: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log('=================getProductById===================');
        console.log(err);
        console.log('====================================');
        reject(err);
      })
    })
}

export const getListProducer = (data) => {
  return new Promise((resolve, reject)=> {
    let token =  Cookies.get('token');
    fetch(DOMAIN + 'manufacturer/', {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
    },
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(res => {
        console.log("response: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log('=================Login error===================');
        console.log(err);
        console.log('====================================');
        reject(err);
      })
    })
}

export const getProducerById = (data) => {
  return new Promise((resolve, reject)=> {
    let token =  Cookies.get('token');
    fetch(DOMAIN + 'manufacturer/'+data.id, {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
    },
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then(res => {
        console.log("response: ", res);
        resolve(res);
      })
      .catch(err => {
        console.log('=================getProducerById===================');
        console.log(err);
        console.log('====================================');
        reject(err);
      })
    })
}