import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { fetchUser } from "./api";

import AccountForm from "./components/AccountForm";
import Activities from "./components/Activities";
import Home from "./components/Home";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Routines from "./components/Routines";
import UserRoutines from "./components/UserRoutines";
import SingleRoutine from "./components/SingleRoutine";

const App = () => {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState(null);
  const [routines, setRoutines] = useState([]);
  const [userRoutines, setUserRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const user = await fetchUser(token);
        setUser(user);
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    setSuccessMsg("");
  }, [routines, userRoutines, activities]);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Nav token={token} setToken={setToken} user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                token={token}
                successMsg={successMsg}
                setSuccessMsg={setSuccessMsg}
              />
            }
          ></Route>
          <Route
            path="/account/:action"
            element={<AccountForm setToken={setToken} />}
          ></Route>
          <Route
            path="/routines"
            element={
              <Routines
                activities={activities}
                setActivities={setActivities}
                routines={routines}
                setRoutines={setRoutines}
                token={token}
                user={user}
                setSuccessMsg={setSuccessMsg}
              />
            }
          ></Route>
          <Route
            path="/user/routines"
            element={
              <UserRoutines
                activities={activities}
                setActivities={setActivities}
                routines={routines}
                setRoutines={setRoutines}
                userRoutines={userRoutines}
                setUserRoutines={setUserRoutines}
                user={user}
                token={token}
                setSuccessMsg={setSuccessMsg}
              />
            }
          ></Route>
          <Route
            path="/routines/:routineId"
            element={
              <SingleRoutine
                routines={routines}
                setUserRoutines={setUserRoutines}
                user={user}
                token={token}
                userRoutines={userRoutines}
              />
            }
          ></Route>
          <Route
            path="/activities"
            element={
              <Activities
                activities={activities}
                setActivities={setActivities}
                token={token}
              />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
