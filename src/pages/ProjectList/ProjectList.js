import { DashOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteProject, getProject } from "../../features/Project/projectSlice";
import { openNotification } from "../../util/notification";
import CreateProject from "../Modal/Project/CreateProject";

const ProjectList = () => {
  const { user } = useSelector((state) => state.auth);
  const [dataProjects, setDataProjects] = useState([]);
  const { projects, isSuccess, message, isError } = useSelector(
    (state) => state.project
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      openNotification("error", "Error", message);
    }

    // if (!user) {
    //   history.push("/login");
    // }
    dispatch(getProject());
  }, [dispatch]);

  useEffect(() => {
    if (!projects) return;
    setDataProjects(projects.allProject);
  }, [projects]);
  const handleClick = (id) => {
    dispatch(deleteProject(id))
    dispatch(getProject());
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
          {projects && dataProjects?.map((item) => {
            return (
              <tr style={{ height: 40 }}>
                <td style={{ width: "20%" }}>
                  <NavLink to={`/project/${item.id}/board`}>
                    {item.name}
                  </NavLink>
                </td>
                <td style={{ width: "15%" }}>JIRA</td>
                <td style={{ width: "20%" }}>Team-managed software</td>
                <td style={{ width: "20%" }}>Phan Hieu</td>
                <td>
                  <Tooltip
                    style={{ background: "white" }}
                    title={
                      <div style={{width: 200, display: 'block'}}>
                        <NavLink to={`/project/${item.id}/project-settings`}>
                          Project Settings
                        </NavLink>
           

                        <Button onClick={() => handleClick(item.id)} style={{color: '#fff', cursor:'pointer', background: 'none', border: 'none'}} >Move to trash</Button>
          
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
