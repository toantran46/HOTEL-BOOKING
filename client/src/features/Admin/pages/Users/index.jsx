import { NguoiDungApi } from "api/NguoiDungApi";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Pagination from "features/Admin/components/Pagination";
import "./user.scss";

function UserPage(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { NguoiDungs } = await NguoiDungApi.getAll();
        setUsers(NguoiDungs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="user-list shadow-sm">
      <div className="table-responsive">
        <Table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="" key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {user.Avatar ? (
                    <img
                      className="user-list__avatar"
                      src={user.Avatar}
                      alt="avatar"
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor:
                          index % 3 === 0
                            ? "#20c997"
                            : index % 3 === 1
                            ? "#fd7e14"
                            : "#6610f2",
                      }}
                      className="user-list__avatar-name shadow-sm"
                    >
                      {user.HoTen.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{user.HoTen}</td>
                <td>{user.SDT}</td>
                <td>{user.Email}</td>
                <td>{user.Quyen}</td>
                <td>
                  <div className="user-list__actions">
                    <div className="user-list__action shadow-sm bg-warning">
                      <i className="fa-solid fa-pen user-list__icon"></i>
                    </div>
                    <div className="user-list__action shadow-sm bg-danger">
                      <i className="fa-solid fa-trash user-list__icon"></i>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination page={1} totalRows={50} limit={10} />
    </div>
  );
}

export default UserPage;
