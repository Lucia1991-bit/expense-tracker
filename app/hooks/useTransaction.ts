"use client";

console.log("useTransaction hook 文件已加載");

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db, auth } from "../ lib/firebase";
import { Transaction } from "../type";

//定義回傳資料型態
interface UseTransactionReturn {
  transactions: Transaction[];
  isLoading: boolean;
  isAdding: boolean;
  addTransaction: (
    newTransaction: Omit<Transaction, "id" | "userId" | "createdAt">
  ) => Promise<string | undefined>; //新增成功回傳 id，失敗沒有回傳值為 undefined
  deleteTransaction: (id: string) => Promise<void>;
}

const useTransaction = (): UseTransactionReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  //頁面渲染完畢後向資料庫取得收支紀錄資料
  useEffect(() => {
    //監聽用戶登入狀態
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        //如果用戶已登入，獲取該用戶的收支紀錄
        const transactionsRef = collection(db, "transactions");
        //創建查詢：按 createdAt 降序排列
        const sortedQuery = query(
          transactionsRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        //設置實時監聽器
        const unsubscribe = onSnapshot(
          sortedQuery,
          //成功 callback: 當資料變化時執行
          //將資料庫自動生成的 id加入transaction
          (querySnapshot) => {
            const transactionsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Transaction[];

            setTransactions(transactionsData);
            setIsLoading(false);
          },

          //錯誤 callback:當發生錯誤時執行
          (error) => {
            console.error("收支紀錄獲取失敗:", error);
            setIsLoading(false);
          }
        );
        // 清理函數: 取消即時監聽
        return () => unsubscribe();
      } else {
        //用戶未登入
        setTransactions([]);
        setIsLoading(false);
      }
    });
    // 清理函数
    return () => unsubscribeAuth();
  }, []);

  //新增收支
  const addTransaction = async (
    newTransaction: Omit<Transaction, "id" | "userId" | "createdAt">
  ) => {
    setIsAdding(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("用戶未登入");
      }

      //設置對 Firestore collection的引用
      const transactionsRef = collection(db, "transactions");

      //新增進資料庫
      const docRef = await addDoc(transactionsRef, {
        ...newTransaction,
        userId: user.uid, // 添加用户ID
        createdAt: serverTimestamp(),
      });
      setIsAdding(false);
      //不需要手動更新 transactions，onSnapshot 會處理
      return docRef.id;
    } catch (error) {
      console.error("Error adding transaction:", error);
      setIsAdding(false);
    }
  };

  //刪除收支
  const deleteTransaction = async (id: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("用戶未登入");
      }

      const transactionDocRef = doc(db, "transactions", id);
      await deleteDoc(transactionDocRef);
      //不需要手動更新 transactions，onSnapshot 會處理
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return {
    transactions,
    isLoading,
    isAdding,
    addTransaction,
    deleteTransaction,
  };
};

export default useTransaction;
