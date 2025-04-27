import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postTypevalues } from "../../../reducer/slices/typesSlice";

function ModaNewTypeValue({ typeId }) {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const { loading } = useSelector(store => store.types)

    const handleModal = () => {
        reset({
            type_id: typeId,
            name: "",
            description: "",
            value: "",
            abbreviation: "",
        });
        setModalShow(true);
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            typeId: typeId,
            name: 'Elvis',
            description: 'Varias cositas'
        }
    })

    const onSubmit = data => {
        setModalShow(false);
        dispatch(postTypevalues(data))
    };

    return (
        <div>
            <Button variant="dark" onClick={handleModal} className="me-2">
                <i className="fas fa-circle-plus fa-xl"></i> Nuevo Valor de Tipo
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

export default ModaNewTypeValue;