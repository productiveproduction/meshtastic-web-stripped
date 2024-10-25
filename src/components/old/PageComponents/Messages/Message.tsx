import styled from 'styled-components';
import type { MessageWithState } from "@app/core/stores/deviceStore.js";
import { Hashicon } from "@emeraldpay/hashicon-react";
import type { Protobuf } from "@meshtastic/js";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CircleEllipsisIcon,
} from "lucide-react";

export interface MessageProps {
  lastMsgSameUser: boolean;
  message: MessageWithState;
  sender?: Protobuf.Mesh.NodeInfo;
}


export const Message = ({
  lastMsgSameUser,
  message,
  sender,
}: MessageProps): JSX.Element => {
  const renderIcon = () => {
    switch (message.state) {
      case "ack":
        return <CheckCircle2Icon size={16} />;
      case "waiting":
        return <CircleEllipsisIcon size={16} />;
      default:
        return <AlertCircleIcon size={16} />;
    }
  };

  return lastMsgSameUser ? (
    <MessageContainer lastMsgSameUser={lastMsgSameUser}>
      <IconContainer>{renderIcon()}</IconContainer>
      <MessageContent messageState={message.state}>{message.data}</MessageContent>
    </MessageContainer>
  ) : (
    <div className="mx-4 mt-2 gap-2"> {/* You can keep this div if needed */}
      <SenderInfoContainer>
        <HashiconContainer>
          <Hashicon value={(sender?.num ?? 0).toString()} size={32} />
        </HashiconContainer>
        <SenderName>{sender?.user?.longName ?? "UNK"}</SenderName>
        <Timestamp>
          {message.rxTime.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Timestamp>
      </SenderInfoContainer>
      <MessageContainer lastMsgSameUser={lastMsgSameUser}>
        <IconContainer>{renderIcon()}</IconContainer>
        <MessageContent messageState={message.state}>{message.data}</MessageContent>
      </MessageContainer>
    </div>
  );
};




const MessageContainer = styled.div`
  margin-left: ${({ lastMsgSameUser }) => (lastMsgSameUser ? '2.5rem' : '2rem')};
  margin-top: ${({ lastMsgSameUser }) => (lastMsgSameUser ? '0' : '1rem')};
  display: flex;
  gap: 0.5rem; 
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically center the icon */
  svg { /* Target the lucide-react icon */
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MessageContent = styled.span`
  margin-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};;
  padding-left: 0.5rem;
  color: ${({ messageState }) =>
    messageState === 'ack' ? 'textPrimary' : 'textSecondary'}; 
`;

const SenderInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem; /* Add some space between sender info and message */
`;

const SenderName = styled.span`
  cursor: pointer;
  font-weight: 500; 
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Timestamp = styled.span`
  margin-top: 0.25rem;
  font-family: monospace;
  font-size: 0.75rem; 
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HashiconContainer = styled.div`
  width: 3rem;
  cursor: pointer;
`;