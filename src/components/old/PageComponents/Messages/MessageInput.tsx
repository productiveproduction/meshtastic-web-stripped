import { useAppStore } from "@app/core/stores/appStore";
import { Button } from "@componentsOLD/UI/Button.js";
import { Input } from "@componentsOLD/UI/Input.js";
import { useDevice, useDeviceStore } from "@core/stores/deviceStore.js";
import type { Types } from "@meshtastic/js";
import { SendIcon } from "lucide-react";

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
    <div className="flex gap-2">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          sendText(messageDraft ?? "!!error!!");
          device?.setMessageDraft("");
        }}
      >
        <div className="flex flex-grow gap-2">
          <span className="w-full">
            <Input
              autoFocus={true}
              minLength={1}
              placeholder="Enter Message"
              value={messageDraft}
              onChange={(e) => device?.setMessageDraft(e.target.value)}
            />
          </span>
          <Button type="submit">
            <SendIcon size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};
