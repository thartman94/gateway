import { CgWebsite } from 'react-icons/cg'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: CgWebsite,
  groups: [
    {
      title: 'SEO',
      name: 'seo',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input) =>
          parent.layout === 'home'
            ? '/'
            : input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, ''),
      },
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'default',

      codegen: { required: true },
      validation: (Rule) => Rule.required(),

      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Home', value: 'home' },
          { title: 'Contact', value: 'contact' },
          { title: 'Sitemap', value: 'sitemap' },
          { title: 'Resturants', value: 'resturants' },
        ],
      },
    },
    {
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{ type: 'page' }],
      validation: (Rule) => [
        Rule.custom((self, context) => {
          if (
            self &&
            (self?._ref === context?.document?._id ||
              self?._ref === `drafts.${context?.document?._id}` ||
              `drafts.${self?._ref}` === context?.document?._id)
          ) {
            return 'Parent cannot be the same as the page'
          }
          return true
        }),
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
    {
      name: 'formOverride',
      title: 'Form Override',
      type: 'reference',
      to: [{ type: 'form' }],
    },
    {
      name: 'publishStatus',
      title: 'Publish Status',
      type: 'string',
      initialValue: 'public',
      options: {
        layout: 'radio',
        list: [
          { title: '🧑‍🤝‍🧑 Public', value: 'public' },
          {
            title:
              "👻 Hidden (won't show up in google, but accessible through URL)",
            value: 'hidden',
          },
          {
            title: '🔒 Private',
            value: 'private',
          },
        ],
      },
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    },
  ],
}
