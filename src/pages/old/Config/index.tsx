import { useDevice } from "@app/core/stores/deviceStore.js";
import { PageLayout } from "@componentsOLD/PageLayout.js";
import { Sidebar } from "@componentsOLD/Sidebar.js";
import { SidebarSection } from "@componentsOLD/UI/Sidebar/SidebarSection.js";
import { SidebarButton } from "@componentsOLD/UI/Sidebar/sidebarButton.js";
import { useToast } from "@core/hooks/useToast.js";
import { DeviceConfig } from "@pagesOLD/Config/DeviceConfig.js";
import { ModuleConfig } from "@pagesOLD/Config/ModuleConfig.js";
import { BoxesIcon, SaveIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

export const ConfigPage = (): JSX.Element => {
  const { workingConfig, workingModuleConfig, connection } = useDevice();
  const [activeConfigSection, setActiveConfigSection] = useState<
    "device" | "module"
  >("device");
  const { toast } = useToast();

  return (
    <>
      <Sidebar>
        <SidebarSection label="Config Sections">
          <SidebarButton
            label="Radio Config"
            active={activeConfigSection === "device"}
            onClick={() => setActiveConfigSection("device")}
            Icon={SettingsIcon}
          />
          <SidebarButton
            label="Module Config"
            active={activeConfigSection === "module"}
            onClick={() => setActiveConfigSection("module")}
            Icon={BoxesIcon}
          />
        </SidebarSection>
      </Sidebar>
      <PageLayout
        label={
          activeConfigSection === "device" ? "Radio Config" : "Module Config"
        }
        actions={[
          {
            icon: SaveIcon,
            async onClick() {
              if (activeConfigSection === "device") {
                workingConfig.map(
                  async (config) =>
                    await connection?.setConfig(config).then(() =>
                      toast({
                        title: `Config ${config.payloadVariant.case} saved`,
                      }),
                    ),
                );
              } else {
                workingModuleConfig.map(
                  async (moduleConfig) =>
                    await connection?.setModuleConfig(moduleConfig).then(() =>
                      toast({
                        title: `Config ${moduleConfig.payloadVariant.case} saved`,
                      }),
                    ),
                );
              }

              await connection?.commitEditSettings();
            },
          },
        ]}
      >
        {activeConfigSection === "device" ? <DeviceConfig /> : <ModuleConfig />}
      </PageLayout>
    </>
  );
};
