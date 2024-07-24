import { Box, Flex, Text } from "@chakra-ui/react";
import { Transaction } from "../type";
import React from "react";

interface IncomeExpenseProps {
  transactions: Transaction[];
}

const Incomes = ({ transactions }: IncomeExpenseProps) => {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      bg="white"
      boxShadow="md"
      p={3}
    >
      <Box textAlign="center" flex="1" borderRight="1px solid #dedede">
        <Text>收入</Text>
        <Text color="green.500" fontWeight="500" fontSize="2xl">
          + NT {income}
        </Text>
      </Box>
      <Box textAlign="center" flex="1">
        <Text>支出</Text>
        <Text color="red.500" fontWeight="500" fontSize="2xl">
          - NT {expense}
        </Text>
      </Box>
    </Flex>
  );
};

export default Incomes;
