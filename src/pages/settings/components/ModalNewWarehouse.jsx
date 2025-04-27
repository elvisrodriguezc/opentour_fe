import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { postWarehouses } from "../../../reducer/slices/headquartersSlice";

function ModaNewWarehouse({ headquarterId }) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const { loading } = useSelector(store => store.headquarters)

    const handleModal = () => {
        reset({
            headquarter_id: headquarterId,
            warehouse_id: null,
            name: "",
            description: "",
            mode: ""
        });
        setModalShow(true);
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
        }
    })

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(postWarehouses(data))
    };

    return (
        <div>
            <Button variant="dark" onClick={handleModal} className="me-2">
                <i className="fas fa-circle-plus fa-xl"></i> Nuevo Almacén
            </Button>
            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Nuevo Almacén</Modal.Title>
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
                            <div className="form-group mb-4">
                                <label className="form-label">Descripción</label>
                                <input
                                    className="form-control"
                                    placeholder="Descripción"
                                    autoComplete="off"
                                    maxLength={100}
                                    {...register('description')}
                                />
                            </div>
                            <div className="form-group mb-4 row">
                                <div className="col-6">
                                    <label className="form-label">Atributos</label>
                                    <input
                                        className="form-control"
                                        placeholder="Ej. 'P':Producción"
                                        autoComplete="off"
                                        maxLength={10}
                                        {...register('mode')}
                                    />
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

export default ModaNewWarehouse;