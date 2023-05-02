import { FC } from 'react'
import tw from 'twin.macro'

import Content from '@common/Content'

interface ContentProps {
  content: any
  article?: boolean
}

const Wrapper = tw.div`bg-font font-poppins text-white text-center text-lg py-8 px-12 shadow-xl -translate-x-4 w-[calc(100% + 2rem)] sm:(w-auto translate-x-0 text-left text-xl) my-8 flex relative flex-col [a]:(text-primary hover:(text-primary underline))
after:([content: ''] w-3 h-full absolute right-0 top-0 bg-primary)
before:([content: ''] w-3 h-full absolute top-0 left-0 bg-primary)`

const Callout: FC<ContentProps> = ({ content, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Content content={content} tw="-mb-4" />
    </Wrapper>
  )
}

export default Callout
