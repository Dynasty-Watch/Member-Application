import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonFooter,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import {
  barChartOutline,
  homeOutline,
  personCircleOutline,
  settingsOutline,
  //umbrellaOutline,
} from "ionicons/icons";
import "./Menu.css";
import { supabase } from "../supabaseClient";
export const Menu = () => {



  const router = useIonRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/", "forward", "replace");
  };

  return (
    <IonMenu side="start" contentId="main">
      <IonContent className="ion-padding">
        <div className="ion-padding">
          <div className="wrapper">
            <div className="typing-demo">
              <b>DYNASTY WATCH</b>
            </div>
          </div>
        </div>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/home"} routerDirection="none">
              <IonIcon icon={homeOutline} />
              <IonLabel>Request</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/statistics"} routerDirection="none">
              <IonIcon icon={barChartOutline} />
              <IonLabel>Statistics</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {/* <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/request"} routerDirection="none">
              <IonIcon icon={umbrellaOutline} />
              <IonLabel>Request test</IonLabel>
            </IonItem>
          </IonMenuToggle> */}
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/profile"} routerDirection="none">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Profile</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/settings"} routerDirection="none">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      <IonFooter className="ion-padding">
        <IonButton
          color="dark"
          expand="block"
          fill="solid"
          onClick={() => signOut()}
        >
          Logout
        </IonButton>
      </IonFooter>
    </IonMenu>
  );
};
