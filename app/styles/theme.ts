import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "var(--font-poppins), var(--font-noto-sans-tc), sans-serif",
    body: "var(--font-poppins), var(--font-noto-sans-tc), sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "#f7f7f7",
        color: "#555",
      },
      // 重置所有元素的邊框和輪廓
      "*": {
        borderColor: "gray.200",
        outline: "none",
      },
      // 特別處理分隔線
      hr: {
        borderColor: "gray.200",
      },
    },
  },
});

export default theme;
