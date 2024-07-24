//有使用到 hook的 component要確認是客戶端渲染
"use client";

import {
  Box,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Select,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Transaction } from "../type";
import { auth } from "@/app/ lib/firebase";
import React, { useEffect, useState } from "react";

interface AddTransactionProps {
  isAdding: boolean;
  addTransaction: (
    newTransaction: Omit<Transaction, "id" | "userId" | "createdAt">
  ) => Promise<string | undefined>;
}

const AddTransaction = ({ isAdding, addTransaction }: AddTransactionProps) => {
  //監聽項目名稱、金額、類型
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");

  //驗證表單輸入錯誤
  const [itemError, setItemError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const toast = useToast();

  //驗證金額輸入是否為有效數字
  const validateForm = () => {
    let newItemError = "";
    let newAmountError = "";
    let formIsValid = true;

    // 只有當項目名稱不為空但無效時才顯示錯誤
    if (item.trim() !== "" && item.trim().length < 2) {
      newItemError = "項目名稱至少需要2個字符";
      formIsValid = false;
    }

    // 只有當金額不為空但無效時才顯示錯誤
    if (amount.trim() !== "") {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        newAmountError = "請輸入有效的金額";
        formIsValid = false;
      }
    }

    // 檢查表單是否填寫完整
    if (item.trim() === "" || amount.trim() === "") {
      formIsValid = false;
    }

    setItemError(newItemError);
    setAmountError(newAmountError);
    setIsValid(formIsValid);
  };

  useEffect(() => {
    validateForm();
  }, [item, amount]);

  //處理表單送出
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !auth.currentUser) return;

    //確保金額是正數
    const amountNum = Math.abs(parseInt(amount));

    //新增收支紀錄
    try {
      const result = await addTransaction({
        item,
        amount: amountNum,
        type,
      });

      //如果成功，彈出成功 toast通知
      if (result) {
        toast({
          title: "收支紀錄已新增",
          variant: "subtle",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setItem("");
        setAmount("");
        setType("expense");
      }
    } catch (error) {
      toast({
        title: "新增收支紀錄失敗",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const focusStyles = {
    borderColor: "purple.500",
    boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)",
  };

  return (
    <Box alignSelf="flex-start" width="100%">
      <Text
        fontSize="xl"
        fontWeight="700"
        textAlign="left"
        py={2}
        borderBottom="1px solid #bbb"
      >
        新增收支紀錄
      </Text>
      <VStack as="form" onSubmit={handleSubmit}>
        <HStack
          my={2}
          width="100%"
          spacing={{
            lg: "15px",
            base: "5px",
          }}
          justifyContent="space-between"
          alignItems="center"
          height="100px"
        >
          <FormControl flex="0.5" height="80px">
            <FormLabel>類型</FormLabel>
            <Select
              bg="white"
              height="50px"
              borderRadius={0}
              _focus={focusStyles}
              value={type}
              onChange={(e) => setType(e.target.value as "expense" | "income")}
            >
              <option value="expense">支出</option>
              <option value="income">收入</option>
            </Select>
          </FormControl>

          {/* 將itemError轉換成布林值 */}
          <FormControl flex="1" isInvalid={!!itemError} height="80px">
            <FormLabel>項目名稱</FormLabel>
            <Input
              borderRadius={0}
              bg="white"
              type="text"
              placeholder="請輸入項目名稱"
              height="50px"
              _focus={focusStyles}
              value={item}
              onChange={(e) => setItem(e.target.value)}
            ></Input>
            <FormErrorMessage>{itemError}</FormErrorMessage>
          </FormControl>

          <FormControl flex="0.5" isInvalid={!!amountError} height="80px">
            <FormLabel>項目金額</FormLabel>
            <Input
              borderRadius={0}
              bg="white"
              type="number"
              placeholder="請輸入項目金額"
              height="50px"
              _focus={focusStyles}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
              step="1"
            />
            <FormErrorMessage>{amountError}</FormErrorMessage>
          </FormControl>
        </HStack>
        <Button
          borderRadius={0}
          my={4}
          height="50px"
          width="100%"
          alignSelf="flex-end"
          type="submit"
          colorScheme="purple"
          isLoading={isAdding}
          loadingText="新增中..."
          isDisabled={!isValid}
        >
          新增
        </Button>
      </VStack>
    </Box>
  );
};

export default AddTransaction;
