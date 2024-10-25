import { Bluetooth } from "@componentsOLD/PageComponents/Config/Bluetooth.js";
import { Device } from "@componentsOLD/PageComponents/Config/Device.js";
import { Display } from "@componentsOLD/PageComponents/Config/Display.js";
import { LoRa } from "@componentsOLD/PageComponents/Config/LoRa.js";
import { Network } from "@componentsOLD/PageComponents/Config/Network.js";
import { Position } from "@componentsOLD/PageComponents/Config/Position.js";
import { Power } from "@componentsOLD/PageComponents/Config/Power.js";
import { Security } from "@componentsOLD/PageComponents/Config/Security.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@componentsOLD/UI/Tabs.js";
import { useDevice } from "@core/stores/deviceStore.js";

export const DeviceConfig = (): JSX.Element => {
  const { metadata } = useDevice();

  const tabs = [
    {
      label: "Device",
      element: Device,
      count: 0,
    },
    {
      label: "Position",
      element: Position,
    },
    {
      label: "Power",
      element: Power,
    },
    {
      label: "Network",
      element: Network,
      // disabled: !metadata.get(0)?.hasWifi,
    },
    {
      label: "Display",
      element: Display,
    },
    {
      label: "LoRa",
      element: LoRa,
    },
    {
      label: "Bluetooth",
      element: Bluetooth,
    },
    {
      label: "Security",
      element: Security,
    },
  ];

  return (
    <Tabs defaultValue="Device">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          <tab.element />
        </TabsContent>
      ))}
    </Tabs>
  );
};
