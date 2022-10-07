/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect } from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import {
    IonPage,IonItemDivider, IonTextarea, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonItem, IonLabel,  IonButton, IonModal, IonBackButton ,IonList, IonSearchbar, IonGrid, IonRow, IonCol, useIonRouter, useIonViewWillEnter, useIonViewDidEnter, IonToast, useIonToast, useIonLoading, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from '@ionic/react';
import './styles.css';
import { supabase } from "../supabaseClient";
import { Geolocation } from "@capacitor/geolocation";
import { ContactDetails } from "../Assets/ContactDetails";
import { Crimes } from "../Assets/Crimes";

 const Home =  () => {
    
        var filteredSearch;
        const [search,setSearch] = useState("");
        const [page,setPage] = useState(1)
        const [text,setText] = useState("");
        const [select,setSelect] = useState("");
        const [isActive, setIsActive] = useState(false);
        const [ position,setPosition] = useState({
            latitude : +0,
            longitude: +0,
        });
        
        useEffect(() => {
            getLocation();
        }, []);

        
        const getLocation = async () => {
            await Geolocation.checkPermissions()
            .then(() => Geolocation.getCurrentPosition())
            .then((val) => {
                setPosition({
            
                latitude : val.coords.latitude,
                longitude : val.coords.longitude,
                });
            });
        };
        const user = supabase.auth.user();
        
        const { isLoaded } = useLoadScript({
            googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        });

        const modal =  useRef<HTMLIonModalElement>(null);
        function dismiss() {
            modal.current?.dismiss();
        }

        // display filtered crimes
        const handleSearch = (e: any) => {
            e.preventDefault();
            
            //add the filter components into the filteredSearch variable Eddie created
            filteredSearch = Crimes.filter(e=>e.Type.toLowerCase().includes(search)
            ).map((e) => (
                
                    <IonButton 
                        id="open-modal-ar-robbery" 
                        expand="block"
                        key={e.id}
                        onClick={() => handleSelect}    
                    >
                        {e.Type}
            </IonButton>
        ))}

        const handleSelect = (e: any) => {
            e.preventDefault() 
        }

        // display all crime types
        const displayCrimes = Crimes.map(crime => {
            return (
                <IonButton 
                className="modal"
                shape="round"
                size="default"
                id="open-modal-ar-robbery" 
                expand="block"
                style={{
                  color : isActive ? "medium" : "success",
                }}
                    key={crime.id}
                    onClick={() => {
                        setSelect(crime.Type);
                        setIsActive(current => !current);
                    }}    
                >
                    {crime.Type}
                </IonButton>
            )
        })

        const storeCrimeDetails = async (crimeType: any, crimeSummary: any) => {
            const { data, error } = await supabase.from("EmergencyRequest").insert([
            {
                UserID: user?.id,
                CrimeType: crimeType,
                Summary: crimeSummary,
                Accepted: false,
                RequestLat: position.latitude,
                RequestLng: position.longitude,
            },
            ]);
            //await showToast({message:"Sending Request", duration: 100}); 
        
            if (error) {
            console.log(error);
            } else {
              setPage(3);
            }
        
            console.log(data);
        };

        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Home</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons> 
                        <IonButtons slot="end">
                            <IonButton id="open-modal" expand="block">Request</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    {isLoaded && (
                        <GoogleMap zoom={10} 
                        center={{
                            lat: position.latitude,
                            lng: position.longitude,
                        }}
                        mapContainerClassName="map-container">
                            <Marker position={{
                                    lat: position.latitude,
                                    lng: position.longitude,
                            }}
                        />
                       </GoogleMap>
                    )}

                    <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75, 1]} color = "dark">
                    
                        {page === 1 && (
                            <>
                                <IonSearchbar value={search} onIonChange={(e) => setSearch(e.detail.value!)}></IonSearchbar>
                                <IonContent>
                                    <IonToolbar>
                                        <IonTitle>Request</IonTitle> 
                                    </IonToolbar>
                                    <IonGrid className="items">

                                    {search === "" }
                                    {search !== "" && filteredSearch}


                                    </IonGrid>    
                                   

                                <IonList className="items ion-padding">
                                    {Crimes.filter((e) =>
                                    e.Type.toLowerCase().includes(search)
                                    ).map((e) => (
                                        <IonItem button onClick={() => {
                                            setSelect(e.Type);                                          
                                            setIsActive(current => !current);
                                        }} className="items" shape="round" 
                                      
                                        color = "medium"
                                    
                                        key={e.id}>
                                        <p className="item-text">{e.Type}</p>

                                        </IonItem>
                                    ))}    
                                    <IonButton color="primary"
                                     expand="block"
                                      fill="solid" 
                                      onClick={() => setPage(2)}>Next</IonButton>
                                    </IonList>
                                </IonContent>
                            </>
                        )}


            {page === 2 && (
                 <IonContent className="ion-padding">
                 <IonHeader>
                   <IonToolbar>
                     <IonTitle>
                       <h3 className="modal-header">Description</h3>
                     </IonTitle>
                   </IonToolbar>
                 </IonHeader>                           
             <p className="crime-type">
                Requesting for: <b className="modal-header">{select}</b>
              </p>
              <hr />
              <div className="email">
                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-align-self-center">
                      <IonItem color="secondary" fill="outline">
                        <IonLabel position="floating" color="dark">
                          Detailed description here...
                        </IonLabel>
                        <IonTextarea
                          className="description"
                          value={text}
                          rows={6}
                          cols={20}
                          onIonChange={(e) => setText(e.detail.value!)}
                        ></IonTextarea>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>

              <div className="buttons">
                <IonButton
                  onClick={() => {
                    modal.current?.dismiss();
                    setPage(1);
                  }}
                  color="danger"
                >
                  Cancel
                </IonButton>
                <IonButton
                  strong={true}
                  onClick={() => storeCrimeDetails(select, text)}
                >
                  Confirm
                </IonButton>
              </div>
            </IonContent>
          )}

      {page === 3 && (
                  <>
                    <IonContent>
                      <IonList className="items ion-padding">
                        <p>Help is on the way</p>
                        <p>Need extra assistance while you wait?</p>
                        {ContactDetails.map((contact) => {
                          return (
                            <IonCard key={contact.id}>
                              <IonCardHeader>
                                <IonCardTitle>{contact.service} </IonCardTitle>
                              </IonCardHeader>
                              <IonCardContent>
                                <a
                                  style={{ textDecoration: "none" }}
                                  href={contact.href}
                                >
                                  {contact.href}
                                </a>
                              </IonCardContent>
                            </IonCard>
                          );
                        })}
                        <IonButton
                    color="primary"
                    expand="block"
                    fill="solid"
                    onClick={() => {
                      modal.current?.dismiss();
                      setPage(1);
                    }}
                  >
                    Close
                  </IonButton>
                </IonList>
              </IonContent>
            </>
          )}

        </IonModal>
        </IonContent>
            </IonPage>
        );
    };

export default Home;