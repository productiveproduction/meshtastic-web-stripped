import { useDevice } from "@core/stores/deviceStore.js";
import { ChannelsPage } from "@pagesOLD/Channels.js";
import { ConfigPage } from "@pagesOLD/Config/index.js";
import { MessagesPage } from "@pagesOLD/Messages.js";
import { NodesPage } from "@pagesOLD/Nodes.js";

export const PageRouter = (): JSX.Element => {
  const { activePage } = useDevice();
  return (
    <>
      {activePage === "messages" && <MessagesPage />}
      {activePage === "config" && <ConfigPage />}
      {activePage === "channels" && <ChannelsPage />}
      {activePage === "nodes" && <NodesPage />}
    </>
  );
};
