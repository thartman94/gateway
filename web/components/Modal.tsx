import React, {
  isValidElement,
  cloneElement,
  createContext,
  useState,
  useContext,
} from 'react'
import type { FC, ReactNode } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { toggleScroll } from '@functions'

export const ModalContext = createContext({
  open: false,
  children: <></>,
  title: '',
  openModal: (content: ReactNode, title: string = 'Edit') => {},
  closeModal: () => {},
})

export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>('Edit')
  const [childrenState, setChildren] = useState<any>(<></>)
  const [open, setOpen] = useState<any>(false)
  const closeModal = () => {
    setOpen(false)
    toggleScroll('enable')
  }

  // TODO: Impliment escape key to close modal
  // ? This is causing an error when building: "document is not available during server side rendering"
  // if (document && typeof document !== 'undefined') {
  //   document.addEventListener('keydown', (e) => {
  //     if (open && e.key === 'Escape') closeModal()
  //   })
  // }

  return (
    <ModalContext.Provider
      value={{
        open,
        children: childrenState,
        title,
        openModal: (content: ReactNode, title: string = 'Edit') => {
          toggleScroll('disable')
          setTitle(title)
          setChildren(content)
          setOpen(true)
        },
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const Wrapper = styled.div(({ open }: { open: boolean }) => [
  tw`fixed top-0 left-0 flex items-center justify-center w-full h-full z-[10000000000]`,
  open ? tw`pointer-events-auto` : tw`pointer-events-none`,
])

const Container = styled.div(({ open }: { open: boolean }) => [
  tw`w-fit h-fit duration-500 ease-in-out transform`,
  open
    ? tw`scale-100 opacity-100 pointer-events-auto`
    : tw`scale-110 opacity-0 pointer-events-none`,
])

const Overlay = styled.div(({ open }: { open: boolean }) => [
  tw`absolute top-0 bottom-0 w-full h-full transition-opacity bg-black`,
  open ? tw`opacity-70 pointer-events-auto` : tw`opacity-0 pointer-events-none`,
])

const Close = tw.button`-translate-y-full top-0 font-bold uppercase text-sm py-1 right-0 absolute z-10 text-white hover:(text-primary) duration-300 ease-in-out flex gap-1.5`

const Modal: FC = () => {
  const { open, children, closeModal } = useContext(ModalContext)
  const childrenWithProps = React.Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, [open]) : child
  )
  return (
    <Wrapper open={open}>
      <Overlay open={open} onClick={closeModal} />
      <Container open={open}>
        {childrenWithProps}
        <Close onClick={() => closeModal()}>
          close<span>x</span>
        </Close>
      </Container>
    </Wrapper>
  )
}

export default Modal
