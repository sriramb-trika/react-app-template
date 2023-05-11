import React, { useState, useEffect } from 'react'
import { useLazyQuery } from 'react-apollo'
import { Spinner } from 'vtex.styleguide'

import documents from '../../graphql/getDocument.graphql'
import ContactDetails from './ContactDetails'

const ContactLoad: StorefrontFunctionComponent = (
  {}
) => {

  console.log("loading...")
  const defaultPageSize = 5
  const[allData, setAllData] = useState<any>([])
  const[pageNo,setPageNo] = useState(1)
  // const[sort,setSort]= useState('')
  const sort = ''
  const showMoreText = 'Show More..'
  const baseQuery = {
    acronym : "TC",
    schema: "TestContact"
  }

  const initQuery = {
    variables: {
      acronym : "TC",
      schema: "TestContact",
      where: '',
      fields: [
        'name',
        'email',
        'subject',
        'message'
      ],
      page:1,
      pageSize: defaultPageSize,
      sort : sort
    }
  }

  const [getDocuments, {loading, error, data:cData}] = useLazyQuery(documents, initQuery)
  console.log(cData);
  useEffect(() => {
    // if(loading) return

    getDocuments({
      variables: {
        ...baseQuery,
        where: '',
        fields: [
          'name',
          'email',
          'subject',
          'message'
        ],
        page:pageNo,
        pageSize: defaultPageSize,
        sort : sort
      },
    })

    if(!cData?.documents) return


    if (cData?.documents.length > 0) {
      pageNo === 1
        ? setAllData([...cData?.documents])
        : setAllData([...allData, ...cData?.documents])
    }
  }, [cData, pageNo, sort])


  const filtered = []
  if(allData && allData.length > 0) {
    const uniqueValues = new Set(allData)

    for(const item of uniqueValues) {
      filtered.push(item)
    }
  }
return(
  <>
  <div> <ContactDetails details={filtered} /></div>
  <div className={'relative mw9 center ph5 mv7 tc'}>
        <div className={``} id="endOfLine">
          {loading ? (
            <p className={`pa0 ma0 themeRed`}>
              <Spinner size={30} color="currentColor" />
            </p>
          ) : error ? (
            <p className={`tc pa5`}>Unable to retrieve data</p>
          ) : null}
          {!loading ? (
            <div
              className={`dib white ph7 pv5 br-pill pointer tc ${
                cData?.documents.length < defaultPageSize
                  ? 'bg-disabled'
                  : 'bg-themeRed'
              }`}
              onClick={() => setPageNo(pageNo + 1)}
              style={{
                pointerEvents:
                  cData?.documents.length < defaultPageSize ? 'none' : 'unset',
              }}
            >
              {showMoreText}
            </div>
          ) : null}
        </div>
      </div>
  </>
)
}

export default ContactLoad
