/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type { ChangeEvent } from 'react'
import React, { useState, useRef } from 'react'
import { useMutation } from 'react-apollo'
import ReCAPTCHA from 'react-google-recaptcha'
import { Button } from 'vtex.styleguide'

import createDocument from '../../graphql/saveDocument.graphql'
import uploadDocument from '../../graphql/uploadFile.graphql'
import styles from './ContactSave.css'

interface MutationData {
  uploadFile: { fileUrl: string }
}

const ContactUsForm = () => {
  const [saveContact] = useMutation(createDocument)
  const [uploadFile] = useMutation<MutationData>(uploadDocument)
  const [recaptchaFlag, setRecaptchaFlag] = useState(false)

  const [data1, setData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
    upload: '',
  })

  const captchaRef = useRef(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line vtex/prefer-early-return

    if (e.target.files) {
      // eslint-disable-next-line prefer-destructuring
      const file = e.target.files[0]

      setData({ ...data1, [e.target.name]: file })
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const obj = captchaRef?.current as unknown as {
      getValue(): string
      reset(): void
    }

    const token = obj.getValue()

    obj.reset()
    if (token) {
      console.log(data1.upload)
      const { data, errors } = await uploadFile({
        variables: {
          file: data1.upload,
        },
      })

      if (errors) {
        console.log(errors)
      }

      saveContact({
        variables: {
          document: {
            document: {
              name: data1.name,
              email: data1.email,
              message: data1.message,
              subject: data1.subject,
              upload: data,
            },
          },
          dataEntity: 'TC',
          schema: 'v1',
        },
      })
        .then(() => {
          console.log('successful')
        })
        .catch((err) => {
          console.log('Error in saving the document')
          console.log('error', err)
        })

      setRecaptchaFlag(false)
    } else {
      setRecaptchaFlag(true)
    }
  }

  return (
    <div className="w-100 flex flex-column self-center mb7">
      <div className="flex flex-column justify-center self-center-l ma7 w-25">
        <div className="flex flex-column mb5 br2">
          <label className="mb3">Name</label>
          <input
            name="name"
            className="h2 br2 b--black-20"
            onChange={(e: any) =>
              setData({ ...data1, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex flex-column mb5 br2">
          <label className="mb3">Email</label>
          <input
            name="email"
            className="h2 br2 b--black-20"
            onChange={(e: any) =>
              setData({ ...data1, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex flex-column mb5 br2">
          <label className="mb3">Subject</label>
          <input
            name="subject"
            className="h2 br2 b--black-20"
            onChange={(e: any) =>
              setData({ ...data1, [e.target.name]: e.target.value })
            }
          />
        </div>
        <label className="mb3">Message</label>
        <textarea
          className="h4 br2 b--black-20"
          name="message"
          onChange={(e: any) =>
            setData({ ...data1, [e.target.name]: e.target.value })
          }
        />
        <div className="mb5 pa3 ">
          <input
            type="file"
            name="upload"
            accept=".jpg,.png"
            className="ba b--light-silver br2 b--black-20 w-100 p3"
            // onChange={(e: any) => {
            // setData({ ...data1, [e.target.name]: e.target.value })
            onChange={handleFileChange}
          />
        </div>{' '}
        <div className="flex flex-column mb5">
          <ReCAPTCHA
            sitekey=""
            ref={captchaRef}
            onChange={() => setRecaptchaFlag(false)}
          />
          {recaptchaFlag && <p className="red">Please validate captcha</p>}
          <div className={`${styles.agreement}`}>
            <div className={`${styles.agreement}`}>
              <Button variation="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default ContactUsForm
