/**
 * Returns the cleaned phone number to be used in the href.
 *
 * @param {string} rawNumber - The phone number to be cleaned.
 * @returns {string} - The cleaned phone number.
 */
export function cleanPhoneNumber(rawNumber: string): string {
  return rawNumber.replace(/\D/g, '')
}

import sanityClient from 'lib/sanity-client'
import type {
  Page as PageType,
  Navigation as NavigationType,
  NavigationItem as NavItemType,
} from 'lib/schema'
/**
 * Returns an array of menu items.
 *
 * @param {NavigationType} rawMenu - The menu data returned from Sanity.
 */
export async function buildMenu(rawMenu: NavigationType) {
  const getItems = async (items: NavItemType[] | undefined): Promise<any> => {
    return await Promise.all(
      items?.map(async ({ link, children }) => {
        const url = async () => {
          if (!link || link.type === 'placeholder') return null

          if (link.type === 'external' && link.externalUrl)
            return link.externalUrl

          if (link.type === 'internal' && link.internalLink) {
            const { slug } = (await sanityClient.expand(
              link.internalLink
            )) as PageType
            return `/${slug.current}`
          }
        }

        return {
          url: await url(),
          type: link?.type,
          title: link?.text,
          children: children ? await getItems(children) : null,
        }
      }) || []
    )
  }

  return await getItems(rawMenu.items)
}

/**
 *
 * Toggle the scroll on the body element. If no argument is passed, the scroll
 * will be toggled. If "enable" is passed, the scroll will be enabled. If "disable"
 * is passed, the scroll will be disabled.
 *
 *
 *
 * @param {string} setTo  The state to set the scroll to. If null, the scroll
 *                       will be toggled.
 * @returns {void}      Nothing
 */
export const toggleScroll = (action: 'enable' | 'disable') => {
  if (window === undefined)
    throw new Error(
      'window is undefined, toggleScroll was called from a non-browser context.'
    )
  if (action === 'enable') {
    document.body.style.overflowY = 'auto'
  } else if (action === 'disable') {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY =
      document.body.style.overflowY === 'hidden' ? 'auto' : 'hidden'
  }
}
