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
    IonSegment,
    IonSegmentButton,
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, {useState} from 'react';
import './Home.css';

const axios = require('axios');
const FileSaver = require('file-saver');

const Home: React.FC = () => {
    const [text, setText] = useState<string>();
    const [language, setLanguage] = useState<string>('es-es');
    const [fileName, setFileName] = useState<string>();

    function b64toBlob(dataURI: string) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'audio/mpeg'});
    }

    const download = (text: string, lang: string, fileName: string) => {
        const replacedText = text.replace(/\s/g, '%20');
        const url = `https://api.voicerss.org/?key=f8538537192c43bcb28d89955f9e5dfc&hl=${lang}&src=${replacedText}&c=mp3&b64=true`;
        axios.get(url).then((response: any) => {
            return b64toBlob(response.data);
        }).then((blob: any) => {
            FileSaver.saveAs(blob, `${fileName ? fileName : replacedText}.mp3`);
        });
    };

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
                        <IonLabel position="floating">Texto</IonLabel>
                        <IonTextarea rows={8} value={text} onIonChange={e => setText(e.detail.value!)}/>
                    </IonItem>
                    <IonListHeader>
                        <IonLabel>Descarga ficheros</IonLabel>
                    </IonListHeader>
                    <IonItem className="fileName">
                        <IonLabel position="floating">Nombre del fichero</IonLabel>
                        <IonInput value={fileName} placeholder="Si no seleccionas uno se autogenera"
                                  onIonChange={e => setFileName(e.detail.value!)}/>
                    </IonItem>
                    <IonSegment value={language} onIonChange={e => setLanguage(e.detail.value as string)}>
                        <IonSegmentButton value="es-es">
                            <IonLabel>Español</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="en-us">
                            <IonLabel>Inglés</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                    <div className="buttonContainer">
                        <IonButton disabled={text === undefined || text === ''} onClick={() => {
                            download(text as string, language as string, fileName as string);
                        }}>
                            Descargar
                        </IonButton>
                    </div>
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default Home;
