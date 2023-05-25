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

const MenuSecondLevel: FC<MenuContentProps> = (
  props: MenuContentProps
) => {
  const { currentMenu, currentSubMenu } = props
  const subMenu = currentSubMenu ?? currentMenu

  return (
    <>
      {subMenu && (
        <div className={`w-100 pa3`}>
          <div className={`flex self-start flex-wrap w-100`}>
            {subMenu.secondLevel &&
              subMenu.secondLevel.length > 0 &&
              subMenu.secondLevel.map((subsubCat: MegaMenuItem) => (
                <div className={`${subsubCat.__editorItemTitle} w-25 pb5`}>
                  <Link
                    to={subsubCat.href}
                    className={`t-semiBoldFont black no-underline`}
                  >
                    {subsubCat.__editorItemTitle}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default MenuSecondLevel
