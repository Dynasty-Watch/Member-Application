import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
    IonButtons, IonMenuButton, } from '@ionic/react';
import React, { useState } from 'react';

const Request: React.FC = () => {

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
            <IonContent className="body">

            <p>Hello World</p>
             
            </IonContent>
          </IonPage>
    );  
}

export default Request;
