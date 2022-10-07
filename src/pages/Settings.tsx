import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle } from '@ionic/react';
import React from 'react';


const Settings: React.FC = () => {


  return (

    <IonPage>
            <IonHeader>
            <IonButtons>
          <IonMenuButton></IonMenuButton>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
        </IonButtons>
            </IonHeader>
            <IonContent fullscreen>
        <h4 color='gray'>Notification Setting</h4>

<IonList>
    <IonItem>
        <IonLabel>Application Notifications</IonLabel>
        <IonToggle color="secondary" mode="ios"></IonToggle>
    </IonItem>

    <IonItem>
        <IonLabel>SMS Notifications</IonLabel>
        <IonToggle color="secondary" mode="ios"></IonToggle>
    </IonItem>

    <IonItem>
        <IonLabel>Email Notifications</IonLabel>
        <IonToggle color="secondary" mode="ios"></IonToggle>
    </IonItem>
</IonList>

<h4 color='gray'>Access Control</h4>
<IonList>
    <IonItem>
        <IonLabel>Touch ID</IonLabel>
        <IonToggle color="secondary" mode="ios"></IonToggle>
    </IonItem>

    <IonItem>
        <IonLabel>Face ID</IonLabel>
        <IonToggle color="secondary" mode="ios"></IonToggle>
    </IonItem>
    </IonList>
      </IonContent>
          </IonPage>
    );  
}

export default Settings;
