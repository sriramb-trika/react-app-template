import type { FC } from 'react'
import React from 'react'
import { Link } from 'vtex.render-runtime'

import RightArrow from './RightArrow'

type MegaMenuItem = {
  active: boolean
  __editorItemTitle: string
  href: string
  secondLevel: MegaMenuItem[]
  thirdLevel: MegaMenuItem[]
  fourthLevel: MegaMenuItem[]
}
type MenuListProps = {
  currentMenu: MegaMenuItem
  currentSubMenu?: MegaMenuItem
  setCurrentSubMenu: React.Dispatch<
    React.SetStateAction<MegaMenuItem | undefined>
  >
}

const MenuList: FC<MenuListProps> = (props: MenuListProps) => {
  const { currentMenu, currentSubMenu, setCurrentSubMenu } = props

  return (
    <>
      {currentMenu?.secondLevel && currentMenu?.secondLevel.length > 0 && (
        <div className={`flex-auto pa3 w-25`}>
          {currentMenu.secondLevel.map(
            (subMenu: MegaMenuItem, index: number) => (
              <div
                className={`relative subCategory pv4 ph5 ${
                  (!currentSubMenu && index === 0) ||
                  currentSubMenu?.__editorItemTitle ===
                    subMenu.__editorItemTitle
                    ? 'bg-lightgrey br2'
                    : ''
                }`}
                onMouseOver={() => {
                  setCurrentSubMenu(subMenu)
                }}
              >
                <span className={`category no-underline db black `}>
                  {subMenu.__editorItemTitle}
                </span>
                <span
                  className={`flex items-center absolute top-0 bottom-0 right-1`}
                >
                  <RightArrow />
                </span>
              </div>
            )
          )}
          <div className={`pv3 ph5 mt5`}>
            <Link to={currentMenu.href} className={`ttu black`}>
              View All {currentMenu.__editorItemTitle}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default MenuList
