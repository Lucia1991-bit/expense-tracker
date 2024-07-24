import {
  Box,
  Center,
  HStack,
  IconButton,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaX } from "react-icons/fa6";
import { Transaction } from "../type";
import React from "react";

interface TransactionListProps {
  isLoading: boolean;
  transactions: Transaction[];
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionList = ({
  isLoading,
  transactions,
  deleteTransaction,
}: TransactionListProps) => {
  return (
    <Box alignSelf="flex-start" width="100%">
      <Text
        my={5}
        fontSize="xl"
        fontWeight="700"
        textAlign="left"
        py={2}
        borderBottom="1px solid #bbb"
      >
        收支紀錄
      </Text>
      {isLoading ? (
        <Center height="200px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      ) : (
        <List spacing={3}>
          {transactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              bg="white"
              p={4}
              boxShadow="md"
              borderRight="8px solid"
              borderRightColor={
                transaction.type === "expense" ? "red.500" : "green.500"
              }
              position="relative"
              _hover={{
                "& > .delete-button": {
                  opacity: 1,
                },
              }}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text>{transaction.item}</Text>
                <Text mr={2}>
                  {transaction.type === "expense" ? "-" : "+"}
                  {transaction.amount}
                </Text>
              </HStack>
              <IconButton
                className="delete-button"
                bg="red.400"
                size="xs"
                borderRadius="50%"
                aria-label="Delete transaction"
                icon={<FaX />}
                color="white"
                position="absolute"
                top="50%"
                left="0"
                transform="translate(-120%, -50%)"
                opacity="0"
                transition="opacity 0.3s ease"
                cursor="pointer"
                _hover={{ bg: "red.600" }}
                onClick={() => deleteTransaction(transaction.id)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TransactionList;
