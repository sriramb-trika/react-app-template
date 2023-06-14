import React from 'react'
import styles from './FooterMenu.css'
import { Link } from 'vtex.render-runtime'

interface Props {
  footerArray : FooterType[]
}

type FooterType = {
  __editorItemTitle:string
  link: string
  submenus : any
}

const FooterMenu : StorefrontFunctionComponent<Props> =  ({footerArray}) => {

  return (
    <>
    <div className={`${styles.footer}`}>
      <div className="flex center">
        {footerArray?.map((item: FooterType) => (
          <div className="flex-auto">
            <div className="pv4">
            <Link
              to={item.link}
              className={`${styles.menulinks} no-underline fw6`}
            >
              {item.__editorItemTitle}
            </Link>
            </div>
            <div>
              {item?.submenus?.map((innerItem : FooterType) => (
                 <div className="pv2 ">
                 <Link
                    to={innerItem.link}
                    className={`${styles.submenu_links} black no-underline fw6 f6`}
                  >
                  {innerItem.__editorItemTitle}
                 </Link>
                 </div>
              ))}
              </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

FooterMenu.schema = {
  title: "admin/editor.FooterMenu.title",
  description: "admin/editor.FooterMenu.description",
  type: "object",
  properties : {
    footerArray : {
      title: 'Menus',
      type: 'array',
      items: {
      properties : {
          __editorItemTitle : {
            type: 'string',
            title : 'admin/editor.FooterMenu.TitleContent',
            default : ''
          },
          link : {
            type: 'string',
            title : 'admin/editor.FooterMenu.LinkContent',
            default : ''
          },
          submenus : {
            type: 'array',
            title: 'admin/editor.FooterMenu.submenuTitle',
              items : {
                properties: {
                __editorItemTitle : {
                  type: 'string',
                  title : 'admin/editor.FooterMenu.submenuTitleContent',
                  default : ''
                },
                link : {
                  type: 'string',
                  title : 'admin/editor.FooterMenu.submenuLinkContent',
                  default : ''
              }
            }
          }
        }
      }
    }
  }
  }
}


export default FooterMenu
