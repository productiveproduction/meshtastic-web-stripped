import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'
import Header from '@componentsNEW/Header'
import Tablist from "@componentsNEW/Tablist"
import Pages from '@core/utils/routes/Pages';
import { DeviceContext, useDeviceStore } from "@core/stores/deviceStore.js";
import { useAppStore } from "@core/stores/appStore.js";
import Connect from './pages/NEW/Connect';

export default function App() {
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();

  const device = getDevice(selectedDevice);

  return (
    <>
      <BrowserRouter>
        <DeviceContext.Provider value={device}>
          {device && <Header/>}
          <AppContainer>
            
            {device 
              ? <>
                <Tablist/>
                <Pages/> </>
              : <Connect/>
            }
          </AppContainer>
        </DeviceContext.Provider>
      </BrowserRouter>
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  width: 100%;
`