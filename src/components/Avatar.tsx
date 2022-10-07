/* eslint-disable jsx-a11y/alt-text */
import { IonIcon } from '@ionic/react';
import { person } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Avatar.css'
export function Avatar({
  url,
  onUpload,
}: {
  url: string;
  onUpload: (e: any, file: string) => Promise<void>;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url]);
  const uploadAvatar = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
      });

      const file = await fetch(photo.dataUrl!)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], 'my-file', { type: `image/${photo.format}` })
        );

      const fileName = `${Math.random()}-${new Date().getTime()}.${
        photo.format
      }`;
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
      if (uploadError) {
        throw uploadError;
      }
      onUpload(null, fileName);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data!);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  };

  return (
    <div className="avatar">
    <div className="avatar_wrapper" onClick={uploadAvatar}>
      {avatarUrl ? (
        <img src={avatarUrl} />
      ) : (
        <IonIcon icon={person} className="no-avatar" />
      )}
    </div>

    </div>
  );
}