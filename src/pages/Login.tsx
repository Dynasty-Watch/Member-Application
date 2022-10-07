/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import "./Login.css";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  useIonToast,
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonLoading,
} from "@ionic/react";
import { supabase } from "../supabaseClient";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import Logo from "../components/images/Logo.jpeg";
import { Supa } from "../SupaClient";

export function LoginPage() {
  const router = useIonRouter();
  const user = supabase.auth.user();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const [showToast] = useIonToast();
  const handleLogin = async (e: any) => {
    console.log();
    e.preventDefault();
    setShowLoading(true);

    try {
      const { session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      const {session : sess} = await Supa.auth.signUp({
        email: email,
        password: password,
      });
    } catch (e: any) {
      await showToast({
        message: e.error_description || e.message,
        duration: 100,
      });
    } finally {
      setShowLoading(false);
    }
  };
  user ? router.push("/") : null;

  return (
    <IonPage>
      <IonContent className="ion-padding" color="secondary">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
        />
        <div className="ion-padding">
          <img src={Logo} alt="Logo" />
          <IonText color="dark">
            <h2 className="header-text">
              <b>Welcome Back</b>
            </h2>
          </IonText>
        </div>

        <form onSubmit={handleLogin}>
          <div className="email">
            <IonGrid>
              <IonRow>
                <IonCol className="ion-align-self-center">
                  <IonItem color="secondary" fill="outline">
                    <IonLabel position="floating" color="dark">
                      Email
                    </IonLabel>
                    <IonInput
                      color="dark"
                      onIonChange={(e: any) => setEmail(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="password">
            <IonGrid>
              <IonRow>
                <IonCol className="ion-align-self-center">
                  <IonItem color="secondary" fill="outline">
                    <IonLabel position="floating" color="dark">
                      Password
                    </IonLabel>
                    <IonInput
                      color="dark"
                      type="password"
                      onIonChange={(e: any) => setPassword(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="ion-text-center">
            <IonButton
              color="dark"
              type="submit"
              expand="block"
              fill="solid"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </IonButton>
          </div>
        </form>

        <div>
          <p className="signUp-text">
            New member?
            <Link to="/signUp"> Register account </Link>
          </p>
          <p className="forgotPassword-text">
            <Link to="/forgotPassword"> Forgot password</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
