import {
  AbsoluteCenter,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/app/ lib/firebase";
import { GoogleAuthProvider, signInWithPopup, AuthError } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface AlertInfo {
  status: "error" | "success";
  title: string;
  message: string;
}

const OAuth = () => {
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.displayName);
      setAlertInfo({
        status: "success",
        title: "登入成功",
        message: "歡迎使用記帳小幫手！",
      });
      setTimeout(() => {
        router.push("/accounting");
      }, 800);
    } catch (error) {
      console.error("Google登入錯誤:", error);
      setAlertInfo({
        status: "error",
        title: "登入失敗",
        message: "登入時發生未知錯誤，請稍後再試",
      });
    }
  };

  return (
    <>
      {alertInfo && (
        <Alert status={alertInfo.status} mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>{alertInfo.title}</AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Box position="relative" py={10} width="full">
        <Divider borderWidth="1px" width="100%" />
        <AbsoluteCenter bg={"#f7f7f7"} px="4">
          <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
            或使用以下方式登入
          </Text>
        </AbsoluteCenter>
      </Box>
      <HStack mt="-10px">
        <IconButton
          boxShadow="md"
          size="lg"
          bg="white"
          borderRadius="50%"
          aria-label="google"
          icon={<FcGoogle fontSize="30px" />}
          onClick={handleGoogleSignIn}
        />
      </HStack>
    </>
  );
};

export default OAuth;
