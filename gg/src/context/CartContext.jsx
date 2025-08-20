import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem("cart:v1");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeCartToStorage(items) {
  try {
    localStorage.setItem("cart:v1", JSON.stringify(items));
  } catch (e) {}
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readCartFromStorage());

  useEffect(() => {
    writeCartToStorage(cartItems);
  }, [cartItems]);

  const addItem = (item, quantity = 1) => {
    setCartItems((prev) => {
      const index = prev.findIndex((x) => x.id === item.id);
      if (index !== -1) {
        const updated = [...prev];
        const maxQty = item.stock != null ? item.stock : Infinity;
        updated[index].quantity = Math.min(
          updated[index].quantity + quantity,
          maxQty
        );
        return updated;
      }
      const maxQty = item.stock != null ? item.stock : Infinity;
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          image: item.image || item.thumbnail || item.images?.[0] || "",
          unitPrice: Number(item.unitPrice ?? item.price) || 0,
          stock: item.stock ?? null,
          quantity: Math.min(quantity, maxQty),
        },
      ];
    });
  };

  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const maxQty = item.stock != null ? item.stock : Infinity;
        return { ...item, quantity: Math.min(item.quantity + 1, maxQty) };
      })
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;
          return { ...item, quantity: Math.max(item.quantity - 1, 0) };
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.quantity * (item.unitPrice || 0),
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      increment,
      decrement,
      removeItem,
      clearCart,
      cartCount,
      cartSubtotal,
    }),
    [cartItems, cartCount, cartSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
