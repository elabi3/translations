import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useState} from 'react';
import './Home.css';

const axios = require('axios');
const FileDownload = require('js-file-download');

const Home: React.FC = () => {
    const [spanish, setSpanish] = useState<string>();
    const [english, setEnglish] = useState<string>();
    const [fileName, setFileName] = useState<string>();

    axios.get('https://translate.google.com.vn/translate_tts?ie=UTF-8&q=prueba+hola&tl=es&client=tw-ob')
        .then((response: any) => {
            FileDownload(response.data, 'report.mpga');
        });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Texto a Voz</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Introduzca texto</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Español</IonLabel>
                        <IonTextarea rows={8} value={spanish} onIonChange={e => setSpanish(e.detail.value!)}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Inglés</IonLabel>
                        <IonTextarea rows={8} value={english} onIonChange={e => setEnglish(e.detail.value!)}/>
                    </IonItem>
                    <IonListHeader>
                        <IonLabel>Descarga ficheros</IonLabel>
                    </IonListHeader>
                    <IonItem className="fileName">
                        <IonLabel position="floating">Nombre del fichero</IonLabel>
                        <IonInput value={fileName} placeholder="Si no seleccionas uno se autogenera"
                                  onIonChange={e => setFileName(e.detail.value!)}/>
                    </IonItem>
                    <IonButton onClick={() => {
                    }}>
                        Español
                    </IonButton>
                    <IonButton onClick={() => {
                    }}>
                        Inglés
                    </IonButton>
                    <IonButton onClick={() => {
                    }}>
                        Ambos
                    </IonButton>
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Home;
