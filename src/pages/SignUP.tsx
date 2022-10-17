/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect } from "react";
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
  useIonToast,
  useIonLoading,
  IonText,
  IonGrid,
  IonCol,
  IonRow,
  IonLoading,
} from "@ionic/react";
import { supabase } from "../supabaseClient";
import { Supa } from "../SupaClient";
import { useIonRouter } from "@ionic/react";
import { Link } from "react-router-dom";
import "./signUp.css";
import Logo from "../components/images/Logo.jpeg";

export function SignUpPage() {
  const router = useIonRouter();
  const user = supabase.auth.user();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cellnum, setCellNum] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState();
  const [address, setAddress] = useState("");

  const [page, setPage] = useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [showToast] = useIonToast();

  useEffect(() => {
    setPage(1);
  }, []);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    try {
      const { user, session } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      const {user : ad , session : sess} = await Supa.auth.signUp({
        email: email,
        password: password,
      });
      await showToast({
        message: "Check your email to verify your account",
        duration: 5000,
      });
      const { error } = await supabase.from("UserInfo").upsert({
        //UserID: user?.id,
        FirstName: name,
       LastName: surname,
        Gender: gender,
       Age: age,
       Email: email,
        Phone: cellnum,
      });

      if (error) console.log(error);
      else user ? router.push("/") : null;
    } catch (e: any) {
      await showToast({
        message: e.error_description || e.message,
        duration: 5000,
      });
    } finally {
      setShowLoading(false);
      setPage(1);
    }
  };
  user ? router.push("/") : null;

  return (
    <IonPage>
      <IonContent color="secondary" className="ion-padding">
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
        />
        <div className="ion-padding">
          <img src={Logo} alt="Logo" />
          <IonText color="dark">
            <h2 className="header-text">
              <b>Welcome</b>
            </h2>
            <p className="signIn-text">
              {page == 1 && "Let's set up your account"}
              {page == 2 && "Almost Done!"}
              {page == 3 && "Final Step"}
            </p>
          </IonText>
        </div>
        <form onSubmit={handleRegister}>
          {page == 1 && (
            <>
              <div>
                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-align-self-center">
                      <IonItem color="secondary" fill="outline">
                        <IonLabel position="floating" color="dark">
                          Firstname
                        </IonLabel>
                        <IonInput
                          color="dark"
                          onIonChange={(e: any) => setName(e.target.value)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
              <div>
                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-align-self-center">
                      <IonItem color="secondary" fill="outline">
                        <IonLabel position="floating" color="dark">
                          Lastname
                        </IonLabel>
                        <IonInput
                          color="dark"
                          onIonChange={(e: any) => setSurname(e.target.value)}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
              <div className="ion-text-center">
                <IonButton
                  color="dark"
                  expand="block"
                  fill="solid"
                  onClick={() => setPage(2)}
                >
                  Next
                </IonButton>
              </div>
            </>
          )}

          {page == 2 && (
            <>
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

              <IonGrid>
                <IonRow>
                  <IonCol className="ion-align-self-center">
                    <IonItem color="secondary" fill="outline">
                      <IonLabel position="floating" color="dark">
                        Cell Number
                      </IonLabel>
                      <IonInput
                        color="dark"
                        onIonChange={(e: any) => setCellNum(e.target.value)}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <div className="ion-text-center">
                <IonButton
                  color="dark"
                  expand="block"
                  fill="solid"
                  onClick={() => setPage(3)}
                >
                  Next
                </IonButton>
              </div>
            </>
          )}

          {page == 3 && (
            <>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-align-self-center">
                    <IonItem color="secondary" fill="outline">
                      <IonLabel position="floating" color="dark">
                        Password
                      </IonLabel>
                      <IonInput
                        color="dark"
                        onIonChange={(e: any) => setPassword(e.target.value)}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-align-self-center">
                    <IonItem color="secondary" fill="outline">
                      <IonLabel position="floating" color="dark">
                        Repeat Password
                      </IonLabel>
                      <IonInput
                        color="dark"
                        onIonChange={(e: any) =>
                          setRepeatPassword(e.target.value)
                        }
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <div className="ion-text-center">
                <IonButton
                  type="submit"
                  color="dark"
                  expand="block"
                  fill="solid"
                  onClick={(e) => handleRegister(e)}
                >
                  Submit
                </IonButton>
              </div>
            </>
          )}
        </form>
        <p className="login-text">
          <Link to="/">Login instead</Link>
        </p>
      </IonContent>
    </IonPage>
  );
}
