import { BsMegaphoneFill } from 'react-icons/bs'

export default {
  name: 'callout',
  title: 'Callout',
  type: 'document',
  icon: BsMegaphoneFill,
  preview: {
    prepare() {
      return {
        title: 'Callout',
        media: BsMegaphoneFill,
      }
    },
  },
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    },
  ],
}
