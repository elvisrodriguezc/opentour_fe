import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putTypevalues, deleteTypevalues } from "../../../reducer/slices/typesSlice";
import Swal from "sweetalert2";

function ModaEditTypeValue({ data }) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const { loading } = useSelector(store => store.types)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
        }
    })

    const handleModal = () => {
        reset({
            type_id: data.id,
            name: data.name,
            description: data.description,
            value: data.value_data,
            abbreviation: data.abbreviation,
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
                dispatch(deleteTypevalues(data.id))
            }
        })
    }

    const onSubmit = data => {
        setModalShow(false);
        dispatch(putTypevalues(data))
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
                        <Modal.Title>Nuevo Valor de Tipo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-group mb-4">
                                <label className="form-label">Valor del Tipo de Datos</label>
                                <input
                                    className="form-control"
                                    placeholder="Denominación"
                                    autoComplete="off"
                                    maxLength={50}
                                    {...register('name', { required: "Ingrese un valor para Nombre." })}
                                />
                                <p className='mt-2 text-warning'>{errors.name?.message}</p>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Abreviación</label>
                                        <input
                                            className="form-control"
                                            placeholder="Abreviación"
                                            autoComplete="off"
                                            maxLength={10}
                                            {...register('abbreviation', { required: "Ingrese un valor para Abreviación." })}
                                        />
                                        <p className='mt-2 text-warning'>{errors.description?.message}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Valor</label>
                                        <input
                                            className="form-control"
                                            placeholder="Valor en número"
                                            autoComplete="off"
                                            step={0.01}
                                            type="number"
                                            {...register('value')}
                                        />
                                    </div>
                                </div>
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

export default ModaEditTypeValue;