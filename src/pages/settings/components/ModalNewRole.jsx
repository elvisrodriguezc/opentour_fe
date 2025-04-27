import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { postRoles } from "../../../reducer/slices/rolesSlice";
import Swal from "sweetalert2";

function ModalNewRole() {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const { loading } = useSelector(store => store.headquarters)

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
            name: "",
            description: "",
        });
        setModalShow(true);
    }

    const [validated, setValidated] = useState(false);

    const onSubmit = (data) => {
        dispatch(postRoles(data))
            .then(() => {
                setModalShow(false);
                setValidated(false);
                Swal.fire({
                    title: '¡Hecho!',
                    text: 'El Rol ha sido creado.',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                })
            })
            .catch(() => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo crear el Rol',
                    icon: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                })
            })
    };

    return (
        <div>
            <Button variant="primary" onClick={handleModal} className="me-2">
                <i className="fa fa-circle-plus fa-xl"></i> Nuevo Rol
            </Button>
            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Form onSubmit={handleSubmit(onSubmit)} noValidate validated={validated} autoComplete="off">
                    <Modal.Header>
                        <Modal.Title>Nuevo Rol</Modal.Title>
                        <div className="m-2">
                            {loading === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Denominación</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Denominación"
                                    autoFocus={true}
                                    required
                                    {...register('name', { required: "Ingrese un valor para el Nuevo Rol." })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Descripción"
                                    required
                                    {...register('description', { required: "Ingrese un valor para la Descripción del Rol" })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
                        <Button type="submit" variant="primary" onClick={() => setValidated(true)}>Guardar Cambios</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalNewRole;