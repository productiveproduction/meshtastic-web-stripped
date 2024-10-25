import { Subtle } from "@componentsOLD/UI/Typography/Subtle.js";
import {
  type MessageWithState,
  useDevice,
} from "@app/core/stores/deviceStore.js";
import { Message } from "@componentsOLD/PageComponents/Messages/Message.js";
import { MessageInput } from "@componentsOLD/PageComponents/Messages/MessageInput.js";
import { TraceRoute } from "@componentsOLD/PageComponents/Messages/TraceRoute.js";
import type { Protobuf, Types } from "@meshtastic/js";
import { InboxIcon } from "lucide-react";

export interface ChannelChatProps {
  messages?: MessageWithState[];
  channel: Types.ChannelNumber;
  to: Types.Destination;
  traceroutes?: Types.PacketMetadata<Protobuf.Mesh.RouteDiscovery>[];
}

export const ChannelChat = ({
  messages,
  channel,
  to,
  traceroutes,
}: ChannelChatProps): JSX.Element => {
  const { nodes } = useDevice();

  const renderMessages = () => {
    if (!messages) {
      return (
        <div className="m-auto">
          <InboxIcon className="m-auto" />
          <Subtle>No Messages</Subtle>
        </div>
      );
    }

    return messages.map((message, index) => (
      <Message
        key={message.id}
        message={message}
        lastMsgSameUser={
          index === 0 ? false : messages[index - 1].from === message.from
        }
        sender={nodes.get(message.from)}
      />
    ));
  };

  const renderTraceroutes = () => {
    if (to === "broadcast" || !traceroutes) {
      return (
        <div className="m-auto">
          <InboxIcon className="m-auto" />
          <Subtle>No Traceroutes</Subtle>
        </div>
      );
    }

    return traceroutes.map((traceroute, index) => (
      <TraceRoute
        key={traceroute.id}
        from={nodes.get(traceroute.from)}
        to={nodes.get(traceroute.to)}
        route={traceroute.data.route}
      />
    ));
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-grow">
        <div className="flex flex-grow flex-col">{renderMessages()}</div>
        <div
          className={`flex flex-grow flex-col border-slate-400 border-l ${traceroutes === undefined ? "hidden" : ""}`}
        >
          {renderTraceroutes()}
        </div>
      </div>
      <div className="pl-3 pr-3 pt-3 pb-1">
        <MessageInput to={to} channel={channel} />
      </div>
    </div>
  );
};
