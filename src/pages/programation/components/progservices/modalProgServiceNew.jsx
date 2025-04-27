import { use, useEffect, useState } from "react";
import { Button, Col, FormControl, FormGroup, FormLabel, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from 'react-hook-form';
import Select from "react-select";
import 'quill/dist/quill.snow.css';

import { fetchTypevalues, typevaluesSelector } from "../../../../reducer/slices/typesvaluesSlice";
import { fetchWorkShift, workshiftsSelector } from "../../../../reducer/slices/workshiftsSlice";
import { fetchVehicles, vehiclesSelector } from "../../../../reducer/slices/vehiclesSlice";
import { fetchUsers, usersSelector } from "../../../../reducer/slices/usersSlice";
import { newProgService } from "../../../../reducer/slices/programationsSlice";


function ModalProgServiceNew({ id }) {
    const dispatch = useDispatch();

    const allServiceTypes = useSelector(typevaluesSelector.selectEntities)
    const { loading: loadingServiceTypes } = useSelector(state => state.typevalues);

    useEffect(() => {
        if (loadingServiceTypes === 'empty') {
            dispatch(fetchTypevalues('Calidad'))
        }
    }, [dispatch, loadingServiceTypes])

    const allWorkshifts = useSelector(workshiftsSelector.selectEntities)
    const { loading: loadingWorkshifts } = useSelector(state => state.workshifts);

    useEffect(() => {
        if (loadingWorkshifts === 'empty') {
            dispatch(fetchWorkShift('Calidad'))
        }
    }, [dispatch, loadingWorkshifts])

    const [workshiftSelected, setWorkshiftSelected] = useState(null)
    const [vehiclesOptions, setVehiclesOptions] = useState([])
    const [vehicleSelected, setVehicleSelected] = useState(null)

    const allVehicles = useSelector(vehiclesSelector.selectEntities)
    const { loading: loadingVehicles } = useSelector(state => state.vehicles);

    useEffect(() => {
        if (loadingVehicles === 'empty') {
            dispatch(fetchVehicles())
        }
    }, [dispatch, loadingVehicles])
    useEffect(() => {
        setVehiclesOptions(Object.values(allVehicles).filter((vehicle) => vehicle.company === workshiftSelected?.company))
        setVehicleSelected(null)
    }, [workshiftSelected, allVehicles])

    const allUsers = useSelector(usersSelector.selectEntities)
    const { loading: loadingUsers } = useSelector(state => state.users);

    useEffect(() => {
        if (loadingUsers === 'empty') {
            dispatch(fetchUsers())
        }
    }, [dispatch, loadingUsers])

    const [driverOptions, setDriverOptions] = useState([])
    const [guideOptions, setGuideOptions] = useState([])
    const [supervisorOptions, setSupervisorOptions] = useState([])

    useEffect(() => {
        setDriverOptions(Object.values(allUsers).filter((user) => user.role === 'conductor'))
        setGuideOptions(Object.values(allUsers).filter((user) => user.role === 'guia'))
        setSupervisorOptions(Object.values(allUsers).filter((user) => user.role === 'supervisor'))
    }, [allUsers])

    const darkThemeStyles = {
        input: (provided) => ({
            ...provided,
            color: '#eee', // Color de texto del input (cuando escribes o el valor seleccionado)
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#eee', // Color del texto del valor seleccionado
        }),
        // Puedes añadir estilos para otros componentes como multiValue, valueContainer, indicatorsContainer, etc.
    };

    const [modalShow, setModalShow] = useState(false);
    const handleModal = () => {
        reset({
            "time": new Date().toISOString().split("T")[1],
            "note": "",
            "status": 1,
            "programation_id": id,
        })
        setModalShow(true);
        setVehicleSelected(null)
        setWorkshiftSelected(null)
    }
    const {
        handleSubmit,
        reset,
        register,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "status": 1
        }
    })

    const onSubmit = data => {
        console.log(data)
        dispatch(newProgService(data))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    setModalShow(false)
                } else {
                    console.log(res.error.message)
                }
            })
    }
    return (
        <div>
            <Button variant="primary" size="lg" onClick={handleModal} className="me-2">
                <i className="fas fa-bus fa-lg"></i> Servicio Nuevo
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
                            {/* {loading === "saving"
                                ? <Spinner
                                    animation="border"
                                    variant="warning"
                                />
                                : ""} */}
                        </Modal.Title>
                        <div className="m-2">
                            {1 === "pendig" ? <Spinner animation="border" variant="warning" /> : ""}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                <FormLabel htmlFor="servicetype_id">Tipo Servicio</FormLabel>
                                <Controller
                                    control={control}
                                    name='servicetype_id'
                                    rules={{ required: "Seleccione el Servicio" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        const options = Object.values(allServiceTypes);
                                        const selectedOption = options.find(option => option.value === value);
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Servicio..."
                                                options={options}
                                                value={selectedOption}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        );
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.servicetype_id?.message}</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormLabel className="fw-bold">Hora de Partida</FormLabel>
                                <FormControl
                                    type="time"
                                    className="mb-3"
                                    placeholder="Hora de salida..."
                                    {...register("start_time", { required: "Este campo es requerido" })}
                                    isInvalid={errors.start_time}
                                />
                                {errors.start_time && <span className="text-danger">{errors.start_time.message}</span>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} lg={4}>
                                <FormLabel htmlFor="workshift_id">Turno</FormLabel>
                                <Controller
                                    control={control}
                                    name='workshift_id'
                                    rules={{ required: "Seleccione el Turno" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        const options = Object.values(allWorkshifts);
                                        const selectedOption = options.find(option => option.value === value);
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Turno..."
                                                options={options}
                                                value={selectedOption}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                    setWorkshiftSelected(val);
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        );
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.workshift_id?.message}</p>
                            </Col>
                            <Col xs={6} lg={4}>
                                <FormLabel htmlFor="vehicle_id">Vehículo</FormLabel>
                                <Controller
                                    control={control}
                                    name='vehicle_id'
                                    rules={{ required: "Seleccione el Vehículo" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Vehículo..."
                                                options={vehiclesOptions}
                                                value={vehicleSelected}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                    setVehicleSelected(val);
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        )
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.vehicle_id?.message}</p>
                            </Col>
                            <Col xs={6} lg={4}>
                                <FormGroup>
                                    <FormLabel htmlFor="seating_capacity">Capacidad</FormLabel>
                                    <FormControl
                                        type="number"
                                        className="mb-3"
                                        placeholder="Capacidad del vehículo..."
                                        defaultValue={vehicleSelected?.seating_capacity || ""}
                                        {...register("seating_capacity", { required: "Este campo es requerido" })}
                                        isInvalid={!!errors.seating_capacity}
                                    />
                                    {errors.seating_capacity && <span className="text-danger">{errors.seating_capacity.message}</span>}
                                </FormGroup>
                            </Col>
                            <Col xs={6} lg={4}>
                                <FormLabel htmlFor="driver_id">Conductor</FormLabel>
                                <Controller
                                    control={control}
                                    name='driver_id'
                                    rules={{ required: "Seleccione el Conductor" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        const selectedOption = driverOptions.find(option => option.value === value);
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Conductor..."
                                                options={driverOptions}
                                                value={selectedOption}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        );
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.driver_id?.message}</p>
                            </Col>
                            <Col xs={6} lg={4}>
                                <FormLabel htmlFor="guide_id">Guia</FormLabel>
                                <Controller
                                    control={control}
                                    name='guide_id'
                                    rules={{ required: "Seleccione el Guía" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        const selectedOption = guideOptions.find(option => option.value === value);
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Guía..."
                                                options={guideOptions}
                                                value={selectedOption}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        );
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.guide_id?.message}</p>
                            </Col>
                            <Col xs={6} lg={4}>
                                <FormLabel htmlFor="supervisor_id">Supervisor</FormLabel>
                                <Controller
                                    control={control}
                                    name='supervisor_id'
                                    rules={{ required: "Seleccione el Conductor" }}
                                    render={({ field: { onChange, value, ref } }) => {
                                        const selectedOption = supervisorOptions.find(option => option.value === value);
                                        return (
                                            <Select
                                                classNamePrefix="react-select"
                                                placeholder="Elija el Supervisor..."
                                                options={supervisorOptions}
                                                value={selectedOption}
                                                onChange={(val) => {
                                                    onChange(val ? val.value : '');
                                                }}
                                                ref={ref}
                                                isLoading={loadingServiceTypes === 'pending'}
                                                styles={darkThemeStyles}
                                            />
                                        );
                                    }}
                                />
                                <p className='mt-2 text-warning'>{errors.supervisor_id?.message}</p>
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

export default ModalProgServiceNew;