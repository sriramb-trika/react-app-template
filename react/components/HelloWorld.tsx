import React from 'react'

type HelloWorldProps = {
  firstName: string
  lastName: string
}

const HelloWorld = (props: HelloWorldProps) => {
  return (
    <div>
      <p>
        {props.firstName} {props.lastName}
      </p>
    </div>
  )
}

export default HelloWorld
