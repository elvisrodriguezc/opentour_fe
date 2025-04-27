import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { putTypes, deleteTypes } from "../../../reducer/slices/typesSlice";
import Swal from "sweetalert2";

function ModaEditType({ data }) {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector(store => store.types.loading)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
        }
    })

    const handleModal = () => {
        reset({
            id: data.id,
            name: data.name,
            description: data.description
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
                dispatch(deleteTypes(data.id))
            }
        })
    }

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(putTypes(data))
    };

    return (
        <div>
            <Button variant="primary" onClick={handleModal} className="me-2 btn-sm">
                <i className="fa fa-edit fa-lg"></i>
            </Button>
            <Button variant="danger" onClick={handleDelete} className="me-2 btn-sm">
                <i className="fa fa-times fa-lg"></i>
            </Button>
            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Editar Tipo de Dato</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-group mb-4">
                                <label className="form-label">Tipo de Datos</label>
                                <input
                                    className="form-control"
                                    placeholder="Denominación"
                                    autoComplete="off"
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
                                    {...register('description', { required: "Ingrese un valor para Descripción." })}
                                />
                                <p className='mt-2 text-warning'>{errors.description?.message}</p>
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

export default ModaEditType;