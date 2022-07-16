import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCardContent, 
  IonItem, 
  IonSearchbar, 
  IonButton, 
  IonMenuButton,
  IonButtons} from '@ionic/react';


const Statistic: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonButtons>
          <IonMenuButton></IonMenuButton>
        <IonToolbar>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
        </IonButtons>
      </IonHeader>
      <IonContent color="primary">

      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>

        <IonCard>
          <IonCardHeader>
          <IonItem>
          <IonCardSubtitle>Crime Stat #</IonCardSubtitle>
              <IonButton fill="outline" slot="end">View</IonButton>
              </IonItem>
              
            <IonCardTitle>Name of Location:</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Information of the lastest crime stats in this location/area
      </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
          <IonItem>
          <IonCardSubtitle>Crime Stat #</IonCardSubtitle>
              <IonButton fill="outline" slot="end">View</IonButton>
              </IonItem>
            <IonCardTitle>Name of Location:</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Information of the lastest crime stats in this location/area
      </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
          <IonItem>
          <IonCardSubtitle>Crime Stat #</IonCardSubtitle>
              <IonButton fill="outline" slot="end">View</IonButton>
              </IonItem>
            <IonCardTitle>Name of Location:</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Information of the lastest crime stats in this location/area
      </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Statistic
