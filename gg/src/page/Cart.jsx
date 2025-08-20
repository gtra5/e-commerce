"use client"
import Layout from "../result"
import { useCart } from "../context/CartContext.jsx"

export default function CartPage() {
  const { cartItems, increment, decrement, removeItem, clearCart, cartSubtotal } = useCart()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            <p className="mb-4">Your cart is empty.</p>
            <a href="/home" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Continue shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{item.title}</h2>
                      <div className="text-gray-600 text-sm">${item.unitPrice?.toFixed(2)}</div>
                      {item.stock != null && <div className="text-xs text-gray-500">Stock: {item.stock}</div>}
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(item.quantity * (item.unitPrice || 0)).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="decrease quantity"
                        onClick={() => decrement(item.id)}
                        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        −
                      </button>
                      <div className="min-w-8 text-center font-semibold">{item.quantity}</div>
                      <button
                        aria-label="increase quantity"
                        onClick={() => increment(item.id)}
                        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-sm text-red-600 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-4 h-fit lg:sticky lg:top-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Checkout</button>
              <button
                onClick={clearCart}
                className="w-full mt-3 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

