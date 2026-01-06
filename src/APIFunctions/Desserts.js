import { ApiResponse } from './ApiResponses';

// if you are running the website with `sce run c`
// change the below string to:
// http://localhost:8080/api
const DESERTS_API_URL = 'http://localhost:8080/api';

export async function getAllDesserts() {
  let status = new ApiResponse();
  try {
    const res = await fetch(DESERTS_API_URL + '/Desserts/getDesserts')
    if (res.ok) {
      status.responseData = await res.json();
    } else {
      status.error = true;
    }
  } catch (err) {
    status.responseData = err;
    status.error = true;
  }
  return status;
}

// export async function createDessert(newDessert, token) {
//   let status = new ApiResponse();
//   await axios.post(DESERTS_API_URL + '/Desserts/createDessert',
//     newDessert,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).catch(err => {
//       status.error = true;
//       status.responseData = err;
//     });
//   return status;
// }

export async function createDessert(newDessert, token) {
  let status = new ApiResponse();
  try {
    const response = await fetch(`${DESERTS_API_URL}/Desserts/createDessert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newDessert)
    });
    if (!response.ok) {
      status.error = true;
      status.responseData = await response.json();
    } else {
      status.responseData = await response.json();
    }
  } catch (err) {
    status.error = true;
    status.responseData = err;
  }
  
  return status;
}


export async function editDessert(dessert, token) {
  let status = new ApiResponse();
  try {
    const response = await fetch(`${DESERTS_API_URL}/Desserts/editDessert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dessert)
    });
    if (!response.ok) {
      status.error = true;
      status.responseData = await response.json();
    } else {
      status.responseData = await response.json();
    }
  } catch (err) {
    status.error = true;
    status.responseData = err;
  }
  
  return status;
}

export async function deleteDessert(dessert, token) {
  let status = new ApiResponse();
  try {
    const response = await fetch(`${DESERTS_API_URL}/Desserts/deleteDessert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dessert)
    });
    if (!response.ok) {
      status.error = true;
      status.responseData = await response.json();
    } else {
      status.responseData = await response.json();
    }
  } catch (err) {
    status.error = true;
    status.responseData = err;
  }
  
  return status;
}