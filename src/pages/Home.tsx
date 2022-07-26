import React, { useRef } from "react";
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
const Home = () => {
  //const { center, latitude, longitude, getGeoLocation } = props
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAIB2cC62_gWE8woaK9xqoKDjoLSht_5zQ",
  });

  const modal = useRef<HTMLIonModalElement>(null);
  function dismiss() {
    modal.current?.dismiss();
  }

  const ReadCrimeType = () => {};

  const ReadCrimeDetails = () => {};

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
