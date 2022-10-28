import axios from 'axios';

const baseUrl = "https://calm-headland-51316.herokuapp.com/api/";

export const callApi = async ({ method, path, token, body }) => {
    const options = {
      method: method ? method : "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  
    if (body) {
      options.data = JSON.stringify(body);
    }
  
    const result = await axios({url: (baseUrl + path), ...options});
    const { data } = result;
    if (data.error) {
        throw data.error.message;
    }

    return data;
  };

export const fetchAccount = async (action, username, password) => {
    const path = (action === "signup" ? 'users/register' : 'users/login')

    const data = await callApi({method: 'post', path: path, body :
        {
          username,
          password,
        },
    })
    return data;
}

export const fetchUser = async (token) => {
    const data = callApi({path: 'users/me', token})
    return data;
}

export const fetchRoutines = async () => {
    const data = callApi({path: 'routines'})
    return data;
}

export const fetchActivities = async () => {
    const data = callApi({path: 'activities'})
    return data;
}