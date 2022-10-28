import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import Hijo from './Hijo';

class Padre extends Component {
    // En el array de especialidades almacenaremos las opciones del select
    // El statusGet determinará cuando pintar las opciones (cuando axios GET haya terminado)
    // El statusHijo activará el componente Hijo 
    state = {
        especialidades : [],
        statusGet : false,
        statusHijo : false,
        actualiza : false
    }

    // Necesitaremos referencias hacia nuestros dos elementos de formulario
    cajaIncremento = React.createRef(); 
    selectMultiple = React.createRef();

    // Utilizo una variable común/general para almacenar 
    // la especialidad seleccionada
    seleccionado = ""; 

    loadSelect = () => {
        var url = Global.urldoctores + '/api/Doctores/Especialidades';
        axios.get(url).then(response => {
            this.setState({
                especialidades : response.data,
                statusGet : true
            });
        });
    }

    componentDidMount = () => { // Al montar el componente cargamos el select
        this.loadSelect();
    }

    incrementarSalarios = (e) => {
        e.preventDefault();
        
        // Recuperamos las opciones y el incremento del select y el input-number
        var options = this.selectMultiple.current.options;
        var incremento = this.cajaIncremento.current.value;

        // Recorro las opciones y almaceno en la variable general aquella seleccionada
        for (var option of options) {
            if (option.selected == true) {
                this.seleccionado = option.value;
            }
        }

        // Creo la cadena de la url y llamo al servicio de la API para actualizar los datos (incremento)
        var url = Global.urldoctores + '/api/Doctores/' + this.seleccionado + "/" + incremento;
        axios.put(url).then(response => {
            this.setState({
                statusHijo : true,
                actualiza : !this.state.actualiza
            });
        });
    }

    render() {
        return (
            <div>
                <h1>Incremento salarial doctores</h1>
                <form onSubmit={this.incrementarSalarios}>
                    <label>Seleccione una especialidad: </label>
                    <select ref={this.selectMultiple}>
                        {
                            (this.state.statusGet == true) && (
                                this.state.especialidades.map((esp, index) => {
                                    return (
                                        <option key={index}>
                                            {esp}
                                        </option>
                                    );
                                })
                            )
                        }
                    </select> <br/> 
                    <label>Incremento salarial: </label> 
                    <input type='number' ref={this.cajaIncremento} required/> 
                    <br/> <br/>
                    <button> 
                        Incrementar salarios
                    </button>
                </form>
                {
                    this.state.statusHijo == true && (
                        <Hijo especialidad={this.seleccionado} actualiza={this.state.actualiza}/>
                    )
                }
            </div>
        )
    }
}

export default Padre;