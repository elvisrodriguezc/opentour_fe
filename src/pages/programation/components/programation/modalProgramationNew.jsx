import { useEffect, useState } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import 'quill/dist/quill.snow.css';

import { newProgramation } from "../../../../reducer/slices/programationsSlice";
import { useForm } from "react-hook-form";


function ModalProgramationNew() {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);

    const { loading } = useSelector(state => state.programations);

    const handleModal = () => {
        reset({
            "date": new Date().toISOString().split("T")[0],
            "note": "",
            "status": 1,
        })
        setModalShow(true);
    }

    const [contactSelected, setContactSelected] = useState({});

    const [orderItems, setOrderItems] = useState([])

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "status": 1
        }
    })

    const onSubmit = data => {
        console.log(data)
        dispatch(newProgramation(data))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    reset({
                        "date": new Date().toISOString().split("T")[0],
                        "note": "",
                    })
                    setModalShow(false)
                } else {
                    console.log(res.error.message)
                }
            })
    }
    return (
        <div>
            <Button variant="primary" size="lg" onClick={handleModal} className="me-2">
                <i className="fas fa-chess-knight fa-lg"></i> Programación Nueva
            </Button>

            <Modal
                size="lg"
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>
                            Programación
                            {loading === "saving"
                                ? <Spinner
                                    animation="border"
                                    variant="warning"
                                />
                                : ""}
                        </Modal.Title>
                        <div className="m-2">
                            {1 === "pendig" ? <Spinner animation="border" variant="warning" /> : ""}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col>
                                <FormLabel className="fw-bold">Fecha</FormLabel>
                                <FormControl
                                    type="date"
                                    className="mb-3"
                                    placeholder="Escriba una fecha aquí..."
                                    {...register("date", { required: "Este campo es requerido" })}
                                    isInvalid={!!errors.date}
                                />
                                {errors.date && <span className="text-danger">{errors.date.message}</span>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormLabel className="fw-bold">Nota</FormLabel>
                                <FormControl
                                    as="textarea"
                                    rows={3}
                                    className="mb-3"
                                    placeholder="Escriba una nota aquí..."
                                    {...register("note", {
                                        minLength: { value: 5, message: "La nota debe tener al menos 5 caracteres" },
                                        maxLength: { value: 250, message: "La nota no debe exceder 250 caracteres" }
                                    })}
                                    isInvalid={!!errors.note}
                                />
                                {errors.note && <span className="text-danger">{errors.note.message}</span>}
                            </Col>
                        </Row>
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

export default ModalProgramationNew;