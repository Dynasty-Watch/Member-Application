import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {barChartOutline, homeOutline, peopleCircleOutline, personCircleOutline, settingsOutline, umbrellaOutline} from 'ionicons/icons';
import './Menu.css';

export const Menu = () => {
return (
  <IonMenu side="start" contentId='main'>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          Menu
        </IonTitle>
        <br/><br/>
        <IonNote>Hi Dynasty Watcher</IonNote>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={"/home"} routerDirection="none">
           <IonIcon icon={homeOutline}/>
            <IonLabel>Home</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={"/profile"} routerDirection="none">
            <IonIcon icon={personCircleOutline}/>
            <IonLabel>Profile</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={"/statistics"} routerDirection="none">
          <IonIcon icon={barChartOutline}/>
          <IonLabel>Statistics</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={"/request"} routerDirection="none">
            <IonIcon icon={umbrellaOutline}/>
            <IonLabel>Request</IonLabel>
          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={"/settings"} routerDirection="none">
            
            <IonLabel>Settings</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);
}