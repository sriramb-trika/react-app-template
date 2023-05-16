import React, { useState, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import documents from '../../graphql/getDocument.graphql'
// import ContactDetails from './ContactDetails'
import styles from '../ContactLoad/ContactLoad.css'

const ContactLoad: StorefrontFunctionComponent = (
  {}
) => {

  const defaultPageSize = 5
  const[allData, setAllData] = useState<any>([])
  const[pageSize,setPageSize] = useState(5)
  const sort = ''
  const showMoreText = 'Show More..'

  const baseQuery = {
    acronym : "TC",
    schema: "TestContact"
  }

  const initQuery = {
    variables: {
    ...baseQuery,
      fields: [
        'name',
        'email',
        'subject',
        'message'
      ],
      pageSize: pageSize,
      sort:"name"
    }
  }

  const [getDocuments, {data:cData, loading,error}] = useLazyQuery(documents, initQuery)
  useEffect(() => {
    if(loading) return

    getDocuments({
      variables: {
        ...baseQuery,
        fields: [
          'name',
          'email',
          'subject',
          'message'
        ],
        pageSize: pageSize,
        sort:"name"
      },
    })

    if(!cData?.documents) return

    if (cData?.documents.length > 0) {
      setAllData([...cData?.documents])
    }
  }, [cData, pageSize, sort])


  const filtered:any = []
  if(allData && allData.length > 0) {
    const uniqueValues = new Set(allData)

    for(const item of uniqueValues) {
      filtered.push(item)
    }
  }
return(
  <>
  {filtered && filtered.length > 0
  ? <div>{filtered?.map((item: any) => (
    <div  className={`flex justify-between pv6 ph5 b--grey`}>
       <div className={`flex flex-wrap items-center w-100 w-50-m`}>
       <div className={`${styles.Box}`}>
                <h2 className={`t-semiBoldFont f5 f4-m ma0 pa0 mb2`}>
                  {item.fields[0].value !== 'null' && item.fields[0].value}<br/></h2>
                  {item.fields[1].value !== 'null' && item.fields[1].value}<br/>
                  <p className={`f8 ma0 pa0 darkgrey`}>{item.fields[2].value !== 'null' && item.fields[2].value}</p>
                {/* </h2> */}
                <p className={`f8 ma0 pa0 darkgrey`}>
                  {`${item.fields[3].value}`}
                </p>
              </div>
    </div></div>
     )) }</div> : <div><p>Unable to fetch data..</p></div>}
  <div className={'relative mw9 center ph5 mv7 tc'}>
        <div className={``} id="endOfLine">
          {loading ? (
            <p className={`pa0 ma0 themeRed`}>
              <Spinner size={40} color="currentColor" />
            </p>
          ) : ( error ?
            <div>
                <p className={`tc pa5`}>Unable to retrieve data</p>

            </div>

           :  <div

          onClick={() => setPageSize(pageSize + 5)}
          style={{
            pointerEvents:
              cData?.documents.length < defaultPageSize ? 'none' : 'unset',
          } }
        >
     <div
              className={`styles.Button`}>{showMoreText}</div>

        </div>)}
        </div>
      </div>
  </>
)
}

export default ContactLoad
