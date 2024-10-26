import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Plus } from 'lucide-react';
import { Button } from '@componentsNEW/Button';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from "@core/stores/appStore.js";
import { useDeviceStore } from "@core/stores/deviceStore.js";
import { subscribeAll } from "@core/subscriptions.js";
import { randId } from "@core/utils/randId.js";
import { BleConnection, Constants } from "@meshtastic/js";
import Loading from '@app/components/NEW/Loading';

export default function Connect() {
  // const [bleDevice, setBleDevice] = useState<BluetoothDevice>();
  const [loading, setLoading] = useState(false);
  const { getDevice, addDevice } = useDeviceStore();
  const { selectedDevice, setSelectedDevice, selectedDeviceName, setSelectedDeviceName } = useAppStore();
  const device = getDevice(selectedDevice);
  const navigate = useNavigate();

  const pairDevice = async () => {
    if (navigator.bluetooth) {
      await navigator.bluetooth
        .requestDevice({
          filters: [{ services: [Constants.ServiceUuid] }],
        })
        .then((device) => {
          setLoading(true);
          // setBleDevice(device)
          setSelectedDeviceName(device.name)
          onConnect(device)
        })
    } else {
      console.error("Web Bluetooth API is not available");
    }
  };

  const onConnect = async (bleDevice: BluetoothDevice) => {
    const id = randId();
    const device = addDevice(id);
    setSelectedDevice(id);

    const connection = new BleConnection(id);
    await connection.connect({
      device: bleDevice,
    });
    device.addConnection(connection);
    subscribeAll(device, connection);

    setLoading(false); 
    navigate('/chats'); 
  };

  return (
    <Container>
      <CardContainer>
        <Card />
        <CardContent>
          <Logo
            src="/LYF-LOGO.jpg"
            alt="Lyf Logo"
            $fetchpriority="high"
            decoding="async"
          />
          <p>{loading ? 'loading...' : 'meshtastic'}</p>
          <p>{selectedDeviceName}</p> 
          {loading && <Loading/>}
        </CardContent>
      </CardContainer>
      {(!loading && !device) && ( // Device NOT connected and not loading
        <ConnectionButton
          $variant="primary"
          size="small"
          onClick={pairDevice}
        >
          <><Plus size={16} /> <span /> New Connection</>
        </ConnectionButton>
      )}

      {/* {(!loading && device) && ( // Device connected and not loading
        <>
          <Button variant="secondary" size="small">
            Unpair
          </Button>
        </>
      )} */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ConnectionButton = styled(Button)`
margin-top: 2rem;
margin-bottom: 2rem;
font-size: 1rem;

span {
  width: 1rem;
}
`

const CardContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  box-shadow: 0 0 2rem var(--theme);
  backdrop-filter: blur(50px);
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Card = styled.div`
  --border-width: 15px;
  --card-height: 40vh;
  --card-width: calc(var(--card-height) / 1.5);
  background: #191c29;
  width: var(--card-width);
  height: var(--card-height);
  padding: 3px;
  position: relative;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-size: 1.5em;
  color: rgb(88 199 250 / 100%);
  cursor: pointer;
  font-family: cursive;
  clip-path: polygon(0% 0%, 0% 100%, 3% 100%, 3% 3%, 97% 3%, 97% 97%, 3% 97%, 3% 100%, 100% 100%, 100% 0);

  &::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(
      132deg,
      #fff,
      #fff 43%,
      var(--theme)
    );
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    filter: blur(calc(var(--card-height) / 6));
    animation: ${spin} 2.5s linear infinite;
  }

  &::after {
    position: absolute;
    content: "";
    top: calc(var(--card-height) / 6);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(
      132deg,
      #fff,
      #fff 43%,
      #fff
    );
    opacity: 1;
    transition: opacity 0.5s;
    animation: ${spin} 2.5s linear infinite;
  }
`;

const CardContent = styled.div`
  color: var(--primary-foreground);
  width: 96.5%;
  height: 96.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: var(--primary-foreground);

  & p {
    color: black;
  }

  p:nth-child(2) {
    margin-bottom: 50%;
  }
  p:nth-child(3) {
    margin-top: 20%;
  }
`;

const Logo = styled.img<{ $fetchpriority: string }>`
  position: absolute;
  width: 5rem;
  height: 5rem;
  cursor: none;
`;
