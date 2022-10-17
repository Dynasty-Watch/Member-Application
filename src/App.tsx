import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import Home from "./pages/Home";
import Statistic from "./pages/Statistic";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
//import Request from "./pages/Request";
import { supabase } from "./supabaseClient";
import { LoginPage } from "./pages/Login";
import { SignUpPage } from "./pages/SignUP";
import ForgotPassword from "./pages/ForgotPassword";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

setupIonicReact();

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);
  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main">
          <Route
            exact
            path="/"
            render={() => {
              return session ? <Redirect to="/home" /> : <LoginPage />;
            }}
          />
          <Route path="/signUp" component={SignUpPage} exact={true} />
          <Route path="/home" exact={true}>
            <Home />
          </Route>
          <Route path="/profile" component={Profile} exact={true} />
          <Route path="/statistics" component={Statistic} exact={true} />
          {/* <Route path="/request" component={Request} exact={true} /> */}
          <Route path="/settings" component={Settings} exact={true} />
          <Route
            path="/forgotPassword"
            component={ForgotPassword}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
