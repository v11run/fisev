import React, { useState } from 'react';
import './FormTable.css';
import jsonData from './data.json';

const FormTable = () => {
  const [employees, setEmployees] = useState(jsonData.employees);
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    if (selectedSkill === '') {
      return true;
    }
    return employee.skills.includes(selectedSkill);
  });

  return (
    <div className="form-table-container">
      <div className="filter-container">
        <label htmlFor="skill-filter">Filter by Skill:</label>
        <select
          id="skill-filter"
          value={selectedSkill}
          onChange={handleSkillChange}
        >
          <option value="">All</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Photoshop">Photoshop</option>
          <option value="Manual Testing">Manual Testing</option>
          <option value="SQL">SQL</option>
        </select>
      </div>
      <table className="form-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Projects</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name || '-'}</td>
              <td>
                {employee.projects ? (
                  employee.projects.map((project, projectIndex) => (
                    <div key={projectIndex}>
                      <strong>{project.name}</strong>
                      <p>{project.description}</p>
                    </div>
                  ))
                ) : (
                  '-'
                )}
              </td>
              <td>{employee.designation || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormTable;
