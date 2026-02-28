import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { User, Transaction, SavingsJar, Loan } from '@/types';

/**
 * Hook para monitorar o estado de autenticação
 */
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { user, loading, error, signOut };
};

/**
 * Hook para recuperar transações de uma família
 */
export const useTransactions = (familyId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const q = query(
          collection(db, `families/${familyId}/transactions`),
          where('familyId', '==', familyId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Transaction),
          id: doc.id,
        }));
        setTransactions(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (familyId) {
      fetchTransactions();
    }
  }, [familyId]);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const docRef = await addDoc(
        collection(db, `families/${familyId}/transactions`),
        transaction
      );
      const newTransaction = { ...transaction, id: docRef.id };
      setTransactions([...transactions, newTransaction as Transaction]);
      return newTransaction;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateTransaction = async (id: string, updates: Partial<Transaction>) => {
    try {
      const docRef = doc(db, `families/${familyId}/transactions/${id}`);
      await updateDoc(docRef, updates);
      setTransactions(
        transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const docRef = doc(db, `families/${familyId}/transactions/${id}`);
      await deleteDoc(docRef);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

/**
 * Hook para recuperar cofrinhos de uma família
 */
export const useSavingsJars = (familyId: string) => {
  const [jars, setJars] = useState<SavingsJar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJars = async () => {
      try {
        const q = query(
          collection(db, `families/${familyId}/savingsJars`)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as SavingsJar),
          id: doc.id,
        }));
        setJars(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (familyId) {
      fetchJars();
    }
  }, [familyId]);

  const addJar = async (jar: Omit<SavingsJar, 'id'>) => {
    try {
      const docRef = await addDoc(
        collection(db, `families/${familyId}/savingsJars`),
        jar
      );
      const newJar = { ...jar, id: docRef.id };
      setJars([...jars, newJar as SavingsJar]);
      return newJar;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateJar = async (id: string, updates: Partial<SavingsJar>) => {
    try {
      const docRef = doc(db, `families/${familyId}/savingsJars/${id}`);
      await updateDoc(docRef, updates);
      setJars(jars.map((j) => (j.id === id ? { ...j, ...updates } : j)));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteJar = async (id: string) => {
    try {
      const docRef = doc(db, `families/${familyId}/savingsJars/${id}`);
      await deleteDoc(docRef);
      setJars(jars.filter((j) => j.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    jars,
    loading,
    error,
    addJar,
    updateJar,
    deleteJar,
  };
};

/**
 * Hook para recuperar empréstimos de uma família
 */
export const useLoans = (familyId: string) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const q = query(
          collection(db, `families/${familyId}/loans`)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Loan),
          id: doc.id,
        }));
        setLoans(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (familyId) {
      fetchLoans();
    }
  }, [familyId]);

  const addLoan = async (loan: Omit<Loan, 'id'>) => {
    try {
      const docRef = await addDoc(
        collection(db, `families/${familyId}/loans`),
        loan
      );
      const newLoan = { ...loan, id: docRef.id };
      setLoans([...loans, newLoan as Loan]);
      return newLoan;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateLoan = async (id: string, updates: Partial<Loan>) => {
    try {
      const docRef = doc(db, `families/${familyId}/loans/${id}`);
      await updateDoc(docRef, updates);
      setLoans(loans.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteLoan = async (id: string) => {
    try {
      const docRef = doc(db, `families/${familyId}/loans/${id}`);
      await deleteDoc(docRef);
      setLoans(loans.filter((l) => l.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    loans,
    loading,
    error,
    addLoan,
    updateLoan,
    deleteLoan,
  };
};
