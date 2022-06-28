import { IonButton, IonIcon, IonMenuButton } from "@ionic/react";
import { homeOutline } from "ionicons/icons";
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
                <IonIcon icon={homeOutline}/>Home</IonButton>
                <IonButton routerLink=""></IonButton>
                <IonButton routerLink=""></IonButton>
                <IonButton routerLink=""></IonButton>
                <IonButton routerLink=""></IonButton> 
                </>
            )}
        </div>
    );
};