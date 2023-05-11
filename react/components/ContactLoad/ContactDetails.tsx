import React, { useEffect } from 'react'

const ContactDetails : StorefrontFunctionComponent = ({
  filtered
}) => {
  useEffect(() => {
    console.log(filtered)
  },[filtered])

  if(filtered && filtered.length > 0) {

  }
  return (

    <>
    <div className={''}>
        {/* {filtered ? <div>Yes{filtered}</div> : <div>No</div>} */}
        {filtered?.map((item: any) => (
          <div>
              <h2 className={`t-semiBoldFont f5 f4-m ma0 pa0 mb2`}> {item.fields[0].value}</h2>
              <h2 className={`t-semiBoldFont f5 f4-m ma0 pa0 mb2`}> {item.fields[1].value}</h2>
              <h2 className={`t-semiBoldFont f5 f4-m ma0 pa0 mb2`}> {item.fields[2].value}</h2>
              <h2 className={`t-semiBoldFont f5 f4-m ma0 pa0 mb2`}> {item.fields[3].value}</h2>
          </div>
        )
        )}
    </div>
    </>
  )
}

export default ContactDetails
