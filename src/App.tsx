import { DeviceWrapper } from "@app/DeviceWrapper.js";
import { PageRouter } from "@app/PageRouter.js";
import { CommandPalette } from "@componentsOLD/CommandPalette.js";
import { DeviceSelector } from "@componentsOLD/DeviceSelector.js";
import { DialogManager } from "@componentsOLD/Dialog/DialogManager.js";
import { NewDeviceDialog } from "@componentsOLD/Dialog/NewDeviceDialog.js";
import { Toaster } from "@componentsOLD/Toaster.js";
import Footer from "@componentsOLD/UI/Footer.js";
import { ThemeController } from "@componentsOLD/generic/ThemeController.js";
import { useAppStore } from "@core/stores/appStore.js";
import { useDeviceStore } from "@core/stores/deviceStore.js";
import { Dashboard } from "@pagesOLD/Dashboard/index.js";
import { MapProvider } from "react-map-gl";

export const App = (): JSX.Element => {
  const { getDevice } = useDeviceStore();
  const { selectedDevice, setConnectDialogOpen, connectDialogOpen } =
    useAppStore();

  const device = getDevice(selectedDevice);

  return (
    <ThemeController>
      <NewDeviceDialog
        open={connectDialogOpen}
        onOpenChange={(open) => {
          setConnectDialogOpen(open);
        }}
      />
      <Toaster />
      <MapProvider>
        <DeviceWrapper device={device}>
          <div className="flex h-screen flex-col overflow-hidden bg-backgroundPrimary text-textPrimary">
            <div className="flex flex-grow">
              <DeviceSelector />
              <div className="flex flex-grow flex-col">
                {device ? (
                  <div className="flex h-screen">
                    <DialogManager />
                    <CommandPalette />
                    <PageRouter />
                  </div>
                ) : (
                  <>
                    <Dashboard />
                    <div className="flex flex-grow" />
                    <Footer />
                  </>
                )}
              </div>
            </div>
          </div>
        </DeviceWrapper>
      </MapProvider>
    </ThemeController>
  );
};
