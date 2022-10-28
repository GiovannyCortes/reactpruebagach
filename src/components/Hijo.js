import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';

class Hijo extends Component {
    state = {
        doctores : [],
        statusGet : false
    }

    /* 
        Este método realiza una llamada GET a la API para recuperar 
        los doctores de la especialidad seleccionada.
    */
    loadDoctores = () => {
        var url = Global.urldoctores + '/api/Doctores/DoctoresEspecialidad/' + this.props.especialidad;
        axios.get(url).then(response => {
            this.setState({
                doctores : response.data,
                statusGet : true
            });
        });
    }

    componentDidMount = () => {
        this.loadDoctores();
    }

    /*
        Añadimos un props distinto al de especialidad. Por ejemplo 'actualiza'. 
        Cuando haga click en el botón, cambio el estado de actualiza. Después 
        'componentDidUpdte' comprobará dicho cambio, y volverá a dibujar el componente.
    */
    componentDidUpdate = (oldProps) => {
        if (oldProps.actualiza != this.props.actualiza) {
            this.loadDoctores();
        }
    }

    render() {
        return (
            <div>
                <table border='1' style={{margin:"15px auto"}}>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.statusGet == true && (
                                this.state.doctores.map((doctor, index) => {
                                    return (
                                        <tr key={doctor.idDoctor}>
                                            <td>{doctor.apellido}</td>
                                            <td>{doctor.especialidad}</td>
                                            <td>{doctor.salario}</td>
                                        </tr>
                                    );
                                })
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Hijo;