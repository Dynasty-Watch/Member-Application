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
    IonToggle, 
    IonIcon} from '@ionic/react';
import React from 'react';
import { moon } from "ionicons/icons";



const Settings: React.FC = () => {

    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
      };

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

<h4 color='gray'>Switch Mode</h4>
<IonList>
    
    <IonItem>
        <IonIcon slot="start" icon={moon} />
        <IonLabel>Dark Mode</IonLabel>
        <IonToggle color="dark" mode="ios" onIonChange={toggleDarkModeHandler}>  </IonToggle>
    </IonItem>

   
    </IonList>
      </IonContent>
          </IonPage>
    );  
}

export default Settings;
