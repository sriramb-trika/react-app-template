import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { Button } from 'vtex.styleguide'

import saveDocument from '../../graphql/saveDocument.graphql'
import styles from './ContactSave.css'

const ContactSave: StorefrontFunctionComponent = (errorMsg) => {
  const [saveToMasterData] = useMutation(saveDocument)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const [errMsg, setErrMsg] = useState(errorMsg)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    // setLoadingBtn(true)

    const inputData = []
    const formData: any = new FormData(event.currentTarget)

    const obj = {}

    for (const [key, value] of formData.entries()) {
      // inputData.push({ key })
      obj.key = value
    }

    // eslint-disable-next-line no-console
    console.log(obj.keys)

    saveToMasterData({
      variables: {
        dataEntity: 'TC',
        document: {
          document: [...inputData],
        },
        schema: 'TestContact',
      },
    })
      .then(() => {
        setError(false)
        setSuccess(true)
        setLoadingBtn(false)
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log(errorMsg)
        setError(true)
        setSuccess(false)
        setLoadingBtn(false)
        setErrMsg(errorMsg)
      })
  }

  return (
    <>
      <div className={`${styles.contactInfo}`}>
        <div>
          <h2 className={`${styles.title}`}>Contact Info</h2>
          <form onSubmit={handleSubmit} className={`${styles.contactCreate}`}>
            <label className={`${styles.label}`}>
              Name
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name here"
                className={`${styles.textbox}`}
              />
            </label>
            <label className={`${styles.label}`}>
              Email ID
              <input
                type="text"
                name="email"
                required
                placeholder="abc@mail.com"
                className={`${styles.textbox}`}
              />
            </label>
            <label className={`${styles.label}`}>
              Message
              <input
                type="text"
                name="message"
                required
                placeholder="Message here.."
                className={`${styles.textbox}`}
              />
            </label>
            <label className={`${styles.label}`}>
              Subject
              <input
                type="text"
                name="subject"
                required
                placeholder="Subject"
                className={`${styles.textbox}`}
              />
            </label>
            <div className={`${styles.agreement}`}>
              <Button variation="primary" isLoading={loadingBtn} type="submit">
                Submit
              </Button>
            </div>
          </form>
          {error && !success && (
            <div className={`${styles.error}`}>{errMsg}</div>
          )}{' '}
        </div>
      </div>
    </>
  )
}

export default ContactSave
