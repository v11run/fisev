import React, { useState } from 'react';
import './FormTable.css';
import jsonData from './data.json';

const FormTable = () => {
  const [employees, setEmployees] = useState(jsonData.employees);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const hasSelectedSkills =
      selectedSkills.length === 0 || employee.skills.some((skill) => selectedSkills.includes(skill));
    const matchesSearchQuery = employee.name && employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    return hasSelectedSkills && matchesSearchQuery;
  });

  const filteredEmployeesWithNames = filteredEmployees.filter((employee) => employee.name);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="form-table-container">
      <div className="filter-container">
        <label htmlFor="skill-filter">Filter by Skills:</label>
        <div
          id="skill-filter"
          className={`dropdown-checkbox ${dropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
        >
          
          <label htmlFor="toggle" className="toggle-label">
            <span className="toggle-text">Select Skills</span>
            <span className="toggle-arrow">&#9662;</span>
          </label>
          <ul className="checkbox-list">
            {['JavaScript', 'Python', 'Java', 'HTML', 'CSS', 'Photoshop', 'Manual Testing', 'SQL'].map((skill) => (
              <li key={skill}>
                <input
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSkillChange}
                />
                <label>{skill}</label>
              </li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="form-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Projects</th>
            <th>Designation</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployeesWithNames.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
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
              <td>{employee.skills.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
                };
export default FormTable;