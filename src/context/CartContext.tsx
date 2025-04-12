
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface RDPConfiguration {
  cpu: number;
  ram: number;
  storage: number;
  os: string;
  region: string;
  applications: string[];
  duration: number;
}

export interface CartItem {
  id: string;
  name: string;
  configuration: RDPConfiguration;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to generate a cart item ID
const generateCartItemId = (item: Omit<CartItem, 'id' | 'quantity'>) => {
  const config = item.configuration;
  return `rdp-${config.cpu}-${config.ram}-${config.storage}-${config.os}-${config.region}-${config.duration}`;
};

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    // Check if the item already exists in the cart
    const itemId = item.id || generateCartItemId(item);
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);

    if (existingItemIndex !== -1) {
      // Item exists, increment quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Item doesn't exist, add to cart with quantity 1
      setCart(prev => [...prev, { ...item, id: itemId, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart,
      updateQuantity,
      clearCart, 
      getTotal,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for using the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
