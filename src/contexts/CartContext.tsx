import { createContext, ReactNode, useState } from "react";
import Product from "../pages/product/[id]";

export interface Product {
    id: string
    name: string
    imageUrl: string
    price: string
    quantity: number
}

interface CartContextType {
    cartProducts: Product[]
    insertProductInCart: (product: Product) => void
    removeProductCart: (productId: string) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cartProducts, setCartProducts] = useState<Product[]>([])

    function insertProductInCart(product: Product) {
        const productIndex = cartProducts.findIndex(cartProduct => cartProduct.id === product.id)

        if (productIndex >= 0) {
            let newCartProducts = [...cartProducts]
            newCartProducts[productIndex].quantity = newCartProducts[productIndex].quantity + product.quantity

            setCartProducts(newCartProducts)
        }
        else {
            setCartProducts(state => {
                return [...state, product]
            })
        }
    }

    function removeProductCart(productId: string) {
        const productIndex = cartProducts.findIndex(prod => prod.id === productId)
        const newCartProducts = [...cartProducts]

        newCartProducts.splice(productIndex, 1)

        setCartProducts(newCartProducts)
    }

    return (
        <CartContext.Provider value={{ cartProducts, insertProductInCart, removeProductCart }}>
            {children}
        </CartContext.Provider>
    )

}