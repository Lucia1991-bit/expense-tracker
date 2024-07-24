import { Box, Text } from "@chakra-ui/react";
import { Transaction } from "../type";
import React from "react";

//定義 props資料類型
interface BalanceProps {
  transactions: Transaction[];
}

const Balance = ({ transactions }: BalanceProps) => {
  //根據收支類型計算總和
  const total = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.amount;
    } else {
      return acc - transaction.amount;
    }
  }, 0);

  //總和是正數還是負數
  const isPositive = total >= 0;

  return (
    <Box alignSelf="flex-start" mt={5}>
      <Text>您的收支</Text>
      <Text fontSize="4xl" fontWeight="600">
        NT {total}
      </Text>
    </Box>
  );
};

export default Balance;
