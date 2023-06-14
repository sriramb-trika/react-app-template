import React, { useState } from 'react'
import { Link } from 'vtex.render-runtime'

import MinusIcon from '../Header/MinusIcon'
import PlusIcon from '../Header/PlusIcon'


const Accordion = ({title, content} : any) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <>
      <div className="accordion">
        <div
        className="flex flex-row content-between pointer pv5"
        onClick={() => setIsActive(!isActive)}
        >
          <div className="fw6 w-100">
            {title}
          </div>
          <div className="flex fw6 items-center">
            {isActive ? <MinusIcon /> : <PlusIcon />}
          </div>
        </div>
        <div>
        {isActive &&
          content?.submenus?.map((inneritem: any) => (
            <div className="pv3">
              <Link to={inneritem.link} className={`f8 black no-underline`}>
                {inneritem.__editorItemTitle}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Accordion
