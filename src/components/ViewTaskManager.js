import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  fetchTasks,
  fetchUsers,
  updateTask,
} from "../redux/Actions/Actions";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "./style.css";
import AddTask from "./AddTask";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import ReactPaginate from "react-paginate";

const ViewTaskManager = () => {
  const Users = useSelector((state) => state.fetchUsersReducer.users);
  const tasks = useSelector((state) => state.fetchTasksReducer.tasks);

  const [ID, setID] = useState();
  const navigate = useNavigate();

  console.log(Users);
  // console.log(Tasks);

  // const { users } = Users;
  // const { tasks } = Tasks;

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchUsers());
    dispatch(fetchTasks());
    // dispatch(addTask());
    // dispatch(updateTask());
    // dispatch(deleteTask());
    // eslint-disable-next-line
  }, []);

  const [addTrue, setAddTrue] = useState(false);
  const [editTrue, setEditTrue] = useState(false);

  const handleAdd = () => {
    setAddTrue(!addTrue);
    setEditTrue(false);
  };

  const handleEdit = (task) => {
    sessionStorage.setItem("task", JSON.stringify(task));
    setEditTrue(!editTrue);
    setAddTrue(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmBox = window.confirm("Do you really want to delete?");
    if (confirmBox === true) {
      dispatch(deleteTask(ID));
    }
  };

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 25;

  const pagesVisited = pageNumber * usersPerPage;

  const pageCounter = Math.ceil(tasks && tasks.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayTasks = tasks ? (
    tasks
      .slice(pagesVisited, pagesVisited + usersPerPage)

      .map((task, index) => {
        const {
          id,
          message,
          assigned_to,
          assigned_name,
          created_on,
          due_date,
          priority,
        } = task;
        return (
          <tr key={index}>
            <td>
              <input
                type="radio"
                name="radioButton"
                className="radioButton"
                onChange={() => setID(id)}
              />
            </td>
            <td>{index + 1}</td>
            <td>{id}</td>
            <td>{message}</td>
            <td>{assigned_name}</td>
            <td>{assigned_to}</td>
            <td>{created_on}</td>
            <td>{due_date}</td>
            <td>{priority}</td>
            <td>
              <Button
                className=""
                variant="primary"
                onClick={() => handleEdit(task)}
              >
                Edit
              </Button>{" "}
            </td>
          </tr>
        );
      })
  ) : (
    <tr>
      <td>Loading...</td>
    </tr>
  );

  return (
    <>
      {/* {!!addTrue && <AddTask />} */}

      <Container className="py-5">
        <Row className="py-1"></Row>
        {!!editTrue && <EditTask />}

        <div className="mb-1" style={{ display: "flex" }}>
          <Button onClick={handleAdd} variant="success" key={1}>
            Add
          </Button>{" "}
          <Button
            variant="danger"
            key={2}
            onClick={handleDelete}
            style={{ marginLeft: "auto" }}
          >
            Delete
          </Button>{" "}
        </div>

        {!!addTrue && <AddTask />}

        <Row style={{ textAlign: "center" }} className="mt-5">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCounter}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </Row>

        <Row>
          <Table
            className="table"
            striped
            bordered
            hover
            responsive="lg"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Index</th>
                <th>ID</th>
                <th>Message</th>
                <th>Assigned Name</th>
                <th>Assigned To ID</th>
                <th>Created On</th>
                <th>Deu Date</th>
                <th>Priority</th>
                <th>View/Edit</th>
              </tr>
            </thead>

            <tbody>{displayTasks}</tbody>

            {/* <tbody>
              {tasks
                ? tasks.map((task, index) => {
                    
                  })
                : ""}
            </tbody> */}
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default ViewTaskManager;
