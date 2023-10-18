import React, { useEffect } from "react";
import styles from "./Home.module.css"
import { InputText } from "../../components/InputText/InputText";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { ObtenerNombre } from "./ObtenerNombre/ObtenerNombre";

const Home = () => {
    const [tareaList, setTareaList] = useState([]);
    const [errors, setErrors] = useState("");
    const [formValues, setFormValues] = useState({
        nombre: undefined,
        descripcion: undefined,
        fecha: undefined,
        prioridad: undefined
    })
    const [formUpdate, setFormUpdate] = useState({
        id: undefined,
        nombre: undefined,
        descripcion: undefined,
        fecha: undefined,
        prioridad: undefined
    })

    const fetchTareas = async () => {
        const response = await fetch('http://localhost:3800/tarea/leer')
        const responseJson = await response.json();

        console.log("responseJson =============>", responseJson)
        setTareaList(responseJson.data)
    }

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormValues((current) => ({
            ...current,
            [id]: value,
        }));
    }
    const handleChangeUpdate = (e) => {
        const { id, value } = e.target;

        setFormUpdate((current) => ({
            ...current,
            [id]: value,
        }));
    }




    const handleSave = async (e) => {
        e.preventDefault()
        console.log(formValues)
        const body = formValues;

        const response = await fetch('http://localhost:3800/tarea/crear', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const responseJson = await response.json();

        if (responseJson.ok === false) {
            setErrors(responseJson.errors)
        } else {
            location.reload();
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault
        console.log(formUpdate);
        const tareaId = formUpdate.id;
        const body = formUpdate;

        const response = await fetch(`http://localhost:3800/tarea/actualizar/${tareaId}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const responseJson = await response.json();

        if (responseJson.ok === false) {
            setErrors(responseJson.errors)
        } else {
            location.reload();
        }
    }

    const handleDelete = async (tareaId) => {

        const response = await fetch(`http://localhost:3800/tarea/eliminar/${tareaId}`, {
            method: 'DELETE',
        })

        const responseJson = await response.json();

        if (responseJson.ok === false) {
            setErrors(responseJson.errors)
        } else {
            location.reload();
        }
    }

    const selectTarea = (tarea) => {
        setFormUpdate({
            id: tarea.id,
            nombre: tarea.nombre,
            descripcion: tarea.descripcion,
            fecha: tarea.fecha,
            prioridad: tarea.prioridad,
        })
    }

    useEffect(() => {
        fetchTareas();
    }, [])

    return (
        <div className={styles.Home}>

            <div>
                <h1>Bienvenido</h1>
                <ObtenerNombre />
            </div>

            <br />

            <h1>Lista de Tareas</h1>

            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#saveModal" data-bs-whatever="@mdo">Agregar nuevo</button>

            <div className="modal fade" id="saveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nueva Tarea</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Nombre:</label>
                                    <input type="text" className="form-control" id="nombre" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Descripcion:</label>
                                    <textarea className="form-control" id="descripcion" onChange={handleChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Fecha:</label>
                                    <input type="date" className="form-control" id="fecha" onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label">Prioridad:</label>
                                    <input type="number" className="form-control" id="prioridad" onChange={handleChange} required />
                                </div>
                            </div>
                            {errors !== "" && <p>{errors}</p>}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {tareaList.map((tarea, index) => (
                        <tr key={tarea.id}>
                            <th scope="row">{index}</th>
                            <td>{tarea.nombre}</td>
                            <td>{tarea.descripcion}</td>
                            <td>{tarea.fecha}</td>
                            <td>{tarea.prioridad}</td>
                            <td>
                                <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#updateModal" data-bs-whatever="@mdo" onClick={() => selectTarea(tarea)}>Editar</button>

                                <div className="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Tarea</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <form onSubmit={handleUpdate}>
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                        <label for="recipient-name" className="col-form-label">Nombre:</label>
                                                        <input type="text" className="form-control" id="nombre" onChange={handleChangeUpdate} defaultValue={tarea.nombre} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="message-text" className="col-form-label">Descripcion:</label>
                                                        <textarea className="form-control" id="descripcion" onChange={handleChangeUpdate} defaultValue={tarea.descripcion} required></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="message-text" className="col-form-label">Fecha:</label>
                                                        <input type="date" className="form-control" id="fecha" onChange={handleChangeUpdate} defaultValue={tarea.fecha} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="message-text" className="col-form-label">Prioridad:</label>
                                                        <input type="number" className="form-control" id="prioridad" onChange={handleChangeUpdate} defaultValue={tarea.prioridad} required />
                                                    </div>
                                                </div>
                                                {errors !== "" && <p>{errors}</p>}
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Eliminar
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar tarea: {tarea.nombre}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                Haga click en el boton aceptar para eliminar la tarea permanentemente.
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(tarea.id)}>Aceptar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;