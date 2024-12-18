import React from 'react'

const Infocontainer = (props) => {



  return (
    <div className="container page">
        {/* info div */}
        <div className="info">
          <h1>
            {props.title}
          </h1>
          <p>
          {props.description}
          </p>
        </div>
      </div>
  )
}

export default Infocontainer