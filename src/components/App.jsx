import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../assets/normalize.css";
import axios from "axios";
import unirest from "unirest";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      studentId: "",
      student: {},
      nombre: "",
      correo: "",
      carrera: ""
    };
  }

  handleGetStudents = () => {
    fetch("http://localhost:4567/rest/estudiantes/")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ students: data });
      });
  };


  handleCreateStudent = () => {
    const {nombre, correo, carrera} = this.state;
    fetch("http://localhost:4567/rest/estudiantes/", {
      method: "POST",
      body: {"nombre": nombre, "correo": correo, "carrera": carrera},
      "accept-type": "application/json"
    })
  };

  handleGetStudent = () => {
    fetch(`http://localhost:4567/rest/estudiantes/${this.state.studentId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ student: data });
        console.log(data);
      });
  };

  render() {
    const { students, student } = this.state;
    console.log(students);
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleGetStudents}>
            Lista de estudiantes
          </button>
          {students.length > 0 && (
            <ul>
              {students.map((myStudent, index) => {
                return (
                  <li key={index}>
                    <b>Nombre:</b> {myStudent.nombre} - <b>Matricula:</b>{" "}
                    {myStudent.matricula},
                  </li>
                );
              })}

              <br />
            </ul>
          )}
        </div>
        <div>
          <input type="test" onChange={(e) => this.setState({studentId: e.target.value})} />
          <button type="button" onClick={this.handleGetStudent}>
            Obtener estudiante
          </button><br/>
          { student !== {} && (
            <span>
              <b>Nombre:</b> {student.nombre} - <b>Matricula:</b> {student.matricula}
            </span>
          )}
        </div><br/>
        
        <div>
          <input type="nombre" placeholder="Nombre" onChange={(e) => this.setState({nombre: e.target.value})}/>
          <input type="correo" placeholder="Correo" onChange={(e) => this.setState({correo: e.target.value})}/>
          <input type="carrera" placeholder="carrera" onChange={(e) => this.setState({carrra: e.target.value})}/>
          <button typoe="button" onClick={this.handleCreateStudent}>Crear Estudiante</button>
        </div>

      </div>
    );
  }
}

export default App;
