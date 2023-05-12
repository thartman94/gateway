import { FC } from 'react'
import { PortableText } from '@portabletext/react'
import tw from 'twin.macro'
import styled, { css } from 'styled-components'

import Image from '@common/SanityImage'
import Resturant from 'components/content/Resturant'
import Button from 'components/content/Button'

import type {
  Resturant as ResturantType,
  SanityImage as ImageType,
} from 'lib/schema'

const CalloutWrapper = tw.div`bg-font font-poppins text-white text-center text-lg py-8 px-12 shadow-xl -translate-x-4 w-[calc(100% + 2rem)] sm:(w-auto translate-x-0 text-left text-xl) my-8 flex relative flex-col [a]:(text-primary hover:(text-primary underline))
after:([content: ''] w-3 h-full absolute right-0 top-0 bg-primary)
before:([content: ''] w-3 h-full absolute top-0 left-0 bg-primary)
[*]:mb-0!
`

const styles = () => [
  tw`w-full`,

  css`
    p,
    ul,
    ol {
      ${tw`mb-4`}
    }

    h2 {
      ${tw`mb-4 text-3xl font-bold`}
    }

    ul,
    ol {
      ${tw`ml-10 list-outside`}
    }

    ul {
      ${tw`list-disc`}
    }

    ol {
      ${tw`list-decimal`}
    }

    li {
      ${tw`mb-2`}
    }

    a {
      ${tw`text-offBlack hover:text-primary font-bold duration-300 ease-in-out`}
    }
  `,
]

const Article = styled.article(() => [styles])
const Div = styled.div(() => [styles])

const components = () => {
  return {
    types: {
      resturant: ({ value }: { value: ResturantType }) => {
        return <Resturant {...value} />
      },
      image: ({ value }: { value: any }) => {
        return (
          <Image
            image={value.asset}
            tw="left-0 right-0 mx-auto mb-12 shadow-xl"
          />
        )
      },
      callout: ({ value }: { value: any }) => {
        return (
          <CalloutWrapper>
            <PortableText value={value.content} />
          </CalloutWrapper>
        )
      },
      contentButton: ({ value }: { value: any }) => <Button {...value} />,
    },
    block: {},
  }
}

interface ContentProps {
  content: any
  article?: boolean
}

const Content: FC<ContentProps> = ({ article = false, content, ...rest }) => {
  const Wrapper = article ? Article : Div

  return (
    <Wrapper {...rest}>
      <PortableText value={content} components={components()} />
    </Wrapper>
  )
}

export default Content
