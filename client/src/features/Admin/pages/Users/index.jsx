import { NguoiDungApi } from "api/NguoiDungApi";
import Pagination from "features/Admin/components/Pagination";
import React, { useEffect, useState } from "react";
import { Badge, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import "./user.scss";
import FormUser from "../../components/UserForm";

function UserPage(props) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [showModale, setShowModal] = useState(false);

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

  const showModal = (user) => {
    setShowModal(true);
    setSelectedUser(user);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    data.Quyen = data.Quyen.value;
    if (!data.password) {
      const { password, repeatPassword, ...userInfo } = data;
      try {
        await NguoiDungApi.update(selectedUser._id, userInfo);
      } catch (error) {
        console.log(error);
      }
    } else {
      const { repeatPassword, ...userInfo } = data;
      try {
        await NguoiDungApi.update(selectedUser._id, userInfo);
      } catch (error) {
        console.log(error);
      }
    }
    setShowModal(false);
  };

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
              <th>Roles</th>
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
                      {user.name
                        .split(" ")
                        [user.name.split(" ").length - 1].charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </td>
                <td>
                  <Badge color="light" className="text-dark">
                    {user.name}
                  </Badge>
                </td>
                <td>
                  <Badge color="warning">{user.phone}</Badge>
                </td>
                <td>
                  <Badge color="primary">{user.email}</Badge>
                </td>
                <td>
                  <Badge color="success">{user.Quyen}</Badge>
                </td>
                <td>
                  <div className="user-list__actions">
                    <div
                      onClick={() => showModal(user)}
                      className="user-list__action shadow-sm bg-warning"
                    >
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
      <Modal centered isOpen={showModale} toggle={hideModal}>
        <ModalHeader toggle={hideModal}>
          <div className="sidebar__header ps-0 ">
            <img
              className="sidebar__logo-name ms-0"
              src="https://www.einfosoft.com/templates/admin/spice/source/assets/img/logo.png"
              alt="admin logo"
            />
            <span className="sidebar__logo-name text-dark">LTH Booking</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormUser
            selectedUser={selectedUser}
            hideModal={hideModal}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UserPage;
