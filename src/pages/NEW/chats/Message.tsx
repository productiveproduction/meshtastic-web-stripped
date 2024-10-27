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
    const IconComponent = message.state === "ack" 
      ? CheckCircle2Icon 
      : message.state === "waiting" 
        ? CircleEllipsisIcon 
        : AlertCircleIcon;

    return (
      <IconWrapper>
        <IconComponent size={16} />
      </IconWrapper>
    );
  };

  const renderMessageContent = () => {
    return (
      <MessageContent $isAcknowledged={message.state === "ack"}>
        {message.data}
      </MessageContent>
    );
  };

  return lastMsgSameUser ? (
    <MessageContainer $lastMsgSameUser={lastMsgSameUser}>
      {renderIcon()}
      {renderMessageContent()}
    </MessageContainer>
  ) : (
    <MessageContainer $lastMsgSameUser={lastMsgSameUser}>
      <UserInfoContainer>
        <HashiconWrapper>
          <Hashicon value={(sender?.num ?? 0).toString()} size={24} />
        </HashiconWrapper>
        <UserName>
          {sender?.user?.longName ?? "UNK"}
        </UserName>
        <TimeStamp>
          {message.rxTime.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TimeStamp>
      </UserInfoContainer>
      <MessageRow>
        {renderIcon()}
        {renderMessageContent()}
      </MessageRow>
    </MessageContainer>
  );
};

const MessageContainer = styled.div<{ $lastMsgSameUser: boolean }>`
  ${props => props.$lastMsgSameUser ? `
    margin-left: 1.25rem;
    display: flex;
  ` : `
    margin: 0.5rem 1rem 0 1rem;
    gap: 0.5rem;
  `}
`;

const IconWrapper = styled.div`
  margin: auto 0;
  color: ${props => props.theme.textSecondary};
`;

const MessageContent = styled.span<{ $isAcknowledged: boolean }>`
  margin-left: 1rem;
  border-left: 2px solid ${props => props.theme.backgroundPrimary};
  padding-left: 0.5rem;
  color: ${props => props.$isAcknowledged ? props.theme.textPrimary : props.theme.textSecondary};
`;

const UserInfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HashiconWrapper = styled.div`
  width: 1.5rem;
  cursor: pointer;
`;

const UserName = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.theme.textPrimary};
`;

const TimeStamp = styled.span`
  margin-top: 0.25rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: ${props => props.theme.textSecondary};
`;

const MessageRow = styled.div`
  margin-left: 0.25rem;
  display: flex;
`;
