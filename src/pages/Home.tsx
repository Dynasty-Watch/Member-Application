import React, { useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonItem,
  IonLabel,
  IonButton,
  IonModal,
  IonIcon,
  IonInput,
  IonList,
} from "@ionic/react";
import "./styles.css";
import { NavButtons } from "../components/Navbuttons";
import {
  bagOutline,
  skullOutline,
  carOutline,
  handRightOutline,
} from "ionicons/icons";
import supabase from "../supabaseClient";

const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ",
  });

  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }

  useEffect(() => {
    //createUserAccount("mopholosiCodes@gmail.com", "Monyollo@123");
    signIn("mopholosiCodes@gmail.com", "Monyollo@123");
    storeCrimeDetails("hijack", "xyz");
    //logOut();
  }, []);

  // functions to be moved to their own components
  const createUserAccount = async (email: any, password: any) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error);
    }

    if (!error) {
      console.log("account created");
    }
  };

  const signIn = async (email: any, password: any) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    console.log(session?.user?.email);
    console.log(user?.aud);

    if (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    if (!error) {
      console.log("logged out");
    }
  };

  const getCurrentUser = async () => {
    return JSON.stringify(supabase.auth.user()?.email);
  };

  /* Storing request information was successfu, issue is Im trying to get the 
  current logged in users email and use it as an ID in the request table. Instead of getting the users email
  Im getting an object {}. tried converting the object to json/string and the bug is still there :( */
  const storeCrimeDetails = async (crimeType: any, crimeSummary: any) => {
    const { data, error } = await supabase.from("EmergencyRequest").insert([
      {
        UserID: getCurrentUser(),
        CrimeType: crimeType,
        Summary: crimeSummary,
        Accepted: false,
        RequestLat: -26.1861,
        RequestLng: 27.9959,
      },
    ]);

    if (error) {
      console.log(error);
    }

    console.log(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <NavButtons />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton id="open-modal" expand="block">
              Request
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoaded && (
          <div className="GeoMap">
            <GoogleMap
              zoom={10}
              center={{ lat: -26.204103, lng: 28.047304 }}
              mapContainerClassName="map-container"
            >
              <Marker position={{ lat: -26.18529, lng: 27.97975 }} />
            </GoogleMap>
          </div>
        )}
        <IonModal id="request-modal" ref={modal} trigger="open-modal">
          <IonContent>
            <IonToolbar>
              <IonTitle>Request</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
            <IonList className="items">
              <IonItem className="items">
                <IonButton className="buttons">
                  <IonIcon icon={bagOutline} />
                  Robbery
                </IonButton>
              </IonItem>
              <IonItem className="items">
                <IonButton className="buttons">
                  <IonIcon icon={skullOutline} />
                  Armed Robbery
                </IonButton>
              </IonItem>
              <IonItem className="items">
                <IonButton className="buttons">
                  <IonIcon icon={carOutline} />
                  Hijacking
                </IonButton>
              </IonItem>
              <IonItem className="items">
                <IonButton className="buttons">
                  <IonIcon icon={handRightOutline} />
                  Assault
                </IonButton>
              </IonItem>
              <IonItem className="items">
                <IonLabel>Other</IonLabel>
                <IonInput placeholder="Specify here" />
                <IonButton className="buttons">Request</IonButton>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
