import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { MediaStream } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';

export type EffectType =
  | ''
  | 'effect1'
  | 'effect2'
  | 'effect3'
  | 'effect4';

type CallContextType = {
  localStream: MediaStream | null;
  setLocalStream: React.Dispatch<
    React.SetStateAction<MediaStream | null>
  >;

  isRemoteAccessAllowed: boolean;
  setIsRemoteAccessAllowed: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isCameraOn: boolean;
  isMicOn: boolean;
  isSpeakerOn: boolean;

  toggleCamera: () => void;
  toggleMic: () => void;
  toggleSpeaker: () => void;

  cameraPosition: 'front' | 'back';
  setCameraPosition: React.Dispatch<
    React.SetStateAction<'front' | 'back'>
  >;

  currentEffect: EffectType;
  setCurrentEffect: React.Dispatch<
    React.SetStateAction<EffectType>
  >;
};

const CallContext = createContext<
  CallContextType | undefined
>(undefined);

export const CallProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localStream, setLocalStream] =
    useState<MediaStream | null>(null);

  const [isRemoteAccessAllowed, setIsRemoteAccessAllowed] =
    useState(true);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] =
    useState(true);

  const [cameraPosition, setCameraPosition] =
    useState<'front' | 'back'>('front');

  const [currentEffect, setCurrentEffect] =
    useState<EffectType>('');

  const toggleMic = useCallback(() => {
    const audioTrack =
      localStream?.getAudioTracks?.()[0];
    if (!audioTrack) return;

    const nextState = !audioTrack.enabled;
    audioTrack.enabled = nextState;
    setIsMicOn(nextState);
  }, [localStream]);

  const toggleCamera = useCallback(() => {
    const videoTrack =
      localStream?.getVideoTracks?.()[0];
    if (!videoTrack) return;

    const nextState = !videoTrack.enabled;
    videoTrack.enabled = nextState;
    setIsCameraOn(nextState);
  }, [localStream]);

  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOn(prev => {
      const next = !prev;
      InCallManager.setForceSpeakerphoneOn(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      localStream,
      setLocalStream,
      isRemoteAccessAllowed,
      setIsRemoteAccessAllowed,
      isCameraOn,
      isMicOn,
      isSpeakerOn,
      toggleCamera,
      toggleMic,
      toggleSpeaker,
      cameraPosition,
      setCameraPosition,
      currentEffect,
      setCurrentEffect,
    }),
    [
      localStream,
      isRemoteAccessAllowed,
      isCameraOn,
      isMicOn,
      isSpeakerOn,
      toggleCamera,
      toggleMic,
      toggleSpeaker,
      cameraPosition,
      currentEffect,
    ]
  );

  return (
    <CallContext.Provider value={value}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);

  if (!context) {
    throw new Error(
      'useCall must be used inside CallProvider'
    );
  }

  return context;
};