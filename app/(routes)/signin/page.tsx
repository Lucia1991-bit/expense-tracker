"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { auth } from "@/app/ lib/firebase";
import {
  AuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import OAuth from "@/app/components/OAuth";

type AlertStatus = "error" | "success";

interface AlertInfo {
  status: AlertStatus;
  title: string;
  message: string;
}

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const router = useRouter();

  //firebase auth 錯誤 code
  const handleFirebaseError = (error: AuthError): string => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "此信箱已被使用";
      case "auth/invalid-email":
        return "信箱格式不正確";
      case "auth/weak-password":
        return "密碼強度不足，密碼應至少為 6 個字母";
      case "auth/user-not-found":
        return "此信箱不存在";
      case "auth/wrong-password":
        return "密碼錯誤";
      case "auth/invalid-credential":
        return "信箱或密碼不正確，請重新輸入";
      default:
        return "發生未知錯誤，請稍後再試";
    }
  };

  // 送出註冊表單
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //createUserWithEmailAndPassword 方法在成功註冊後會自動登入用戶
      await createUserWithEmailAndPassword(auth, email, password);

      // 註冊成功後立即登出
      await auth.signOut();

      setAlertInfo({
        status: "success",
        title: "註冊成功",
        message: "歡迎加入！您現在可以登入了",
      });

      setIsLoading(false);
      setEmail("");
      setPassword("");
      router.push("/signin");
    } catch (error) {
      const errorMessage = handleFirebaseError(error as AuthError);
      setAlertInfo({
        status: "error",
        title: "註冊失敗",
        message: errorMessage,
      });
      setIsLoading(false);
    }
  };

  //送出登入表單
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertInfo({
        status: "success",
        title: "登入成功",
        message: "請稍候，為您跳轉至會員頁面",
      });
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push("/accounting");
      }, 500);
    } catch (error) {
      const errorMessage = handleFirebaseError(error as AuthError);
      setAlertInfo({
        status: "error",
        title: "登入失敗",
        message: errorMessage,
      });
      setIsLoading(false);
    }
  };

  const focusStyles = {
    outline: "none",
    boxShadow: "none",
    borderColor: "purple.500",
  };

  return (
    <Box
      maxWidth="600px"
      minWidth="300px"
      width="600px"
      margin="auto"
      mt="100px"
    >
      {alertInfo && (
        <Alert status={alertInfo.status} mb={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>{alertInfo.title}</AlertTitle>
            <AlertDescription>{alertInfo.message}</AlertDescription>
          </Box>
        </Alert>
      )}
      <Tabs isFitted variant="line" colorScheme="purple">
        <TabList mb="1em">
          <Tab>註冊</Tab>
          <Tab>登入</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack as="form" spacing={8} py={10} onSubmit={handleSignUp}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" height="50px">
                    <EmailIcon color="purple.500" fontSize="20px" />
                  </InputLeftElement>
                  <Input
                    value={email}
                    type="email"
                    placeholder="請輸入電子信箱"
                    height="50px"
                    isRequired
                    bg="white"
                    _focus={focusStyles}
                    borderRadius={0}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" height="50px">
                    <LockIcon color="purple.500" fontSize="20px" />
                  </InputLeftElement>
                  <Input
                    value={password}
                    type="password"
                    placeholder="請輸入密碼(至少6個字母)"
                    height="50px"
                    isRequired
                    bg="white"
                    _focus={focusStyles}
                    borderRadius={0}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                height="50px"
                borderRadius={0}
                isLoading={isLoading}
              >
                註冊
              </Button>
              <OAuth></OAuth>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack as="form" spacing={8} py={10} onSubmit={handleSignIn}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" height="50px">
                    <EmailIcon color="purple.500" fontSize="20px" />
                  </InputLeftElement>
                  <Input
                    value={email}
                    type="email"
                    placeholder="請輸入電子信箱"
                    height="50px"
                    isRequired
                    bg="white"
                    _focus={focusStyles}
                    borderRadius={0}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" height="50px">
                    <LockIcon color="purple.500" fontSize="20px" />
                  </InputLeftElement>
                  <Input
                    value={password}
                    type="password"
                    placeholder="請輸入密碼"
                    height="50px"
                    isRequired
                    bg="white"
                    _focus={focusStyles}
                    borderRadius={0}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <FormErrorMessage>Email is required.</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                height="50px"
                borderRadius={0}
                isLoading={isLoading}
              >
                登入
              </Button>
              <OAuth></OAuth>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SigninPage;
