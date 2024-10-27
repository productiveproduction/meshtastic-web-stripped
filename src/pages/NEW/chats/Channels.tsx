import React from 'react'
import ChannelChat from './ChannelChat'
import { useDeviceStore } from '@app/core/stores/deviceStore';
import { useAppStore } from '@app/core/stores/appStore';
import { Types } from '@meshtastic/js';

export default function Channels() {
  const { getDevice } = useDeviceStore();
  const { selectedDevice } = useAppStore();
  const device = getDevice(selectedDevice);

  const to = "broadcast"
  const channel = Types.ChannelNumber.Primary;
  const messages = device?.messages.broadcast.get(channel);

  return (
    device &&
    <ChannelChat to={to} channel={channel} messages={messages}/>
  )
}
