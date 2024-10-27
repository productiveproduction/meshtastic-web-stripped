import React from 'react';
import { InboxIcon } from "lucide-react";
import { MessageWithState, useDeviceStore } from '@app/core/stores/deviceStore';
import { useAppStore } from '@app/core/stores/appStore';
import { Message } from '@pagesNEW/chats/Message';
import { MessageInput } from '@pagesNEW/chats/MessageInput';
import { Protobuf, Types } from '@meshtastic/js';
import styled from 'styled-components';
import { TraceRoute } from './TraceRoute';

interface ChannelChatProps {
  messages?: MessageWithState[];
  channel: Types.ChannelNumber;
  to: Types.Destination;
  traceroutes?: Types.PacketMetadata<Protobuf.Mesh.RouteDiscovery>[];
}

export default function ChannelChat({
  messages,
  channel,
  to,
  traceroutes
}: ChannelChatProps) {
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();
  const device = getDevice(selectedDevice);
  const nodes = device?.nodes;

  const renderMessages = () => {
    if (!messages) {
      return (
        <div style={{margin: "auto", textAlign: "center"}}>
          <InboxIcon/>
          <p>No Messages</p>
        </div>
      );
    }

    return messages?.map((message, index) => (
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
        <div style={{margin: "auto"}}>
          <InboxIcon style={{margin: "auto"}} />
          <p>No Traceroutes</p>
        </div>
      );
    }

    return traceroutes.map((traceroute, index) => (
      <TraceRoute
        key={traceroute.id}
        from={nodes?.get(traceroute.from)}
        to={nodes?.get(traceroute.to)}
        route={traceroute.data.route}
      />
    ));
  }
  
  return (
    <Container>
      <MessagesContainer>
        <MessagesColumn>{renderMessages()}</MessagesColumn>
        <TraceroutesColumn $isHidden={traceroutes === undefined}>
          {renderTraceroutes()}
        </TraceroutesColumn>
      </MessagesContainer>
      <InputContainer>
        <MessageInput to={to} channel={channel} />
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 11rem);
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 1rem;
`;

const MessagesColumn = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const TraceroutesColumn = styled.div<{ $isHidden: boolean }>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-left: 1px solid ${props => props.theme.borderColor};
  ${props => props.$isHidden && `
    display: none;
  `}
`;

const InputContainer = styled.div`
  padding: 1.2rem 0.75rem 0.25rem 0.75rem;
`;
