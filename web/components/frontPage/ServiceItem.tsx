import type { FC, ReactNode } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

import Image from '@common/SanityImage'
import Content from '@common/Content'
import AnimateIn from '@common/AnimateIn'
import Link from 'next/link'

const Item = styled.div(({ flip }: { flip: boolean }) => [
  tw`lg:items-stretch flex flex-col items-center`,
  flip ? tw`md:flex-row-reverse` : tw`md:flex-row`,
])
const ContentWrapper = styled.div(({ flip }: { flip: boolean }) => [
  tw`md:px-12 flex flex-col w-full gap-4 py-6 items-start`,
  flip ? tw`md:(items-end text-right)` : tw``,
])

const Title = tw.span`text-4xl font-poppins relative pb-2 after:([content: ''] bg-primary w-full h-1 bottom-0 left-0 absolute)`
const Button = styled(Link)`
  ${tw`bg-offBlack text-white text-xl font-bold py-1 duration-300 ease-in-out px-4 hover:(bg-primary)`}
`

interface ServiceItemProps {
  flip: boolean
  title: string
  link?: any
  image?: any
  description?: any
}

const ServiceItem: FC<ServiceItemProps> = ({
  flip,
  title,
  link,
  image,
  description,
  ...rest
}) => {
  let url = ''
  if (link && link.type === 'internal') url = link.internalLink.slug.current
  if (link && link.type === 'external') url = link.externalUrl
  return (
    <AnimateIn
      direction={flip ? 'left' : 'right'}
      distance="50px"
      duration={1000}
    >
      <Item flip={flip} {...rest}>
        {!!image && (
          <Image
            image={image}
            tw="md:max-w-[15rem] lg:max-w-[20rem] object-cover shadow-xl"
          />
        )}
        <ContentWrapper flip={flip}>
          <Title>{title}</Title>
          <Content content={description} />
          {!!url && (
            <Button
              href={url}
              target={link.type === 'internal' ? '_self' : '_blank'}
            >
              {link.text}
            </Button>
          )}
        </ContentWrapper>
      </Item>
    </AnimateIn>
  )
}

export default ServiceItem
