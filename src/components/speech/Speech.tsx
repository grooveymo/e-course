import React, { useState, useEffect, useCallback } from 'react';
import Button from '../Button';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  error: string;
}

interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
  onend: () => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: new () => CustomSpeechRecognition;
  }
}

const SpeechRecognition: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [recognition, setRecognition] =
    useState<CustomSpeechRecognition | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionError) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setError(
            'Microphone access was denied. Please allow microphone access and try again.'
          );
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition is not supported in this browser.');
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognition?.stop();
    } else {
      setError('');
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          recognition?.start();
          setIsListening(true);
        })
        .catch((err: Error) => {
          console.error('Error accessing the microphone', err);
          setError(
            'Unable to access the microphone. Please ensure you have given permission.'
          );
        });
    }
  }, [isListening, recognition]);

  return (
    <div
      style={{ width: '600px', padding: '32px', border: '1px dashed #fefefe' }}
    >
      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '32px' }}>
          {error}
        </div>
      )}
      <Button
        onClick={toggleListening}
        variant="primary"
        style={{
          margin: '16px',
          border: `1px solid ${isListening ? 'red' : 'green'}`,
        }}
        disabled={!recognition}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <div style={{ border: '1px solid green', padding: '32px' }}>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechRecognition;
