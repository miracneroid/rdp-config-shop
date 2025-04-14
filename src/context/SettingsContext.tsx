
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for application settings
interface AppSettings {
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
}

interface SettingsContextType {
  settings: AppSettings;
  updateCurrency: (code: string, symbol: string, name: string) => void;
}

// Default settings with Euro as the default currency
const defaultSettings: AppSettings = {
  currency: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
  }
};

// Create context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider component
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const updateCurrency = (code: string, symbol: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      currency: { code, symbol, name }
    }));
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateCurrency
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook for using the settings context
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
