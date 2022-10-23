import { CartContainer, HomeContainer, Product, ProductInfo } from "../styles/pages/home"

import { Handbag } from 'phosphor-react'

import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import Head from "next/head"
import Image from 'next/future/image'
import Link from "next/link"

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"

import { GetStaticProps } from "next"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const { insertProductInCart } = useContext(CartContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function handleAddCartButton(event: React.FormEvent<EventTarget>, product: Product) {
    event.preventDefault()

    const newProduct = { ...product, quantity: 1 }

    insertProductInCart(newProduct)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <ProductInfo>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </ProductInfo>
                  <CartContainer onClick={(event) => handleAddCartButton(event, product)}>
                    <Handbag size={32} />
                  </CartContainer>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}