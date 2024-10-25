import { AmbientLighting } from "@componentsOLD/PageComponents/ModuleConfig/AmbientLighting.js";
import { DetectionSensor } from "@componentsOLD/PageComponents/ModuleConfig/DetectionSensor.js";
import { NeighborInfo } from "@componentsOLD/PageComponents/ModuleConfig/NeighborInfo.js";
import { Audio } from "@componentsOLD/PageComponents/ModuleConfig/Audio.js";
import { CannedMessage } from "@componentsOLD/PageComponents/ModuleConfig/CannedMessage.js";
import { ExternalNotification } from "@componentsOLD/PageComponents/ModuleConfig/ExternalNotification.js";
import { MQTT } from "@componentsOLD/PageComponents/ModuleConfig/MQTT.js";
import { Paxcounter } from "@componentsOLD/PageComponents/ModuleConfig/Paxcounter.js";
import { RangeTest } from "@componentsOLD/PageComponents/ModuleConfig/RangeTest.js";
import { Serial } from "@componentsOLD/PageComponents/ModuleConfig/Serial.js";
import { StoreForward } from "@componentsOLD/PageComponents/ModuleConfig/StoreForward.js";
import { Telemetry } from "@componentsOLD/PageComponents/ModuleConfig/Telemetry.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@componentsOLD/UI/Tabs.js";

export const ModuleConfig = (): JSX.Element => {
  const tabs = [
    {
      label: "MQTT",
      element: MQTT,
    },
    {
      label: "Serial",
      element: Serial,
    },
    {
      label: "Ext Notif",
      element: ExternalNotification,
    },
    {
      label: "S&F",
      element: StoreForward,
    },
    {
      label: "Range Test",
      element: RangeTest,
    },
    {
      label: "Telemetry",
      element: Telemetry,
    },
    {
      label: "Canned",
      element: CannedMessage,
    },
    {
      label: "Audio",
      element: Audio,
    },
    {
      label: "Neighbor Info",
      element: NeighborInfo,
    },
    {
      label: "Ambient Lighting",
      element: AmbientLighting,
    },
    {
      label: "Detection Sensor",
      element: DetectionSensor,
    },
    {
      label: "Paxcounter",
      element: Paxcounter,
    },
  ];

  return (
    <Tabs defaultValue="MQTT">
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
