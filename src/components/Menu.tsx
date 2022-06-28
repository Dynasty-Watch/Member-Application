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
import {homeOutline} from 'ionicons/icons';
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
          <IonItem button routerLink={""} routerDirection="none">

          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={""} routerDirection="none">

          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={""} routerDirection="none">

          </IonItem>
        </IonMenuToggle>
        <IonMenuToggle auto-hide="false">
          <IonItem button routerLink={""} routerDirection="none">

          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>
);
}