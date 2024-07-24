"use client";

import { Button, Link as ChakraLink, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "../ lib/firebase";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLogin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsLogin(false);
      router.replace("/");
    } catch (error) {
      console.error("登出錯誤:", error);
    }
  };

  return (
    <HStack
      bg="#f7f7f7"
      color="#555"
      px={{
        lg: "100px",
        base: "25px",
      }}
      py={4}
      width="100%"
      justifyContent="space-between"
      height="60px"
      boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
      position="fixed"
      zIndex={100}
    >
      <Link href="/" passHref>
        <ChakraLink
          as="span"
          fontWeight="600"
          _hover={{
            color: "purple.500",
            textDecoration: "none",
          }}
        >
          記帳小幫手
        </ChakraLink>
      </Link>
      <HStack spacing={10}>
        {isLogin ? (
          <>
            <Link href="/accounting" passHref>
              <ChakraLink
                as="span"
                fontWeight="600"
                _hover={{
                  color: "purple.500",
                  textDecoration: "none",
                }}
              >
                您的收支紀錄
              </ChakraLink>
            </Link>
            <Button
              color="#555"
              fontWeight="600"
              _hover={{
                color: "purple.500",
                textDecoration: "none",
              }}
              onClick={handleSignOut}
              variant="link"
            >
              登出
            </Button>
          </>
        ) : (
          <Link href="/signin" passHref>
            <ChakraLink
              as="span"
              fontWeight="600"
              _hover={{
                color: "purple.500",
                textDecoration: "none",
              }}
            >
              註冊/登入
            </ChakraLink>
          </Link>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
