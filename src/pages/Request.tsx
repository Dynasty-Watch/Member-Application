/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { callSharp } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "./Request.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Geolocation } from "@capacitor/geolocation";
import { supabase } from "../supabaseClient";

const Request: React.FC = () => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    await Geolocation.checkPermissions()
      .then(() => Geolocation.getCurrentPosition())
      .then((val) => {
        setPosition({
          latitude: val.coords.latitude,
          longitude: val.coords.longitude,
        });
      });
  };
  console.log("lat", position.latitude, "long", position.longitude);

  const user = supabase.auth.user();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonButtons>
          <IonMenuButton></IonMenuButton>
          <IonToolbar>
            <IonTitle>Request</IonTitle>
          </IonToolbar>
        </IonButtons>
      </IonHeader>
      <IonContent color="">
        <div className="Map">
          {isLoaded && (
            <GoogleMap
              zoom={10}
              center={{
                lat: position.latitude,
                lng: position.longitude,
              }}
              mapContainerClassName="map-container"
            >
              <Marker
                position={{
                  lat: position.latitude,
                  lng: position.longitude,
                }}
              />
            </GoogleMap>
          )}
        </div>

        <IonButton shape="round" expand="block">
          Request
        </IonButton>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Dynasty Watcher </IonCardSubtitle>
                  <IonCardTitle>South African Police Service </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={callSharp} />
                  <a style={{ textDecoration: "none" }} href="tel:10111">
                    08600 10111
                  </a>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Dynasty Watcher </IonCardSubtitle>
                  <IonCardTitle>Health and Accidents </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={callSharp} />
                  <a style={{ textDecoration: "none" }} href="tel:10111">
                    0800 203 886
                  </a>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Dynasty Watcher </IonCardSubtitle>
                  <IonCardTitle>Road and Traffic Emergencies</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={callSharp} />
                  <a style={{ textDecoration: "none" }} href="tel:10111">
                    10111
                  </a>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>Dynasty Watcher </IonCardSubtitle>
                  <IonCardTitle>Road and Traffic Emergencies</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={callSharp} />{" "}
                  <a style={{ textDecoration: "none" }} href="tel:10111">
                    10111
                  </a>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Request;
