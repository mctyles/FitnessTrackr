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
      options.body = JSON.stringify(body);
    }
  
    //const result = await axios({url: (baseUrl + path), ...options});
    const result = await fetch(baseUrl + path, options);
    //const { data } = result;
    const data = await result.json();
    console.log(data);
    if (data.error) {
        throw data.error;
    }

    return data;
  };

export const fetchAccount = async (action, username, password) => {
    
    try {
        const path = (action === "signup" ? 'users/register' : 'users/login')

    const data = await callApi({method: 'POST', path: path, body :
        {
          username,
          password,
        },
    })
    return data;
    } catch(err) {
        throw err;
    }
}

export const fetchUser = async (token) => {
    const data = callApi({path: 'users/me', token})
    return data;
}

export const fetchRoutines = async () => {
    const data = await callApi({path: 'routines'})
    return data;
}

export const fetchUserRoutines = async (username) => {
    const data = await callApi({path: `users/${username}/routines/`})
    return data;
}

export const fetchActivities = async () => {
    const data = await callApi({path: 'activities'})
    return data;
}

export const addRoutine = async (token, name, goal, isPublic) => {
    const path = 'routines/'

    const data = await callApi({method: 'post', path: path, token, body :
        {
          isPublic,
          name,
          goal
        },
    })
    return data;
}