import { Handbag } from 'phosphor-react'
import { HeaderContainer, Cart, CartItemsNumber } from './styles'
import Image from 'next/future/image'

import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { ItemsListModal } from '../ItemsListModal'

export function Header() {
    const { cartProducts } = useContext(CartContext)

    const numberOfItems = cartProducts.reduce((acc, value) => {
        return acc + value.quantity
    }, 0)

    return (
        <HeaderContainer>
            <Image src={logoImg} alt="" />

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Cart>
                        <Handbag size={24} />
                        <CartItemsNumber>
                            <span>{numberOfItems}</span>
                        </CartItemsNumber>
                    </Cart>
                </Dialog.Trigger>

                <ItemsListModal />
            </Dialog.Root>

        </HeaderContainer>
    )
}