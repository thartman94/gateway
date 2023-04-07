export default {
  name: 'resturant',
  title: 'Resturant',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'hours',
      title: 'Hours',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'menuLink',
      title: 'Menu Link',
      type: 'url',
      hidden: ({ parent }) => parent.menuType !== 'link',
    },
    {
      name: 'menuImages',
      title: 'Menu Images',
      type: 'array',
      of: [{ type: 'image' }],
      hidden: ({ parent }) => parent.menuType !== 'modal',
    },
    {
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: 'Modal', value: 'modal' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'modal',
    },
  ],
}
