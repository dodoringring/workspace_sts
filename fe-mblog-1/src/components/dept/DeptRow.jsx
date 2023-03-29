import React from 'react'
import { Link } from 'react-router-dom'
//반드시 대문자여야 함수가 아니라 컴포넌트가 됨
const DeptRow = ({dept}) => {
  return (
    <>
      <tr>
        <td>{dept.DEPTNO}</td>
        <td>
          <Link to={"/deptdetail/" + dept.DEPTNO} className="btn btn-primary">{dept.DEPTNO}</Link>
        </td>
        <td>{dept.DNAME}</td>
        <td>{dept.LOC}</td>
      </tr>
    </>
  )
}

export default DeptRow
