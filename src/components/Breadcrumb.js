import React, { Fragment } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const BreadcrumbObject = (props) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>{props.previous}</BreadcrumbItem>
      {!props.id && <BreadcrumbItem active>{props.actual}</BreadcrumbItem>}
      {props.id && (
        <>
          <BreadcrumbItem active>
            <Link to={props.previousUrl}>{props.actual}</Link>
          </BreadcrumbItem>
          {!props.extraId && <BreadcrumbItem active>{props.id}</BreadcrumbItem>}
        </>
      )}
      {props.extra && (
        <>
          <BreadcrumbItem active>
            <Link to={props.extraUrl}>{props.extra}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.extraId}</BreadcrumbItem>
        </>
      )}
    </Breadcrumb>
  )
}

export default BreadcrumbObject
