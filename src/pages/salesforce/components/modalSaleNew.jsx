import { useEffect, useState } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import 'quill/dist/quill.snow.css';

import { useForm } from "react-hook-form";

function ModalSaleNew() {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);

    const { loading } = useSelector(state => state.programations);

    const handleModal = () => {
        reset({
            "date": new Date().toISOString().split("T")[0],
            "note": "",
            "quantity": 1,
            "price": 15,
            "discount": 0,
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
    }
    return (
        <div>
            <Button variant="primary" size="lg" onClick={handleModal} className="me-2">
                <i className="fas fa-chess-knight fa-lg"></i> Venta Nueva
            </Button>
            <Modal
                size="lg"
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title className="d-flex justify-content-between align-items-center">
                            <h3 className="text-warning">Nuevo Boleto de Viaje </h3>
                            {loading !== "saing"
                                ? <Spinner
                                    animation="grow"
                                    role="status"
                                    size="md"
                                    variant="warning"
                                />
                                : ""}
                        </Modal.Title>
                        <div className="m-2">
                            {1 === "pendig" ? <Spinner animation="border" variant="warning" /> : ""}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                Bus Naranja
                                <h4 className="mb-0">XDF-121</h4>
                            </div>
                            <div>
                                Guía de Viaje
                                <h5>Jair Sanchez</h5>
                            </div>
                            <h1 className="fw-bolder me-1">  5 / 25</h1>
                        </div>
                        <div className="card border-0 mb-1">
                            <div className="card-header">
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold text-success">Promotor</FormLabel>
                                        <FormControl
                                            as="select"
                                            {...register("promoter", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.promoter}
                                        >
                                            <option value="" disabled>Seleccione un promotor</option>
                                            <option value="1">Promotor 1</option>
                                            <option value="2">Promotor 2</option>
                                            <option value="3">Promotor 3</option>
                                            <option value="4">Promotor 4</option>
                                        </FormControl>
                                        {errors.promoter && <span className="text-danger">{errors.promoter.message}</span>}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="card border-0 mb-1">
                            <div className="card-body">
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold">Fecha</FormLabel>
                                        <FormControl
                                            type="date"
                                            placeholder="Escriba una fecha aquí..."
                                            {...register("date", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.date}
                                        />
                                        {errors.date && <span className="text-danger">{errors.date.message}</span>}
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold text-success ">Horario</FormLabel>
                                        <FormGroup>
                                            <FormControl
                                                as="select"
                                                {...register("time", { required: "Este campo es requerido" })}
                                                isInvalid={!!errors.status}
                                            >
                                                <option value="" disabled>Seleccione horario</option>
                                                <option value="09:45">09:45 AM</option>
                                                <option value="10:40">10:40 PM</option>
                                                <option value="12:45">12:45 PM</option>
                                                <option value="14:00">14:00 PM</option>
                                                <option value="15:30">15:30 PM</option>
                                            </FormControl>
                                            {errors.status && <span className="text-danger">{errors.status.message}</span>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="card border-0 mb-1">
                            <div className="card-header">
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold text-success">Cantidad</FormLabel>
                                        <FormControl
                                            type="number"
                                            style={{ textAlign: "center" }}
                                            placeholder="Escriba una cantidad aquí..."
                                            {...register("quantity", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.quantity}
                                        />
                                        {errors.quantity && <span className="text-danger">{errors.quantity.message}</span>}
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold text-success">Precio</FormLabel>
                                        <FormControl
                                            type="number"
                                            //centered
                                            style={{ textAlign: "center" }}
                                            className="mb-3"
                                            placeholder="Escriba un precio aquí..."
                                            {...register("price", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.price}
                                        />
                                        {errors.price && <span className="text-danger">{errors.price.message}</span>}
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold text-success">Descuento</FormLabel>
                                        <FormControl
                                            type="number"
                                            style={{ textAlign: "center" }}
                                            placeholder="Escriba un descuento aquí..."
                                            {...register("discount", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.discount}
                                        />
                                        {errors.discount && <span className="text-danger">{errors.discount.message}</span>}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* cliente */}
                        <div className="card border-0 mb-1">
                            <div className="card-body">
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold text-success">Cliente</FormLabel>
                                        <FormControl
                                            type="text"
                                            className="mb-3"
                                            placeholder="Escriba un cliente aquí..."
                                            {...register("client", { required: "Este campo es requerido" })}
                                            isInvalid={!!errors.client}
                                        />
                                        {errors.client && <span className="text-danger">{errors.client.message}</span>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold">País</FormLabel>
                                        <FormGroup className="mb-3">
                                            <FormControl
                                                as="select"
                                                {...register("country", { required: "Este campo es requerido" })}
                                                isInvalid={!!errors.country}
                                            >
                                                <option value="" disabled>Seleccione un país</option>
                                                <option value="PE">Perú</option>
                                                <option value="CO">Colombia</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="CL">Chile</option>
                                            </FormControl>
                                            {errors.country && <span className="text-danger">{errors.country.message}</span>}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold">Tipo Documento</FormLabel>
                                        <FormGroup className="mb-3">
                                            <FormControl
                                                as="select"
                                                {...register("documentType", { required: "Este campo es requerido" })}
                                                isInvalid={!!errors.documentType}
                                            >
                                                <option value="" disabled>Seleccione un tipo de documento</option>
                                                <option value="DNI">DNI</option>
                                                <option value="RUC">RUC</option>
                                                <option value="CE">CE</option>
                                                <option value="PASAPORTE">PASAPORTE</option>
                                            </FormControl>
                                            {errors.documentType && <span className="text-danger">{errors.documentType.message}</span>}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold">Nro Documento</FormLabel>
                                        <FormControl
                                            type="text"
                                            className="mb-3"
                                            placeholder="Escriba un número de documento aquí..."
                                            {...register("document", {
                                                minLength: { value: 8, message: "El número de documento debe tener al menos 8 caracteres" },
                                            })}
                                            isInvalid={!!errors.document}
                                        />
                                        {errors.document && <span className="text-danger">{errors.document.message}</span>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormLabel className="fw-bold">Teléfono</FormLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Escriba un teléfono aquí..."
                                            {...register("phone", {
                                                minLength: { value: 7, message: "El teléfono debe tener al menos 7 caracteres" },
                                            })}
                                            isInvalid={!!errors.phone}
                                        />
                                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                                    </Col>
                                    <Col>
                                        <FormLabel className="fw-bold">Email</FormLabel>
                                        <FormControl
                                            type="email"
                                            placeholder="Escriba un email aquí..."
                                            {...register("email", {
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "Ingrese un email válido"
                                                }
                                            })}
                                            isInvalid={!!errors.email}
                                        />
                                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-footer">
                                <Row >
                                    <Col>
                                        <FormLabel className="fw-bold">Nota</FormLabel>
                                        <FormControl
                                            as="textarea"
                                            rows={3}
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

export default ModalSaleNew;