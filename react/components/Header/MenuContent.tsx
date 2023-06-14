import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}

type MenuContentProps = {
  currentMenu: MegaMenuItem
  currentSubMenu?: MegaMenuItem
}

const MenuContent: FC<MenuContentProps> = (props: MenuContentProps) => {
  const { currentMenu, currentSubMenu } = props
  const subMenu = currentSubMenu ?? currentMenu.secondLevel?.[0]

  return (
    <>
      {subMenu && (
        <div className={`flex flex-auto w-75 pa3`}>
          <div className={`flex-auto dn flex`}>
            <div
            >
              {subMenu.thirdLevel &&
                subMenu.thirdLevel.length > 0 &&
                subMenu.thirdLevel.map((subsubCat: MegaMenuItem) => (
                  <div className={`${subsubCat.__editorItemTitle} w-33 pb7`}>
                    <Link
                      to={subsubCat.href}
                      className={`t-semiBoldFont black no-underline pointer`}
                    >
                      {subsubCat.__editorItemTitle}
                    </Link>
                  </div>
                ))}
              <div className={`pb3`}>
                <Link to={subMenu.href} className={`ttu no-underline pointer`}>
                  View All {subMenu.__editorItemTitle}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MenuContent
