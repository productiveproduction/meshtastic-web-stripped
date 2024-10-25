import { DeviceWrapper } from "@app/DeviceWrapper.js";
import { PageRouter } from "@app/PageRouter.js";
import { CommandPalette } from "@componentsOLD/CommandPalette.js";
import { DeviceSelector } from "@componentsOLD/DeviceSelector.js";
import { DialogManager } from "@componentsOLD/Dialog/DialogManager.js";
import { NewDeviceDialog } from "@componentsOLD/Dialog/NewDeviceDialog.js";
import { Toaster } from "@componentsOLD/Toaster.js";
import { useAppStore } from "@core/stores/appStore.js";
import { useDeviceStore } from "@core/stores/deviceStore.js";
import { Dashboard } from "@pagesOLD/Dashboard/index.js";

export const App = (): JSX.Element => {
  const { darkMode } = useAppStore();
  const { getDevice } = useDeviceStore();
  const { selectedDevice, setConnectDialogOpen, connectDialogOpen } =
    useAppStore();

  const device = getDevice(selectedDevice);

  return (
    <div data-theme={darkMode ? "dark" : "light"} data-accent="orange">
      <NewDeviceDialog
        open={connectDialogOpen}
        onOpenChange={(open) => {
          setConnectDialogOpen(open);
        }}
      />
      <Toaster />
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
                <Dashboard />
              )}
            </div>
          </div>
        </div>
      </DeviceWrapper>
    </div>
  );
};
