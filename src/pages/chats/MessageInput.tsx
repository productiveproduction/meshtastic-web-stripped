import { useAppStore } from "@app/core/stores/appStore";
import { Button } from "@components/Button.js";
import { Input } from "@components/Input.js";
import { useDevice, useDeviceStore } from "@core/stores/deviceStore.js";
import type { Types } from "@meshtastic/js";
import { SendIcon } from "lucide-react";
import styled from "styled-components";

export interface MessageInputProps {
  to: Types.Destination;
  channel: Types.ChannelNumber;
}

export const MessageInput = ({
  to,
  channel,
}: MessageInputProps): JSX.Element => {
  // const {
  //   connection,
  //   setMessageState,
  //   messageDraft,
  //   setMessageDraft,
  //   hardware,
  // } = useDevice();
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();
  const device = getDevice(selectedDevice);

  const hardware = device?.hardware;
  const connection = device?.connection;
  const messageDraft = device?.messageDraft;

  const myNodeNum = hardware!.myNodeNum;

  const sendText = async (message: string) => {
    await connection
      ?.sendText(message, to, true, channel)
      .then((id) =>
        device?.setMessageState(
          to === "broadcast" ? "broadcast" : "direct",
          channel,
          to as number,
          myNodeNum,
          id,
          "ack",
        ),
      )
      .catch((e: Types.PacketError) =>
        device?.setMessageState(
          to === "broadcast" ? "broadcast" : "direct",
          channel,
          to as number,
          myNodeNum,
          e.id,
          e.error,
        ),
      );
  };

  return (
    <Container>
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendText(messageDraft ?? "!!error!!");
        device?.setMessageDraft("");
      }}
    >
      <InputContainer>
        <InputWrapper>
          <Input
            autoFocus={true}
            minLength={1}
            placeholder="Enter Message"
            value={messageDraft}
            onChange={(e) => device?.setMessageDraft(e.target.value)}
          />
        </InputWrapper>
        <Button $variant="primary">
          <SendIcon size={16} />
        </Button>
      </InputContainer>
    </Form>
  </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Form = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 0.5rem;
`;

const InputWrapper = styled.span`
  width: 100%;
`;
