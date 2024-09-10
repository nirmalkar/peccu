import React, { useState, useRef } from 'react';

interface AudioRecorderPropsType {
  getAudioURL: (audioBlob: Blob) => void;
}
const AudioRecorder = ({ getAudioURL }: AudioRecorderPropsType) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          setIsRecording(true);

          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: 'audio/wav',
            });
            setAudioBlob(audioBlob);
            getAudioURL(audioBlob);
            setAudioURL(URL.createObjectURL(audioBlob));
            audioChunksRef.current = [];
          };

          mediaRecorder.start();
        })
        .catch((err) => {
          console.log('Error accessing the microphone', err);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(audioBlob);
      link.download = 'recording.wav';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioURL && (
        <div>
          <audio src={audioURL} controls />
          <button onClick={downloadAudio}>Download Recording</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
