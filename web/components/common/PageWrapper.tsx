import type { FC, ReactNode } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const Section = styled.section(({ isResturant }: { isResturant: boolean }) => [
  tw`pt-32 md:pt-52 pb-20 mx-auto px-4 md:px-12 max-w-[80rem] flex flex-col items-center gap-8`,
  isResturant && tw`max-w-none px-0 py-0 bg-primary`,
])

interface PageWrapperProps {
  children: ReactNode
  isResturant?: boolean
}

const PageWrapper: FC<PageWrapperProps> = ({
  children,
  isResturant = false,
  ...rest
}) => {
  return (
    <Section isResturant={isResturant} {...rest}>
      {children}
    </Section>
  )
}

export default PageWrapper
