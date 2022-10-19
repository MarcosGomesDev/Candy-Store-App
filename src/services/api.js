import axios from 'axios';

const URL = 'http://192.168.220.254:3003'


async function getProducts() {
    const response = await axios.get(`${URL}/products`)

    return response.data
}

async function loginUser(email, password) {
  const response = await axios.post(`${URL}/sign-in/user`, {email, password})

  const userInfo = {
    id: response.data.user._id,
    name: response.data.user.name,
    email: response.data.user.email,
    avatar:
      response.data.user.avatar ??
      'https://res.cloudinary.com/gomesdev/image/upload/v1649718658/avatar_ip9qyt.png',
    seller: response.data.user.seller,
    token: response.data.token,
  };

  await storeData(userInfo);
  setLoad(false);
  setProfile(userInfo);
  setIsLoggedIn(true);

  return response.data
}

async function registerUser(name, email, password) {
  const response = await axios.post(`${URL}/sign-up/user`, {name, email, password})

  return response.data
}

async function userForgotPassword(email) {
  const response = await axios.post(`${URL}/user/forgot-password`, {email});

  return response.data
}

async function verifyUserTokenPasswordReset(email, token) {
  const response = await axios.post(`${URL}/verify-token`, {params: {email: email}}, {token: token})

  return response.data
}

async function userResetPassword(token, password) {
  const response = await axios.post(`${URL}/user/reset-password`, {params: {token: token}}, {password})

  return response.data
}

async function uploadImageUserProfile(data, token) {
  const response = await fetch(`${URL}/user/upload-profile`, {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
    body: data
  })

  return response.data
}

async function addComment(id, token) {
  const response = await axios.post(`${URL}//product/${id}/rating`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return response.data
}

async function removeComment(id, token) {
  const response = await axios.delete(`${URL}/product/${id}/rating/delete`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return response.data
}

async function getFavorites(token) {
  const response = await axios.get(`${URL}/user/favorites`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data
}

async function addFavorites(id) {
  const response = await axios.post(
    `/user/${id}/favorites/new/${item}`,
  );

  return response.data
}

async function removeFavorites(id, token) {
  const response = await axios.delete(`${URL}/user/favorites/delete`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    params: {
      productId: id,
    },
  });

  return response.data
}

async function loginSeller(email, password) {
  const response = await axios.post(`${URL}/sign-in/seller`, {email, password});

  return response.data
}

async function registerSeller() {
  const response = await axios.post(`${URL}/sign-up/seller`, {data})

  response.data
}

async function sellerForgotPassword(email) {
  const response = await axios.post(`${URL}/seller/forgot-password`, {email});

  return response.data
}

async function verifySellerTokenPasswordReset(email, token) {
  const response = await axios.post(`${URL}/seller/verify-token`, {params: {email: email}}, {token: token})

  return response.data
}

async function sellerResetPassword(token, password) {
  const response = await axios.post(`${URL}/seller/reset-password`, {params: {token: token}}, {password})

  return response.data
}

async function uploadImageSellerProfile(data, token) {
  const response = await fetch(`${URL}/seller/upload-profile`, {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    },
    body: data
  })

  return response.data
}

async function addReplyComment(id, ratingId) {
  const response = await axios.post(`${URL}/product/:id/rating/:ratingId`, {
    params: {
      id: id,
      ratingId: ratingId
    }
  })

  return response.data
}

async function deleteReplyComment() {
  const response = await axios.delete(`${URL}//product/:id/rating/:ratingId`, {
    params: {
      id: id,
      ratingId: ratingId
    }
  })

  return response.data
}

async function addProduct(product, token) {
  const data = new FormData();
    Object.keys(product).forEach(key => {
      if (key === 'images') {
        for (let i = 0; i < product[key].length; i++) {
          data.append('images', {
            name: new Date() + 'product',
            uri: product[key][i].uri,
            type: product[key][i].type,
          });
        }
      } else {
        data.append(key, product[key]);
      }
    });

    const response = await fetch(`${URL}/product/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return response.data
}

async function editProduct(product, token) {

  const exist = product.images[0].hasOwnProperty('type')

  const data = new FormData();
  
  Object.keys(product).forEach(key => {
      if (key === 'images') {
          for (let i = 0; i < product[key].length; i++) {
              if(exist === true) {
                  data.append('images', {
                      name: new Date() + 'product',
                      uri: product[key][i].uri,
                      type: product[key][i].type,
                  });
              } else {
                  data.append('images', product[key][i])
              }
          }
      } else {
          data.append(key, product[key]);
      }
  });

  const response = await fetch(`${URL}/product/${product._id}/update`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
      },
      body: data,
  });

  return response.data
}

async function deleteProduct(id, token) {
  const response = await axios.delete(`/product/${id}/delete`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return response.data
}

export const api = {
  getProducts,
  loginUser,
  registerUser,
  uploadImageUserProfile,
  userForgotPassword,
  verifyUserTokenPasswordReset,
  userResetPassword,
  addComment,
  removeComment,
  getFavorites,
  addFavorites,
  removeFavorites,
  loginSeller,
  registerSeller,
  sellerForgotPassword,
  verifySellerTokenPasswordReset,
  sellerResetPassword,
  uploadImageSellerProfile,
  addReplyComment,
  deleteReplyComment,
  addProduct,
  editProduct,
  deleteProduct,
}
