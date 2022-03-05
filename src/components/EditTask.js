import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTaskAction, updateTask } from "../redux/Actions/Actions";

const EditTask = () => {
  const dispatch = useDispatch();

  const task = JSON.parse(sessionStorage.getItem("task"));

  console.log(task);

  const {
    message,
    due_date,
    priority,
    assigned_to,
    id,
    assigned_name,
    created_on,
  } = task;

  console.log(id);

  const date = new Date(due_date);

  console.log(date);

  const [addTask, setAddTask] = useState({
    message: message,
    due_date: due_date,
    priority: priority,
    assigned_to: assigned_to,
    taskid: id,
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(addTask);

    setAddTask({
      ...addTask,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addTask);
    dispatch(updateTask(addTask));
  };

  return (
    <>
      <Container className="p-5">
        <Form onSubmit={handleSubmit} method="POST">
          
            <Row className="p-2 justify-content-center">
            <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label className="mb-3">
                  <b>Due Date</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Due Date"
                  name="due_date"
                  value={addTask.due_date}
                  onChange={handleInputs}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label className="mb-3">
                  <b>Priority</b>
                </Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Priority"
                  name="priority"
                  value={addTask.priority}
                  onChange={handleInputs}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label className="mb-3">
                  <b>Assigned To</b>
                </Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Assigned To"
                  name="assigned_to"
                  value={addTask.assigned_to}
                  onChange={handleInputs}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label className="mb-3">
                  <b>Task ID</b>
                </Form.Label>
                <Form.Control
                  type="Number"
                  disabled
                  placeholder="Task ID"
                  name="taskid"
                  value={addTask.taskid}
                  onChange={handleInputs}
                  required
                />
              </Form.Group>
            </Col>
            <Row className=" justify-content-center">
            <Col lg={6} md={8} sm={9} xs={12} className="mb-3">
              <Form.Group>
                <Form.Label className="mb-3">
                  <b>Task Message</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Task Message"
                  name="message"
                  value={addTask.message}
                  onChange={handleInputs}
                  required
                />
              </Form.Group>
            </Col>
            </Row>
            <Row className="justify-content-center" lg={5} md={4} sm={4} xs={4}>
              <Button variant="primary" type="submit" className="mt-3">
                Edit
              </Button>
            </Row>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default EditTask;
