import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product'

import Stripe from 'stripe'
import Image from 'next/future/image'
import Head from 'next/head'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
    }
}

export default function Product({ product }: ProductProps) {
    const { insertProductInCart } = useContext(CartContext)

    async function handleAddProductInCart() {
        const newProduct = {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1
        }

        insertProductInCart(newProduct)
    }

    return (
        <>
            <Head>
                <title>{`${product.name} | Ignite Shop`}</title>
            </Head>
            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button onClick={handleAddProductInCart}>
                        Colocar na sacola
                    </button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price.unit_amount / 100),
                description: product.description
            }
        }
    }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     return {
//         paths: [],
//         fallback: true
//     }
// }

// export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
//     const productId = params.id

//     const product = await stripe.products.retrieve(productId, {
//         expand: ['default_price']
//     })

//     const price = product.default_price as Stripe.Price

//     return {
//         props: {
//             product: {
//                 id: product.id,
//                 name: product.name,
//                 imageUrl: product.images[0],
//                 price: new Intl.NumberFormat('pt-BR', {
//                     style: 'currency',
//                     currency: 'BRL'
//                 }).format(price.unit_amount / 100),
//                 description: product.description
//             }
//         },
//         revalidate: 60 * 60 * 1 // 1 hour
//     }
// }