import type { FC, ReactNode } from 'react'
import Layout from '@common/Layout'

import Content from '@common/Content'
import PageWrapper from '@common/PageWrapper'
import Title from '@common/Title'

const inner: FC<PageTemplateProps> = ({ page, ...rest }) => {
  const { title, content, layout } = page
  return (
    <Layout inner {...rest}>
      <PageWrapper isResturant={layout === 'resturants'}>
        {!!title && layout !== 'resturants' && (
          <Title level="h1" inner>
            {title}
          </Title>
        )}
        <Content content={content} />
      </PageWrapper>
    </Layout>
  )
}

export default inner
