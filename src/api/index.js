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

  const result = await fetch(baseUrl + path, options);
  const data = await result.json();
  if (data.error) {
    throw data.error;
  }

  return data;
};

export const fetchAccount = async (action, username, password) => {
  try {
    const path = action === "signup" ? "users/register" : "users/login";

    const data = await callApi({
      method: "POST",
      path: path,
      body: {
        username,
        password,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchUser = async (token) => {
  const data = callApi({ path: "users/me", token });
  return data;
};

export const fetchRoutines = async () => {
  const data = await callApi({ path: "routines" });
  return data;
};

export const fetchUserRoutines = async (username) => {
  const data = await callApi({ path: `users/${username}/routines/` });
  return data;
};

export const fetchActivities = async () => {
  const data = await callApi({ path: "activities" });
  return data;
};

export const addRoutine = async (token, name, goal, isPublic) => {
  const path = "routines/";

  const data = await callApi({
    method: "POST",
    path: path,
    token,
    body: {
      isPublic,
      name,
      goal,
    },
  });
  return data;
};

export const updateRoutine = async (token, name, goal, isPublic, id) => {
  const path = `routines/${id}`;

  const data = await callApi({
    method: "PATCH",
    path,
    token,
    body: {
      isPublic,
      name,
      goal,
    },
  });
  return data;
};

export const deleteRoutine = async (token, id) => {
  const path = `routines/${id}`;

  const data = await callApi({ method: "DELETE", path, token });
  return data;
};

export const addActivity = async (token, name, description) => {
  const path = "activities/";

  const data = await callApi({
    method: "post",
    path: path,
    token,
    body: {
      name,
      description,
    },
  });
  return data;
};

export const addActivityToRoutine = async (
  token,
  routineId,
  activityId,
  count,
  duration
) => {
  const path = `routines/${routineId}/activities/`;

  const data = await callApi({
    method: "post",
    path,
    token,
    body: {
      activityId,
      count,
      duration,
    },
  });
  return data;
};

export const deleteRoutineActivity = async (token, id) => {
  const path = `routine_activities/${id}`;

  const data = await callApi({ method: "DELETE", path, token });
  return data;
};

export const updateRoutineActivity = async (token, id, count, duration) => {
  const path = `routine_activities/${id}`;

  const data = await callApi({
    method: "PATCH",
    path,
    token,
    body: {
      count,
      duration,
    },
  });
  return data;
};
