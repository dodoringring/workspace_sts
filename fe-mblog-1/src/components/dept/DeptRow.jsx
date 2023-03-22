import React from 'react'
import { Link } from 'react-router-dom'

const DeptRow = ({dept}) => {
  return (
    <>
      <tr>
        <td>{dept.DEPTNO}</td>
        <td>
          <Link to={"/deptdetail/"+dept.DEPTNO} className="btn btn-primary">
          {dept.DEPTNO}
          </Link>
          </td>
        <td>{dept.DNAME}</td>
        <td>{dept.LOC}</td>
      </tr>
    </>
  )
}

export default DeptRow
