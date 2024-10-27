import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components'
import Header from '@components/Header'
import Tablist from "@components/Tablist"
import Pages from '@core/utils/routes/Pages';
import { useDeviceStore } from "@core/stores/deviceStore.js";
import { useAppStore } from "@core/stores/appStore.js";
import Connect from './pages/Connect';

export default function App() {
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();

  const device = getDevice(selectedDevice);

  return (
    <>
      <BrowserRouter>
        {device && <Header/>}
        <AppContainer>
          
          {device 
            ? <>
              <Tablist/>
              <Pages/> </>
            : <Connect/>
          }
        </AppContainer>
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