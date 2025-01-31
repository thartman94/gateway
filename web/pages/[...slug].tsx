import type { GetStaticPaths, NextPage } from 'next'
import type { FC } from 'react'
import groq from 'groq'

import type { Form } from 'lib/schema'
import sanityClient, { defaultSanityClient } from 'lib/sanity-client'
import Contact from '@templates/Contact'
import Inner from '@templates/Inner'
import Sitemap from '@templates/Sitemap'
import { buildMenu } from '@functions'

const Page: NextPage<Props> = ({ page, ...rest }) => {
  let Template: FC<PageTemplateProps> = Inner

  switch (page.layout) {
    case 'contact':
      Template = Contact
      break
    case 'sitemap':
      Template = Sitemap
      break
    default:
      Template = Inner
      break
  }

  return <Template page={page} {...rest} />
}

export default Page

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props']

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await sanityClient.query(`*[_type == 'page'] {
    slug {
      current
    },
    layout,
    _id
  }
`)

  const paths = pages.map((page) => ({
    // change this to build with parent pages as well
    params: {
      slug: [page.slug.current],
    },
  }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const [logos] = await sanityClient.getAll('logos')
  const [companyInfo] = await sanityClient.getAll('companyInfo')
  const slug = params.slug[0]
  let page = await defaultSanityClient.fetch(
    `*[type == page && slug.current == "${slug}"][0]`
  )

  page = {
    ...page,
    content: page.content
      ? await Promise.all(
          page.content.map(async (item: any) => {
            if (item._type !== 'image') {
              return item
            }
            const image = await sanityClient.expand(item.asset)
            return { ...item, asset: image }
          })
        )
      : null,
  }

  let [form] = await sanityClient.getAll('form', 'name == "Contact"')

  if (!!page?.formOverride) {
    form = (await sanityClient.expand(page.formOverride)) as Form
  }

  const mainMenu = await defaultSanityClient.fetch(groq`
  *[type == navigation && name == "Main Menu"][0] {
    items[] {
      children[],
      link {
        type,
        text,
        externalLink,
        internalLink
      }
    }
  }
`)

  return {
    props: {
      logos,
      companyInfo,
      page,
      form,
      menu: await buildMenu(mainMenu),
    },
  }
}
