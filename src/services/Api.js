
import { DOMAIN } from '../../constants'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';

export const loginApi = (username, password) => {
  return new Promise((resolve, reject) => {
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
  let url = new URL(DOMAIN + 'product-info/');
  Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(url, {
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
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'product-info/' + data.id, {
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
  let url = new URL(DOMAIN + 'manufacturer/');
  Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(url, {
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
export const getProducers = () => {
  let url = new URL(DOMAIN + 'manufacturer/');
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(url, {
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
        reject(err);
      })
  })
}
export const getProducerById = (data) => {
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'manufacturer/' + data.id, {
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
export const deleteProducerById = (data) => {
  let d = {
    is_enable: false,
    user: data.user
  }
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'manufacturer/' + data.id+'/', {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      method: 'PUT',
      body: JSON.stringify(d)
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
export const createProducer = ({ image, ...data }) => {
  const formData = new FormData();
  for (const name in data) {
    console.log(name);
    formData.append(name, data[name]);
  }

  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    if (image && image !== "") {
      fetch(image)
        .then(res => res.blob())
        .then(blob => {
          const type = image.split(';')[0].split('/')[1];
          formData.append("image", blob, uuidv4() + '.' + type)
          fetch(DOMAIN + 'manufacturer/', {
            headers: {
              "Authorization": token
            },
            method: 'POST',
            body: formData
          })
            .then((res) => {
              return res.json();
            })
            .then(res => {
              console.log("response: ", res);
              console.log('=================formData===================');
              console.log(JSON.stringify(formData));
              for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
              }
              resolve(res);
            })
            .catch(err => {
              console.log('====================================');
              console.log(err);
              console.log('====================================');
              reject(err);
            })
        })
    } else {
      fetch(DOMAIN + 'manufacturer/', {
        headers: {
          "Authorization": token
        },
        method: 'POST',
        body: formData
      })
        .then((res) => {
          return res.json();
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
          reject(err);
        })
    }
  })
}

export const updateProducer = ({ image, ...data }) => {
  const formData = new FormData();
  for (const name in data) {
    console.log(name);
    if (name !== 'id') {
      formData.append(name, data[name]);
    }
  }
  if(image){
    if(image.startsWith("http")){
      image = "";
    }
  }
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    if (image && image !== "") {
        fetch(image)
          .then(res => res.blob())
          .then(blob => {
            const type = image.split(';')[0].split('/')[1];
            formData.append("image", blob, uuidv4() + '.' + type)
            fetch(DOMAIN + 'manufacturer/' + data.id+'/', {
              headers: {
                "Authorization": token,
              },
              method: 'PUT',
              body: formData
            })
              .then((res) => {
                return res.json();
              })
              .then(res => {
                console.log("response: ", res);
                console.log('=================formData===================');
                console.log(JSON.stringify(formData));
                for (var key of formData.entries()) {
                  console.log(key[0] + ', ' + key[1]);
                }
                resolve(res);
              })
              .catch(err => {
                console.log('=================getProducerById===================');
                console.log(err);
                console.log('====================================');
                reject(err);
              })
          })
    } else {
      fetch(DOMAIN + 'manufacturer/'+data.id+'/', {
        headers: {
          "Authorization": token,
        },
        method: 'PUT',
        body: formData
      })
        .then((res) => {
          return res.json();
        })
        .then(res => {
          console.log('====================================');
          console.log("text: ", res);
          console.log('====================================');
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          console.log('====================================');
          reject(err);
        })
    }
  })
}
export const uploadImage = (data) => {
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'image-path/', {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      method: 'POST',
      body: JSON.stringify(data)
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

export const createProduct = ({ image, ...data }) => {
  const formData = new FormData();
  for (const name in data) {
    console.log(name);
    formData.append(name, data[name]);
  }

  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    if (image && image !== "") {
      fetch(image)
        .then(res => res.blob())
        .then(blob => {
          const type = image.split(';')[0].split('/')[1];
          formData.append("image", blob, uuidv4() + '.' + type)
          fetch(DOMAIN + 'product-info/', {
            headers: {
              "Authorization": token
            },
            method: 'POST',
            body: formData
          })
            .then((res) => {
              return res.json();
            })
            .then(res => {
              console.log("response: ", res);
              console.log('=================formData===================');
              console.log(JSON.stringify(formData));
              for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
              }
              resolve(res);
            })
            .catch(err => {
              console.log('====================================');
              console.log(err);
              console.log('====================================');
              reject(err);
            })
        })
    } else {
      fetch(DOMAIN + 'product-info/', {
        headers: {
          "Authorization": token
        },
        method: 'POST',
        body: formData
      })
        .then((res) => {
          return res.json();
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
          reject(err);
        })
    }
  })
}

export const updateProduct = ({ image, ...data }) => {
  const formData = new FormData();
  for (const name in data) {
    console.log(name);
    if (name !== 'id') {
      formData.append(name, data[name]);
    }
  }
  if(image){
    if(image.startsWith("http")){
      image = "";
    }
  }
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    if (image && image !== "") {
        fetch(image)
          .then(res => res.blob())
          .then(blob => {
            const type = image.split(';')[0].split('/')[1];
            formData.append("image", blob, uuidv4() + '.' + type)
            fetch(DOMAIN + 'product-info/' + data.id+'/', {
              headers: {
                "Authorization": token,
              },
              method: 'PUT',
              body: formData
            })
              .then((res) => {
                return res.json();
              })
              .then(res => {
                console.log("response: ", res);
                console.log('=================formData===================');
                console.log(JSON.stringify(formData));
                for (var key of formData.entries()) {
                  console.log(key[0] + ', ' + key[1]);
                }
                resolve(res);
              })
              .catch(err => {
                console.log('=================getProducerById===================');
                console.log(err);
                console.log('====================================');
                reject(err);
              })
          })
    } else {
      fetch(DOMAIN + 'product-info/'+data.id+'/', {
        headers: {
          "Authorization": token,
        },
        method: 'PUT',
        body: formData
      })
        .then((res) => {
          return res.json();
        })
        .then(res => {
          console.log('====================================');
          console.log("text: ", res);
          console.log('====================================');
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          console.log('====================================');
          reject(err);
        })
    }
  })
}

export const deleteProductById = (data) => {
  let d = {
    is_enable: false,
    user: data.user
  }
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'product-info/' + data.id+'/', {
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      method: 'PUT',
      body: JSON.stringify(d)
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

export const getMyInfo = () => {
  return new Promise((resolve, reject) => {
    let token = Cookies.get('token');
    fetch(DOMAIN + 'city/', {
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
        console.log('=================error===================');
        console.log(err);
        console.log('====================================');
        reject(err);
      })
  })
}