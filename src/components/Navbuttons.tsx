import { IonButton, IonIcon, IonLabel, IonMenuButton } from "@ionic/react";
import { barChartOutline, homeOutline, personCircleOutline, settingsOutline, umbrellaOutline } from "ionicons/icons";
import React,{ useEffect} from "react";

export const NavButtons = () => {
    const [mQuery, setMquery ] = React.useState<any>({
        matches: window.innerWidth > 768? true : false,
       });

    useEffect(() => { window.matchMedia("(min-width: 768px)").addListener(setMquery);}),[];
    console.log(mQuery.matches)

    return (
        <div>
            {mQuery && !mQuery.matches ? (
                <IonMenuButton/>
            ) : (
                <>
                <IonButton routerLink={"/home"}>
                <IonIcon icon={homeOutline}/><IonLabel>Home</IonLabel></IonButton>
                <IonButton routerLink={"/profile"}><IonIcon icon={personCircleOutline}/><IonLabel>Profile</IonLabel></IonButton>
                <IonButton routerLink={"/statistics"}><IonIcon icon={barChartOutline}/><IonLabel>Settings</IonLabel></IonButton>
                <IonButton routerLink={"/request"}><IonIcon icon={umbrellaOutline}/><IonLabel>Request</IonLabel></IonButton>
                <IonButton routerLink={"/settings"}><IonIcon icon={settingsOutline}/><IonLabel>Settings</IonLabel></IonButton> 
                </>
            )}
        </div>
    );
};