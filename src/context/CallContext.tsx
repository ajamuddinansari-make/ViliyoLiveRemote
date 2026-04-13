import React, { createContext, useContext, useState } from 'react';
import { MediaStream } from 'react-native-webrtc';

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
  setIsCameraOn: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isMicOn: boolean;
  setIsMicOn: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  isSpeakerOn: boolean;
  setIsSpeakerOn: React.Dispatch<
    React.SetStateAction<boolean>
  >;

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

  return (
    <CallContext.Provider
      value={{
        localStream,
        setLocalStream,
        isRemoteAccessAllowed,
        setIsRemoteAccessAllowed,
        isCameraOn,
        setIsCameraOn,
        isMicOn,
        setIsMicOn,
        isSpeakerOn,
        setIsSpeakerOn,
        cameraPosition,
        setCameraPosition,
        currentEffect,
        setCurrentEffect,
      }}
    >
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