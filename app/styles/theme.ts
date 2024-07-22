import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "var(--font-poppins), var(--font-noto-sans-tc), sans-serif",
    body: "var(--font-poppins), var(--font-noto-sans-tc), sans-serif",
  },
});

export default theme;
