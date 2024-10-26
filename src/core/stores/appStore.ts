import { produce } from "immer";
import { create } from "zustand";

export type AccentColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

interface AppState {
  selectedDevice: number;
  devices: {
    id: number;
    num: number;
  }[];
  commandPaletteOpen: boolean;
  darkMode: boolean;
  nodeNumToBeRemoved: number;
  accent: AccentColor;
  connectDialogOpen: boolean;

  setSelectedDevice: (deviceId: number) => void;
  addDevice: (device: { id: number; num: number }) => void;
  removeDevice: (deviceId: number) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
  setNodeNumToBeRemoved: (nodeNum: number) => void;
  setAccent: (color: AccentColor) => void;
  setConnectDialogOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  selectedDevice: 0,
  devices: [],
  currentPage: "messages",
  commandPaletteOpen: false,
  darkMode:
    localStorage.getItem("theme-dark") !== null
      ? localStorage.getItem("theme-dark") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
  accent: "orange",
  connectDialogOpen: false,
  nodeNumToBeRemoved: 0,

  setSelectedDevice: (deviceId) =>
    set(() => ({
      selectedDevice: deviceId,
    })),
  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
    })),
  removeDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== deviceId),
    })),
  setCommandPaletteOpen: (open: boolean) => {
    set(
      produce<AppState>((draft) => {
        draft.commandPaletteOpen = open;
      }),
    );
  },
  setDarkMode: (enabled: boolean) => {
    localStorage.setItem("theme-dark", enabled.toString());
    set(
      produce<AppState>((draft) => {
        draft.darkMode = enabled;
      }),
    );
  },
  setNodeNumToBeRemoved: (nodeNum) =>
    set((state) => ({
      nodeNumToBeRemoved: nodeNum,
    })),
  setAccent(color) {
    set(
      produce<AppState>((draft) => {
        draft.accent = color;
      }),
    );
  },
  setConnectDialogOpen: (open: boolean) => {
    set(
      produce<AppState>((draft) => {
        draft.connectDialogOpen = open;
      }),
    );
  },
}));
