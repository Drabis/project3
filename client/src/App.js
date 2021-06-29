import React, {useState, useEffect} from "react";
import TopBar from "./components/topbar/TopBar";
import Home from "./components/pages/home/Home";
import Write from "./components/pages/Write/Write";
import SigninPage from "./components/pages/Signin/SigninPage";
import RegisterPage from "./components/pages/Register/RegisterPage";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
   const id = localStorage.getItem("userId") || null;
    if(id !== null) {
      handleUserSignin(id)
    }
  },[])


  const handleUserSignin = (id) => {
    localStorage.setItem("userId", id)
    setUser(id)
  }
  const handleLogout = () => {
    setUser(false)
  }
  return (
    <Router>
      <TopBar user={user} logout={handleLogout}/>
      <Switch>
        <Route exact path="/">
          {user ? <Home user={user} /> : <SigninPage handleUserSignin={handleUserSignin} />}
        </Route>
        <Route path="/register">
          <RegisterPage handleUserSignin={handleUserSignin} />
        </Route>
        <Route path="/signin">
          <SigninPage handleUserSignin={handleUserSignin} />
        </Route>
        <Route path="/write">
          <Write user={user}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
