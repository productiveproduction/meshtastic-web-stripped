import { RemoveNodeDialog } from "@componentsOLD/Dialog/RemoveNodeDialog.js";
import { DeviceNameDialog } from "@componentsOLD/Dialog/DeviceNameDialog.js";
import { ImportDialog } from "@componentsOLD/Dialog/ImportDialog.js";
import { QRDialog } from "@componentsOLD/Dialog/QRDialog.js";
import { RebootDialog } from "@componentsOLD/Dialog/RebootDialog.js";
import { ShutdownDialog } from "@componentsOLD/Dialog/ShutdownDialog.js";
import { useDevice } from "@core/stores/deviceStore.js";

export const DialogManager = (): JSX.Element => {
  const { channels, config, dialog, setDialogOpen } = useDevice();
  return (
    <>
      <QRDialog
        open={dialog.QR}
        onOpenChange={(open) => {
          setDialogOpen("QR", open);
        }}
        channels={channels}
        loraConfig={config.lora}
      />
      <ImportDialog
        open={dialog.import}
        onOpenChange={(open) => {
          setDialogOpen("import", open);
        }}
        loraConfig={config.lora}
      />
      <ShutdownDialog
        open={dialog.shutdown}
        onOpenChange={() => {
          setDialogOpen("shutdown", false);
        }}
      />
      <RebootDialog
        open={dialog.reboot}
        onOpenChange={() => {
          setDialogOpen("reboot", false);
        }}
      />
      <DeviceNameDialog
        open={dialog.deviceName}
        onOpenChange={(open) => {
          setDialogOpen("deviceName", open);
        }}
      />
      <RemoveNodeDialog
        open={dialog.nodeRemoval}
        onOpenChange={(open) => {
          setDialogOpen("nodeRemoval", open);
        }}
      />
    </>
  );
};
