import { DashOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Popover, Row, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteProject, getProject, reset } from "../../features/Project/projectSlice";
import { openNotification } from "../../util/notification";
import CreateProject from "../Modal/Project/CreateProject";

const ProjectList = () => {
  const { user } = useSelector((state) => state.auth);
  const { projects, isSuccess, message, isError } = useSelector(
    (state) => state.project
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    if (!user) {
      history.push("/login");
    }
    dispatch(getProject());
  }, [projects]);
  const handleClick = (id) => {
    dispatch(deleteProject(id))
  }
  return (
    <div style={{ minWidth: "800px", margin: "0px", padding: "0px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{ fontSize: 24, fontWeight: "bold", margin: "24px 0px 16px" }}
        >
          Projects
        </span>
        <CreateProject/>
      </div>
      <table style={{ width: "100%" }}>
        <thead style={{ borderBottom: " 2px solid #DFE1E6" }}>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "15%" }}>Key</th>
            <th style={{ width: "20%" }}>Type</th>
            <th style={{ width: "20%" }}>Lead</th>
          </tr>
        </thead>
        <tbody
          style={{ borderBottom: " 2px solid #DFE1E6", textAlign: "center" }}
        >
          {projects?.allProject?.map((item) => {
            return (
              <tr style={{ height: 40 }}>
                <td style={{ width: "20%" }}>
                  <NavLink to={`/project/${item.id}/board`}>
                    {item.name}
                  </NavLink>
                </td>
                <td style={{ width: "15%" }}>JIRA</td>
                <td style={{ width: "20%" }}>Team-managed software</td>
                <td style={{ width: "20%" }}></td>
                <td>
                  <Tooltip
                    style={{ background: "white" }}
                    title={
                      <div style={{width: 200, display: 'block'}}>
                        <NavLink to={`/project/${item.id}/project-settings`}>
                          Project Settings
                        </NavLink>
                        <div onClick={() => handleClick(item.id)}>

                        <span style={{cursor:'pointer'}} >Move to trash</span>
                        </div>
                      </div>
                    }
                    placement="bottomRight"
                  >
                    <DashOutlined />
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
