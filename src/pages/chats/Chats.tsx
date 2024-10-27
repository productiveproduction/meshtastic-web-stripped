import React, { useEffect } from 'react'
import { useDeviceStore } from '@app/core/stores/deviceStore';
import { useAppStore } from '@app/core/stores/appStore';
import ChannelChat from './ChannelChat';
import { Types } from '@meshtastic/js';

export default function Chats() {
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();
  const device = getDevice(selectedDevice);

  const nodes = device?.nodes;
  const hardware = device?.hardware;
  const traceroutes = device?.traceroutes;

  const filteredNodes = Array.from(nodes!.values()).filter(
    (n) => n.num !== hardware!.myNodeNum,
  );

  const to = filteredNodes[0].num
  const channel = Types.ChannelNumber.Primary
  const messages = device?.messages.direct.get(to)

  return (
    device &&
    <ChannelChat 
      to={to} 
      channel={channel} 
      messages={messages} 
      traceroutes={traceroutes?.get(to)}
    />
  )
}
