import { Box, Image, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box
      width="100%"
      height={"calc(100vh - 60px)"}
      overflowX="hidden"
      position="relative"
    >
      <Text
        fontWeight="700"
        fontSize="6xl"
        zIndex={2}
        position="absolute"
        top="50%"
        left={{
          lg: "68%",
          base: "50%",
        }}
        transform={{
          lg: "translate(-0%, -0%)",
          base: "translate(-50%, -50%)",
        }}
        whiteSpace={{
          base: "nowrap",
        }}
        letterSpacing={20}
      >
        歡迎使用
      </Text>
      <Image
        alt="accounting"
        boxSize="100%"
        objectFit="cover"
        objectPosition={{ base: "15% center", lg: "center" }}
        src="https://res.cloudinary.com/datj4og4i/image/upload/v1721707912/calculator-with-coffee-magnifier-document-business-concept_g3hecs.webp"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(247, 247, 247, 0.4)"
        zIndex={1}
      ></Box>
    </Box>
  );
};

export default HomePage;
