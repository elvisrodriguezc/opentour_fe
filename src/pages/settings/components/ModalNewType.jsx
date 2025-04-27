import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postTypes } from "../../../reducer/slices/typesSlice";

function ModaNewType() {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const loading = useSelector(store => store.types.loading)

    const handleModal = () => {
        reset({
            name: "",
            description: ""
        });
        setModalShow(true);
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: 'Elvis',
            description: 'Varias cositas'
        }
    })

    const onSubmit = data => {
        setModalShow(false);
        dispatch(postTypes(data))
    };

    return (
        <div>

            <Button variant="primary" onClick={handleModal} className="me-2">
                <i className="fas fa-circle-plus fa-xl"></i> Nuevo Tipo de Dato
            </Button>
            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Nuevo Tipo de Dato</Modal.Title>
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

export default ModaNewType;