import React, { useEffect, useState } from 'react'

const PageHeader = (props) => {
  return (
    <>
      {/* page header starts here */}
      <section className="pageheader text-center">
        <div className="for-pageheader-back">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-wrapper">
                <h2>{props.pagename}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page header ends here */}
    </>
  )
}

export default PageHeader
