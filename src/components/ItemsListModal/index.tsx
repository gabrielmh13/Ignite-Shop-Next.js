import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/future/image'
import { X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { AmountContainer, BuyButton, CloseButton, Content, DetailsContainer, FooterContainer, ImageContainer, Item, ItemsList, QuantityContainer, ValueContainer } from './styles'

export function ItemsListModal() {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const { cartProducts, removeProductCart } = useContext(CartContext)

    const numberOfItems = cartProducts.reduce((acc, value) => {
        return acc + value.quantity
    }, 0)

    const totalAmount = cartProducts.reduce((acc, value) => {
        const price = Number(value.price.replace(/[^0-9.-]+/g, ""));
        return acc + (price * value.quantity) / 100
    }, 0)

    const totalAmountFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(totalAmount)


    async function handleBuyButton() {
        try {
            setIsCreatingCheckoutSession(true)

            const pricesResponse = await axios.get('/api/prices')
            const { pricesList } = pricesResponse.data

            const purchaseList = cartProducts.map((cartProduct) => {
                const { id: priceId } = pricesList.data.find(p => p.product === cartProduct.id)

                return (
                    {
                        price: priceId,
                        quantity: cartProduct.quantity
                    }
                )
            })

            const checkoutResponse = await axios.post('/api/checkout', {
                purchaseList
            })

            const { checkoutUrl } = checkoutResponse.data

            window.location.href = checkoutUrl
        }
        catch (err) {
            setIsCreatingCheckoutSession(false)
            alert(err)
        }
    }

    function handleRemoveButton(productId: string) {
        removeProductCart(productId)
    }

    return (
        <Dialog.Portal>
            <Content>
                <Dialog.Title>Sacola de compras</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>

                <ItemsList>
                    {cartProducts.map(product => {
                        return (
                            <Item key={product.id}>
                                <ImageContainer>
                                    <Image src={product.imageUrl} width={94} height={94} alt="" />
                                </ImageContainer>

                                <DetailsContainer>
                                    <p>{product.name}</p>
                                    <span>{product.price}</span>
                                    <button onClick={() => handleRemoveButton(product.id)}>
                                        Remover
                                    </button>
                                </DetailsContainer>
                            </Item>
                        )
                    })}
                </ItemsList>

                <FooterContainer>

                    <AmountContainer>
                        <QuantityContainer>
                            <p>Quantidade</p>
                            <span>{numberOfItems} item(s)</span>
                        </QuantityContainer>

                        <ValueContainer>
                            <p>Valor Total</p>
                            <span>{totalAmountFormatted}</span>
                        </ValueContainer>
                    </AmountContainer>

                    <BuyButton onClick={handleBuyButton} disabled={isCreatingCheckoutSession}>
                        Finalizar compra
                    </BuyButton>

                </FooterContainer>

            </Content>
        </Dialog.Portal>
    )
}