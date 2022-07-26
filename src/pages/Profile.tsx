import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import User from "../components/images/profileAvatar.jpeg";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonButtons>
          <IonMenuButton></IonMenuButton>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonButtons>
      </IonHeader>
      <IonContent className="body">
        <IonCard class="ion-text-center" color={"light"}>
          <img src={User} alt="user img" height={"50px"} width={"70px"} />

          <IonCardContent class="ion-text-center">
            <h2>Mulisa Magelebeni</h2>
            <IonText color={"medium"}>
              <p>136 Caroline Street, Brixton, Johannesburg</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
