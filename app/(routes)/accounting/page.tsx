"use client";
import AddTransaction from "@/app/components/AddTransaction";
import Balance from "@/app/components/Balance";
import IncomeExpenses from "@/app/components/IncomeExpenses";
import TransactionList from "@/app/components/TransactionList";
import useTransaction from "@/app/hooks/useTransaction";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { auth } from "@/app/ lib/firebase";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ExpensePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  const {
    transactions,
    isLoading,
    isAdding,
    addTransaction,
    deleteTransaction,
  } = useTransaction();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <VStack
      maxWidth="700px"
      minWidth="300px"
      spacing={4}
      justifyContent="center"
      alignItems="center"
      my={5}
      mx={{
        lg: "auto",
        base: "20px",
      }}
    >
      <Balance transactions={transactions} />
      <IncomeExpenses transactions={transactions} />
      <TransactionList
        isLoading={isLoading}
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
      <AddTransaction isAdding={isAdding} addTransaction={addTransaction} />
    </VStack>
  );
};

export default ExpensePage;
