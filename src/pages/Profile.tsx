/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "../components/images/profileAvatar.jpeg";
import "./Profile.css";
import { Avatar } from "../components/Avatar";
import { lockClosed, lockClosedOutline } from "ionicons/icons";

const Profile = () => {
  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const [session] = useState(() => supabase.auth.session());
  const router = useIonRouter();
  const [profile, setProfile] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    Age: '',
    Phone: '',
    //address: "",
    avatar_url: '',
  });
  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    console.log("get");
    await showLoading();
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from('UserInfo')
        .select(`FirstName, LastName, Gender, Age, Phone, avatar_url`)
        .eq('UserID', user!.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setProfile({
          FirstName: data.FirstName,
          LastName: data.LastName,
          Gender: data.Gender,
          Age: data.Age,
          Phone: data.Phone,
          avatar_url: data.avatar_url,
        });
      }
    } catch (error: any) {
      showToast({ message: error.message, duration: 3000 });
    } finally {
      await hideLoading();
    }
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/", "forward", "replace");
  }

  const updateProfile = async (e?: any, avatar_url: string = '') => {
    e?.preventDefault();

    console.log("update ");
    await showLoading();

    try {
      const user = supabase.auth.user();

      const updates = {
        UserID: user!.id,
        ...profile,
        avatar_url: avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('UserInfo').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      showToast({ message: error.message, duration: 5000 });
    } finally {
      await hideLoading();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonButtons>
          <IonMenuButton/>
          <IonToolbar>
            <IonTitle>Profile</IonTitle>
          </IonToolbar>
        </IonButtons>
      </IonHeader>
      <IonContent fullscreen>
        <form className="user_div" onSubmit={updateProfile}>
          <div >
            <Avatar url={profile.avatar_url} onUpload={updateProfile}></Avatar>
          </div>
          <IonItem>
            <IonLabel><p>Email</p>{session?.user?.email}<IonIcon icon={lockClosedOutline}></IonIcon></IonLabel>
          </IonItem>
          <IonItem >
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput 
            placeholder="Name"
            value={profile.FirstName}
            onIonChange={(e) =>
              setProfile({ ...profile, FirstName: e.detail.value ?? '' })
            }
            >
            </IonInput>
            </IonItem>
            <IonItem >
            <IonLabel position="stacked">Surname</IonLabel>
            <IonInput 
            placeholder="Surname"
            value={profile.LastName}
            onIonChange={(e) =>
              setProfile({ ...profile, LastName: e.detail.value ?? '' })
            }
            >
            </IonInput>
            </IonItem>
            <IonItem >
            <IonLabel position="stacked">Cell No.</IonLabel>
            <IonInput 
            placeholder="Cell number"
            value={profile.Phone}
            onIonChange={(e) =>
              setProfile({ ...profile, Phone: e.detail.value ?? '' })
            }
            >
            </IonInput>
            </IonItem>

            <IonItem >
            <IonLabel position="stacked">Gender</IonLabel>
            <IonInput 
            placeholder="Gender"
            value={profile.Gender}
            //Should we allow them to change genders?
            //onIonChange={(e) =>
            //  setProfile({ ...profile, Gender: e.detail.value ?? '' })
            //}
            >
            </IonInput>
            </IonItem>

            <IonItem >
            <IonLabel position="stacked">Age</IonLabel>
            <IonInput 
            placeholder="Age"
            value={profile.Age}
            onIonChange={(e) =>
              setProfile({ ...profile, Age: e.detail.value ?? '' })
            }
            >
            </IonInput>
            </IonItem>
            <IonItem >
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput 
            name="address"
            //placeholder="Address"
            //value={profile.address}
            //onIonChange={(e) =>
            //  setProfile({ ...profile, address: e.detail.value ?? '' })
           // }
            >
            </IonInput>
            </IonItem>
            <div className="ion-text-center">
            <IonButton expand="block" fill="solid" type="submit">
              Update Profile
            </IonButton>
            
          <IonButton  
          color="dark"
          expand="block"
          fill="solid" 
          onClick={() => signOut()}>
            Logout
          </IonButton>
          </div>
            </form>
  
        
        
      </IonContent>
    </IonPage>
  );
};

export default Profile;
