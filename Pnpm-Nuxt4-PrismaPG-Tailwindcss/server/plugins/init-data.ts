import prisma from "~~/server/lib/prisma";

const lightMintColors = {
  background: "#F8FFF8",
  foreground: "#2C3E2C",
  surface: "#F0FFF0",
  surfaceMuted: "#F5FDF5",
  border: "#D8E8D8",
  muted: "#6C7E6C",
  primary: {
    "50": "#E8F5E9",
    "100": "#C8E6C9",
    "200": "#A5D6A7",
    "300": "#81C784",
    "400": "#66BB6A",
    "500": "#4CAF50",
    "600": "#43A047",
    "700": "#388E3C",
    "800": "#2E7D32",
    "900": "#1B5E20",
    "950": "#0F3D12",
  },
  secondary: {
    "50": "#F8F8F8",
    "100": "#EEEEEE",
    "200": "#DDDDDD",
    "300": "#CCCCCC",
    "400": "#BBBBBB",
    "500": "#AAAAAA",
    "600": "#999999",
    "700": "#777777",
    "800": "#555555",
    "900": "#333333",
    "950": "#111111",
  },
  accent: {
    "50": "#FFFDE7",
    "100": "#FFF9C4",
    "200": "#FFF59D",
    "300": "#FFF176",
    "400": "#FFEE58",
    "500": "#FFEB3B",
    "600": "#FDD835",
    "700": "#FBC02D",
    "800": "#F9A825",
    "900": "#F57F17",
    "950": "#AF5C00",
  },
};

const darkForestColors = {
  background: "#101410",
  foreground: "#E0E0E0",
  surface: "#1E221E",
  surfaceMuted: "#161816",
  border: "#333633",
  muted: "#A0A0A0",
  primary: {
    "50": "#E8F5ED",
    "100": "#C1E0CC",
    "200": "#9AD0AB",
    "300": "#73BF8A",
    "400": "#4AA96B",
    "500": "#4A9B6B",
    "600": "#3F855C",
    "700": "#346F4D",
    "800": "#29593E",
    "900": "#1E432F",
    "950": "#132D20",
  },
  secondary: {
    "50": "#F9FAFB",
    "100": "#F3F4F6",
    "200": "#E5E7EB",
    "300": "#D1D5DB",
    "400": "#9CA3AF",
    "500": "#6B7280",
    "600": "#4B5563",
    "700": "#374151",
    "800": "#1F2937",
    "900": "#111827",
    "950": "#0B0F15",
  },
  accent: {
    "50": "#F7FCEF",
    "100": "#EAF5D8",
    "200": "#DDEEC1",
    "300": "#D0E7AA",
    "400": "#C3E093",
    "500": "#7CB342",
    "600": "#6CA03A",
    "700": "#5C8D32",
    "800": "#4C7A2A",
    "900": "#3C6722",
    "950": "#2C541A",
  },
};

export default defineNitroPlugin(async () => {
  const count = await prisma.theme.count();
  if (count > 0) return;

  await prisma.theme.createMany({
    data: [
      {
        name: "light-mint",
        displayName: "薄荷浅绿",
        mode: "light",
        colors: JSON.stringify(lightMintColors),
        isDefault: true,
        sortOrder: 0,
      },
      {
        name: "dark-forest",
        displayName: "深林暗色",
        mode: "dark",
        colors: JSON.stringify(darkForestColors),
        isDefault: false,
        sortOrder: 1,
      },
    ],
  });
});
