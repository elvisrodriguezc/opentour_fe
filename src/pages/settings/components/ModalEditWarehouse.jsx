import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { putWarehouses, deleteWarehouses } from "../../../reducer/slices/headquartersSlice";

function ModaEditWarehouse({ data }) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const { loading } = useSelector(store => store.headquarters)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
        }
    })

    const handleModal = () => {
        reset({
            id: data.id,
            headquarter_id: data.headquarter_id,
            warehouse_id: data.warehouse_id,
            name: data.name,
            description: data.description,
            mode: data.mode,
            status: data.status,
        });
        setModalShow(true);
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteWarehouses(data.id))
            }
        })
    }

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(putWarehouses(data))
    };

    return (
        <div>
            <Button variant="dark" onClick={handleModal} className="btn-xs me-2">
                <i className="fa fa-edit fa-lg"></i>
            </Button>
            <Button variant="danger" onClick={handleDelete} className="btn-xs me-2">
                <i className="fa fa-times fa-lg"></i>
            </Button>

            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Editar Almacén</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-group mb-4">
                                <label className="form-label">Nombre</label>
                                <input
                                    className="form-control"
                                    placeholder="Denominación"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...register('name', { required: "Ingrese un valor para Nombre." })}
                                />
                                <p className='mt-2 text-warning'>{errors.name?.message}</p>

                            </div>
                            <div className="form-group">
                                <label className="form-label">Descripción</label>
                                <input
                                    className="form-control"
                                    placeholder="Descripción"
                                    autoComplete="off"
                                    maxLength={100}
                                    {...register('description')}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Modo</label>
                                        <select
                                            className="form-select"
                                            {...register('mode')}
                                        >
                                            <option value={""}>Elija...</option>
                                            <option value="P">Producción</option>
                                            <option value="V">Venta Directa</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Estado</label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                {...register('status')}
                                                defaultChecked={data.status === 1}
                                            />
                                            <label className="form-check-label">
                                                Activo
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
                        <Button type="submit" variant="primary">Guardar Cambios</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}

export default ModaEditWarehouse;