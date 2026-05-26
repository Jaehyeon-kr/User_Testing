import { createContext, useContext, useState, ReactNode } from "react";

interface StockData {
  name: string;
  ticker: string;
  price: number;
  change: number;
  isOverseas: boolean;
  currency: "KRW" | "USD";
}

interface StockContextType {
  selectedStock: StockData;
  setSelectedStock: (stock: StockData) => void;
}

const defaultStock: StockData = {
  name: "삼성전자",
  ticker: "005930",
  price: 219500,
  change: -2.23,
  isOverseas: false,
  currency: "KRW"
};

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [selectedStock, setSelectedStock] = useState<StockData>(defaultStock);

  return (
    <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
}
