import React from 'react';
import { InboxIcon } from "lucide-react";
import { useDeviceStore } from '@app/core/stores/deviceStore';
import { useAppStore } from '@app/core/stores/appStore';
import { Subtle } from '@app/components/old/UI/Typography/Subtle';
import { Message } from '@app/components/old/PageComponents/Messages/Message';
import { MessageInput } from '@app/components/old/PageComponents/Messages/MessageInput';

export default function Chats() {
  const to = "broadcast"
  const channel = 0
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();
  const device = getDevice(selectedDevice);
  
  // const channels = device?.channels;
  // const allChannels = Array.from(channels!.values());
  const nodes = device?.nodes;
  // const hardware = device?.hardware;
  const messages = device?.messages.broadcast.get(channel);
  const traceroutes = device?.traceroutes;
  // const connection = device?.connection;


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
        sender={nodes?.get(message.from)}
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
  }

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
}