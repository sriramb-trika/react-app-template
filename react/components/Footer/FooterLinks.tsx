import React from 'react'
import { Link, useRuntime } from 'vtex.render-runtime'

import styles from './FooterLinks.css'

interface Props {
  footerLinksArray: FooterLinksType[]
  fblink: SocialLinksType
  twitterlink: SocialLinksType
  instalink: SocialLinksType
  pininterestlink: SocialLinksType
  connectwithus: any
  copyright: string
  allRightsReserved: string
}
type FooterLinksType = {
  __editorItemTitle: string
  link: string
}

type SocialLinksType = {
  imagelink: string
  link: string
}
const FooterLinks: StorefrontFunctionComponent<Props> = ({
  footerLinksArray,
  fblink,
  instalink,
  connectwithus,
  copyright,
  allRightsReserved,
}) => {
  const { deviceInfo } = useRuntime()
  return (
    <div className={`${styles.footer_links}`}>
      <div className={`ma1  ${deviceInfo.isMobile ? `tl` : `tr`}` }>
        <p className={`ma1 f6 f5-l`}>{connectwithus}</p>
        <div className="flex items-center justify-start justify-end-l mb0">
          {instalink?.imagelink && (
            <div className={`pr5 pl5-l pr0-l`}>
              <Link to={instalink.link} className="black no-underline">
                <img src={instalink?.imagelink} alt="instagram" />
              </Link>
            </div>
          )}
          {fblink?.imagelink && (
            <div className={`pr5 pl5-l pr0-l`}>
              <Link to={fblink.link} className="black no-underline">
                <img src={fblink.imagelink} alt="facebook" />
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-wrap fr">
          {footerLinksArray?.map((item: FooterLinksType) => (
            <div className="f8 pr5 pl5-l pr0-l pv2">
              <Link to={item.link} className="f8 black no-underline">
                {item.__editorItemTitle}
              </Link>
            </div>
          ))}
          <div className="f8 pr5 pl5-l pr0-l pv2">{copyright}</div>
          <div className="f8 pl5-l pv2">{allRightsReserved}</div>
        </div>
      </div>
    </div>
  )
}

FooterLinks.schema = {
  title: 'admin/editor.footerLinks.title',
  description: 'admin/editor.footerLinks.description',
  type: 'object',
  properties: {
    connectwithus: {
      type: 'string',
      title: 'admin/editor.footerSocial.contactusname',
      default: '',
    },
    fblink: {
      type: 'object',
      title: 'admin/editor.footerSocial.fbTitle',
      properties: {
        imagelink: {
          type: 'string',
          title: 'admin/editor.footerSocial.fbimagelink',
          default:
            'https://projectantelope.vtexassets.com/assets/vtex.file-manager-graphql/images/e6f7bfd5-62cb-4ee3-9408-d3d7715a6fc9___638d6923036e3206ca80aa5e7782ff86.svg',
        },
        link: {
          type: 'string',
          title: 'admin/editor.footerSocial.fblink',
          default: '',
        },
      },
    },
    twitterlink: {
      type: 'object',
      title: 'admin/editor.footerSocial.twitterTitle',
      properties: {
        imagelink: {
          type: 'string',
          title: 'admin/editor.footerSocial.twitterimagelink',
          default:
            'https://projectantelope.vtexassets.com/assets/vtex.file-manager-graphql/images/854064b4-f96c-4847-ad7e-0dcc01225cb2___04212d1cc2730037a2a7d8945f704ed6.svg',
        },
        link: {
          type: 'string',
          title: 'admin/editor.footerSocial.twitterlink',
          default: '',
        },
      },
    },
    instalink: {
      type: 'object',
      title: 'admin/editor.footerSocial.instaTitle',
      properties: {
        imagelink: {
          type: 'string',
          title: 'admin/editor.footerSocial.instaimagelink',
          default:
            'https://projectantelope.vtexassets.com/assets/vtex.file-manager-graphql/images/3c43c1c4-3e06-4f82-b13f-8be21cabd6e2___91e212b6e2d9b9c2daa49b09da535a7f.svg',
        },
        link: {
          type: 'string',
          title: 'admin/editor.footerSocial.instalink',
          default: '',
        },
      },
    },
    pininterestlink: {
      type: 'object',
      title: 'admin/editor.footerSocial.pininterestTitle',
      properties: {
        imagelink: {
          type: 'string',
          title: 'admin/editor.footerSocial.pininterestimagelink',
          default:
            'https://projectantelope.vtexassets.com/assets/vtex.file-manager-graphql/images/65b30867-51ef-4ce9-8671-3cd7673602de___9aa68f1af44dcf5b03e0860404d5fb70.svg',
        },
        link: {
          type: 'string',
          title: 'admin/editor.footerSocial.pininterestlink',
          default: '',
        },
      },
    },
    footerLinksArray: {
      title: 'Footer Links',
      type: 'array',
      items: {
        properties: {
          __editorItemTitle: {
            type: 'string',
            title: 'admin/editor.footerLinks.Titlecontent',
            default: '',
          },
          link: {
            type: 'string',
            title: 'admin/editor.footerLinks.Linkcontent',
            default: '',
          },
        },
      },
    },
    copyright: {
      type: 'string',
      title: 'admin/editor.footerSocial.copyright',
      default: '',
    },
    allRightsReserved: {
      type: 'string',
      title: 'admin/editor.footerSocial.allRightsReserved',
      default: '',
    },
  },
}
export default FooterLinks
