import React, { useEffect, useState } from 'react'
import { Link } from 'vtex.render-runtime'

import MenuList from './MenuList'
import MenuContent from './MenuContent'
import MenuSecondLevel from './MenuSecondLevel'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}

const Megamenu: StorefrontFunctionComponent = ({
  megaMenu,
}: {
  megaMenu?: MegaMenuItem[]
}) => {
  const [currentMenu, setCurrentMenu] = useState<MegaMenuItem>()
  const [currentSubMenu, setCurrentSubMenu] = useState<MegaMenuItem>()
  const filteredMenu = megaMenu?.filter((menu) => menu.active)
  const [thirdSubMenu, setThirdSubMenu] = useState<MegaMenuItem[]>()

  const getNameSlug = (name: string) => {
    return name.trim().replace(/\s+/g, '').toLowerCase()
  }

  useEffect(() => {
    if (!currentMenu) setThirdSubMenu([])

    const menus = currentMenu?.secondLevel.filter((items) => items.thirdLevel)

    setThirdSubMenu(menus)
  }, [currentMenu])

  return (
    <>
      <nav className={`flex mr4 overflow-hidden overflow-x-auto`}>
        <div className={`flex justify-left`}>
          <div className={`flex`}>
            {filteredMenu?.map((menuItem: MegaMenuItem) => (
              <div
                className={`mh3 f8 flex-auto`}
                id={`${menuItem.__editorItemTitle
                  .trim()
                  .replace(/\s+/g, '')
                  .toLowerCase()}`}
              >
                <Link
                  to={menuItem.href}
                  className={`department no-underline`}
                  onMouseOver={() => {
                    setCurrentMenu(menuItem)
                  }}
                >
                  {menuItem.__editorItemTitle}
                </Link>
              </div>
            ))}
          </div>
          <div
            className={`absolute left-0 w-100 bg-white z-1`}
            style={{ top: '100%' }}
            onMouseLeave={() => {
              setCurrentMenu(undefined)
              setCurrentSubMenu(undefined)
            }}
          >
            {
            currentMenu?.secondLevel && currentMenu?.secondLevel.length > 0 ? (
              <div
                className={`overflow-hidden overflow-y-auto flex-auto pa5 bb ${getNameSlug(
                  currentMenu.__editorItemTitle
                )} flex`}
                style={{ maxHeight: '40vh' }}
              >
                {thirdSubMenu && thirdSubMenu.length === 0 && (
                  <MenuSecondLevel
                    currentMenu={currentMenu}
                    currentSubMenu={currentSubMenu}
                  />

                ) }
                {thirdSubMenu && thirdSubMenu.length > 0 && (
                  <>
                    <MenuList
                      currentMenu={currentMenu}
                      currentSubMenu={currentSubMenu}
                      setCurrentSubMenu={setCurrentSubMenu}
                    />
                    <MenuContent
                      currentMenu={currentMenu}
                      currentSubMenu={currentSubMenu}
                    />
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  )
}

Megamenu.schema = {
  title: 'admin/editor.Megamenu.title',
  description: 'admin/editor.Megamenu.desc',
  type: 'object',
  properties: {
    megaMenu: {
      type: 'array',
      title: 'admin/editor.Megamenu.firstLevel',
      items: {
        properties: {
          active: {
            type: 'boolean',
            default: true,
            title: 'Active',
          },
          __editorItemTitle: {
            title: 'admin/editor.Megamenu.displayName',
            type: 'string',
          },
          href: {
            type: 'string',
            default: '',
            title: 'admin/editor.Megamenu.link',
          },
          secondLevel: {
            type: 'array',
            title: 'admin/editor.Megamenu.secondLevel',
            items: {
              properties: {
                __editorItemTitle: {
                  title: 'admin/editor.Megamenu.displayName',
                  type: 'string',
                },
                href: {
                  type: 'string',
                  default: '',
                  title: 'admin/editor.Megamenu.link',
                },
                thirdLevel: {
                  type: 'array',
                  title: 'admin/editor.Megamenu.thirdLevel',
                  items: {
                    properties: {
                      __editorItemTitle: {
                        title: 'admin/editor.Megamenu.displayName',
                        type: 'string',
                      },
                      href: {
                        type: 'string',
                        default: '',
                        title: 'admin/editor.Megamenu.link',
                      }
                    },
                  },
                }
              },
            },
          },
        },
      },
    },
  },
}

export default Megamenu