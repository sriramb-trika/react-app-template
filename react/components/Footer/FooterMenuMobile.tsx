import React from 'react'
import styles from './FooterMenu.css'
import Accordion from './Accordion'

type FooterType = {
  __editorItemTitle:string
  link: string
  submenus : any
}

interface Props {
  footerArray : FooterType[]
}

const FooterMenuMobile : StorefrontFunctionComponent<Props> = ({
  footerArray
}) => {

  return (
    <div className={`${styles.footer} mb5`}>
      {footerArray?.map((item:FooterType) => (
        <div>
          <Accordion title={item.__editorItemTitle} content={item} />
          </div>
      ))}
    </div>
  )
}

FooterMenuMobile.schema = {
  title: 'admin/editor.FooterMenu.title',
  description: 'admin/editor.FooterMenu.description',
  type: 'object',
  properties: {
    footerArray: {
      title: 'Footer',
      type: 'array',
      items: {
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'admin/editor.FooterMenu.Titlecontent',
            default: '',
          },
          link: {
            type: 'string',
            title: 'admin/editor.FooterMenu.Linkcontent',
            default: '',
          },
          submenus: {
            type: 'array',
            title: 'admin/editor.FooterMenu.submenuTitle',
            items: {
              properties: {
                __editorItemTitle: {
                  type: 'string',
                  title: 'admin/editor.FooterMenu.submenuTitlecontent',
                  default: '',
                },
                link: {
                  type: 'string',
                  title: 'admin/editor.FooterMenu.submenuLinkcontent',
                  default: '',
                },
              },
            },
          },
        },
      },
    },
  },
}

export default FooterMenuMobile
