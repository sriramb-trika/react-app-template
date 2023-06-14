import React, {useEffect, useState, useRef } from 'react'
// import styles from './ContactAll.css'

const options = {
  "method" : "get",
  "header" : {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
  }
}

const ContactAll = () => {
  const [contactData, setContactData] = useState<any[]>([])
  const dataFetchedRef = useRef(false);

  const getAllContacts = async () => {
    try {
      const response = await fetch("/_v0/contact", options);
      const json = await response.json();
      if(json.length > 0) {
        setContactData(json);
      }
    } catch(error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getAllContacts();
  }, [])

  return (
    <>
      {
        <div className={''}>
            <div className={`flex flex-wrap justify-between pv6 ph5 bt b--grey`}>
              <div className={`flex flex-wrap items-center w-100 b`}>
                <div className={`relative mb5 mb0-m w-10`}>
                  Name
                </div>
                <div
                  className={`relative mb5 mb0-m w-25`} >
                  Email
                </div>
                <div className={`relative mb5 mb0-m w-25`} >
                  Subject
                </div>
                <div
                  className={`relative mb5 mb0-m w-35`}>
                  Message
                </div>
              </div>
            </div>
            {contactData?.map((item: any) => (
              <div className={`flex flex-wrap justify-between pv6 ph5 bt b--grey`}>
                <div className={`flex flex-wrap items-center w-100`}>
                  <div className={`relative mb5 mb0-m w-10`}>
                    {item.name}
                  </div>
                  <div
                    className={`relative mb5 mb0-m w-25`} >
                    {item.email}
                  </div>
                  <div className={`relative mb5 mb0-m w-25`} >
                    {item.subject}
                  </div>
                  <div
                    className={`relative mb5 mb0-m w-35`}>
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
      </div>
      }
    </>
  )
}

export default ContactAll
