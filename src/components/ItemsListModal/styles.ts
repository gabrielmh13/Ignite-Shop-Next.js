import { styled } from "@stitches/react";
import * as Dialog from '@radix-ui/react-dialog'

export const Content = styled(Dialog.Content, {
    height: "100vh",
    width: '30rem',
    background: '$gray800',
    position: 'fixed',
    top: '0rem',
    right: '0rem',

    padding: '4.5rem 3rem'
})

export const CloseButton = styled(Dialog.Close, {
    position: 'absolute',
    top: '1.75rem',
    right: '1.75rem',
    border: 0,
    background: 'transparent',
    color: '#8d8d99',

    cursor: 'pointer',
    lineHeight: 0
})

export const ItemsList = styled('div', {
    minHeight: 'auto',
    maxHeight: '60%',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',

    overflow: 'scroll'
})

export const Item = styled('div', {
    height: '5.9rem',
    width: '100%',

    display: 'flex'
})

export const ImageContainer = styled('div', {
    height: '100%',
    width: '6.3rem',
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8
})

export const DetailsContainer = styled('div', {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: '1.25rem',

    p: {
        fontSize: '$md',
        color: '$gray300',
        lineHeight: 1.2
    },

    span: {
        fontSize: '$md',
        fontWeight: 'bold',
        lineHeight: 1.6
    },

    button: {
        width: '4rem',
        background: 'transparent',
        border: 0,
        color: '$green500',

        fontSize: '1rem',
        fontWeight: 'bold',

        cursor: 'pointer',

        '&:hover': {
            color: '$green300'
        }
    }
})

export const FooterContainer = styled('footer', {
    width: '80%',
    position: 'absolute',
    bottom: 0
})

export const AmountContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',


})

export const QuantityContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    p: {
        color: '$gray100',
        lineHeight: 1.6
    },

    span: {
        color: '$gray300',
        lineHeight: 1.6
    }
})

export const ValueContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    p: {
        fontWeight: 'bold',
        fontSize: '$md',
        color: '$gray100',
        lineHeight: 1.6
    },

    span: {
        fontSize: '$2xl',
        fontWeight: 'bold',
        lineHeight: 1.4,
        color: '$gray100'
    }
})

export const BuyButton = styled('button', {
    width: '100%',
    border: 0,
    borderRadius: 8,
    background: '$green300',
    padding: '1.25rem',

    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',

    margin: '2.5rem 0 3rem 0',

    cursor: 'pointer',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
        backgroundColor: '$green300'
    }
})