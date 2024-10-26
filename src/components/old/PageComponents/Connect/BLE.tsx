import type { TabElementProps } from "@componentsOLD/Dialog/NewDeviceDialog";
import { Button } from "@componentsOLD/UI/Button.js";
import { Mono } from "@componentsOLD/generic/Mono.js";
import { useAppStore } from "@core/stores/appStore.js";
import { useDeviceStore } from "@core/stores/deviceStore.js";
import { subscribeAll } from "@core/subscriptions.js";
import { randId } from "@core/utils/randId.js";
import { BleConnection, Constants } from "@meshtastic/js";
import { useCallback, useEffect, useState } from "react";

export const BLE = ({ closeDialog }: TabElementProps): JSX.Element => {
  const [bleDevices, setBleDevices] = useState<BluetoothDevice[]>([]);
  const { addDevice } = useDeviceStore();
  const { setSelectedDevice } = useAppStore();

  const updateBleDeviceList = useCallback(async (): Promise<void> => {
    if (
      navigator.bluetooth &&
      typeof navigator.bluetooth.getDevices === "function"
    ) {
      setBleDevices(await navigator.bluetooth.getDevices());
    } else {
      console.error("Web Bluetooth API is not available");
    }
  }, []);

  useEffect(() => {
    updateBleDeviceList();
  }, [updateBleDeviceList]);

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

    closeDialog();
  };

  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <div className="flex h-48 flex-col gap-2 overflow-y-auto">
        {bleDevices.map((device) => (
          <Button
            key={device.id}
            onClick={() => {
              onConnect(device);
            }}
          >
            {device.name}
          </Button>
        ))}
        {bleDevices.length === 0 && (
          <Mono className="m-auto select-none">No devices paired yet.</Mono>
        )}
      </div>
      <Button
        onClick={async () => {
          if (navigator.bluetooth) {
            await navigator.bluetooth
              .requestDevice({
                filters: [{ services: [Constants.ServiceUuid] }],
              })
              .then((device) => {
                const exists = bleDevices.findIndex((d) => d.id === device.id);
                if (exists === -1) {
                  setBleDevices(bleDevices.concat(device));
                }
              });
          } else {
            console.error("Web Bluetooth API is not available");
          }
        }}
      >
        <span>New device</span>
      </Button>
    </div>
  );
};
