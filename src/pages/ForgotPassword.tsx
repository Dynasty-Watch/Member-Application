import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonLoading,
  IonLabel,
  IonItem,
} from "@ionic/react";
import { supabase } from "../supabaseClient";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Logo from "../components/images/Logo.jpeg";
import "./ForgotPassword.css";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const history = useHistory();

  const confirm = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    await supabase.auth.api
      .resetPasswordForEmail(email)
      .then(() => setPage(2))
      .finally(() => {
        setShowLoading(false);
      });
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" color="secondary">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Loading..."}
        />
        <div className="ion-padding">
          <img src={Logo} alt="Logo" />
          <IonText color="dark">
            <h2 className="header-text">
              <b>Recover Account</b>
            </h2>
          </IonText>
        </div>

        {page === 1 && (
          <>
            <div>
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

            <div className="button">
              <IonButton
                color="dark"
                expand="block"
                onClick={(e) => confirm(e)}
              >
                Reset
              </IonButton>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <p>
              A recover password email has been sent to {email}. Follow the
              steps provided in the email to recover your account
            </p>

            <div className="button">
              <IonButton
                color="dark"
                expand="block"
                onClick={() => {
                  history.push("/");
                  setPage(1);
                }}
              >
                Back to login
              </IonButton>
            </div>
          </>
        )}

        <div>
          <p className="forgotPassword-text">
            <Link to="/">Back to login</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgetPassword;
