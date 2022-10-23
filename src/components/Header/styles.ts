import { styled } from "../../styles"

export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

export const Cart = styled('button', {
    width: '3rem',
    height: '3rem',
    background: '$gray800',
    border: 0,
    borderRadius: '6px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: '#8D8D99',

    cursor: 'pointer'
})

export const CartItemsNumber = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '1.5rem',
    height: '1.5rem',
    background: '$green500',

    borderRadius: '50%',
    position: 'absolute',

    marginTop: '-2.2rem',
    marginRight: '-2.2rem',

    border: '3px solid #121214',

    span: {
        color: '$white',
        fontWeight: 'bold'
    }
})