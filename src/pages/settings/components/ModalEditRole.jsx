import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoles, putRoles } from "../../../reducer/slices/rolesSlice";

function ModalEditRoles({ data }) {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch()

    const { loading } = useSelector(store => store.roles)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {}
    })

    const handleModal = () => {
        reset({
            id: data.id,
            name: data.name,
            description: data.description,
            status: data.status
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
                dispatch(deleteRoles(data.id))
            }
        })
    }

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(putRoles(data))
    };

    return (
        <div>
            <Button variant="primary" onClick={handleModal} className="me-2 btn-sm">
                <i className="fa fa-edit fa-lg"></i>
            </Button>
            <Button variant="danger" onClick={handleDelete} className="me-2 btn-sm">
                <i className="fa fa-times fa-lg"></i>
            </Button>
            {loading === "pendig" ? <Spinner variant="warning" type="border" /> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Editar Rol de Usuarios </Modal.Title>
                        {loading === "pendig" &&
                            <div className="m-2">
                                <i className="fas fa-spinner fa-pulse fa-xl text-primary"></i>
                            </div>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-group mb-4">
                                <label className="form-label">Denominación</label>
                                <input
                                    className="form-control"
                                    placeholder="Denominación"
                                    autoComplete="off"
                                    autoFocus={true}
                                    {...register('name', { required: "Ingrese un valor para Nombre." })}
                                />
                                <p className='mt-2 text-warning'>{errors.name?.message}</p>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label">Descripción</label>
                                <input
                                    className="form-control"
                                    placeholder="Descripción"
                                    autoComplete="off"
                                    {...register('description', { required: "Ingrese un valor para la Descripción del Rol" })}
                                />
                                <p className='mt-2 text-warning'>{errors.description?.message}</p>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Estado</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        {...register('status')}
                                        defaultChecked={data.status === "1"}
                                    />
                                    <label className="form-check-label">
                                        Activo
                                    </label>
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

export default ModalEditRoles;