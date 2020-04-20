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

const FileSaver = require('file-saver');

const Home: React.FC = () => {
    const [text, setText] = useState<string>();
    const [language, setLanguage] = useState<string>('es-es');
    const [fileName, setFileName] = useState<string>();

    const download = (text: string, lang: string, fileName: string) => {
        const replacedText = text.replace(/\s/g, '%20');
        const url = `http://api.voicerss.org/?key=f8538537192c43bcb28d89955f9e5dfc&hl=${lang}&src=${replacedText}&c=mp3`;
        FileSaver.saveAs(url, `${fileName ? fileName : replacedText}.mp3`);
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
