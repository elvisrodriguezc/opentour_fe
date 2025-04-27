import { use, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Controller, set, useForm } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { postHeadquarters } from "../../../reducer/slices/headquartersSlice";
import { fetchDepartments, departmentsSelector } from "../../../reducer/slices/departmentsSlice";
import { fetchProvinces, provincesSelector } from "../../../reducer/slices/provincesSlice";
import { fetchDistricts, districtsSelector } from "../../../reducer/slices/districtsSlice";

function ModalNewHeadquarters({ }) {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const { loading: loadingHq } = useSelector(store => store.headquarters)

    const allDepartments = useSelector(departmentsSelector.selectEntities);
    const { loading: loadingDepartments } = useSelector(store => store.departments)
    const allProvinces = useSelector(provincesSelector.selectEntities);
    const { loading: loadingProvinces } = useSelector(store => store.provinces)
    const allDistricts = useSelector(districtsSelector.selectEntities);
    const { loading: loadingDistricts } = useSelector(store => store.districts)

    const [departments, setDepartments] = useState([])
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])

    const [departmentSelected, setDepartmentSelected] = useState(null)
    const [provinceSelected, setProvinceSelected] = useState(null)
    const [districtSelected, setDistrictSelected] = useState(null)

    useEffect(() => {
        if (loadingDepartments === "empty") {
            dispatch(fetchDepartments())
        }
    }, [dispatch, loadingDepartments])

    useEffect(() => {
        setDepartments(Object.values(allDepartments))
    }, [allDepartments])

    useEffect(() => {
        setProvinceSelected(null)
        setDistrictSelected(null)
        if (departmentSelected) {
            dispatch(fetchProvinces(departmentSelected))
        }
    }, [departmentSelected])

    useEffect(() => {
        setProvinces(Object.values(allProvinces))
        setDistricts([])
    }, [allProvinces])

    useEffect(() => {
        console.log(provinceSelected)
        setDistrictSelected(null)
        if (provinceSelected) {
            dispatch(fetchDistricts(provinceSelected))
        }
    }, [provinceSelected])

    useEffect(() => {
        setDistricts(Object.values(allDistricts))
    }, [allDistricts])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control
    } = useForm({
        defaultValues: {}
    })

    const handleModal = () => {
        reset({
            name: "",
            address: "",
            ubigeodistrito_id: "",
            phone: "",
            email: "",
            latitude: "",
            longitude: "",
            status: ""
        });
        setModalShow(true);
    }

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(postHeadquarters(data))
    };

    return (
        <div>
            <Button variant="primary" onClick={handleModal} className="me-2">
                <i className="fa fa-circle-plus fa-xl"></i> Nueva Sucursal
            </Button>
            {loadingHq === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Nueva Sucursal</Modal.Title>
                        <div className="m-2">
                            {(loadingHq === "pendig" || loadingDepartments === "pendig" || loadingProvinces === "pendig" || loadingDistricts === 'pendig') ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-group mb-4">
                                <label className="form-label">Denominación</label>
                                <input
                                    className="form-control"
                                    placeholder="Denominación"
                                    autoComplete="off"
                                    {...register('name', { required: "Ingrese un valor para Nombre." })}
                                />
                                <p className='mt-2 text-warning'>{errors.name?.message}</p>

                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">Departamento</label>
                                        <Select
                                            classNamePrefix="react-select"
                                            placeholder={"Elija..."}
                                            options={departments}
                                            onChange={(e) => setDepartmentSelected(e.id)}
                                        />
                                        <p className='mt-2 text-warning'>{errors.department?.message}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">Provincia</label>
                                        <Select
                                            classNamePrefix="react-select"
                                            placeholder={"Elija..."}
                                            options={provinces}
                                            onChange={(e) => setProvinceSelected(e.id)}
                                        />
                                        <p className='mt-2 text-warning'>{errors.province?.message}</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">Distrito</label>
                                        <Controller
                                            control={control}
                                            name="ubigeodistrito_id"
                                            rules={{
                                                required: "Seleccione un distrito."
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    classNamePrefix="react-select"
                                                    placeholder={"Elija..."}
                                                    options={districts}
                                                    value={districts.find((d) => d.value === (value))}
                                                    onChange={(val) => onChange(val.value)}
                                                />
                                            )}
                                        />
                                        <p className='mt-2 text-warning'>{errors.district?.message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Dirección</label>
                                <input
                                    className="form-control"
                                    placeholder="Dirección"
                                    autoComplete="off"
                                    {...register('address', { required: "Ingrese un valor para la Dirección." })}
                                />
                                <p className='mt-2 text-warning'>{errors.address?.message}</p>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Teléfono</label>
                                        <input
                                            className="form-control"
                                            placeholder="Teléfono"
                                            autoComplete="off"
                                            {...register(
                                                'phone',
                                                // { required: "Ingrese un valor para Teléfono." }
                                            )}
                                        />
                                        <p className='mt-2 text-warning'>{errors.phone?.message}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Correo Electrónico</label>
                                        <input
                                            className="form-control"
                                            placeholder="Correo Electrónico"
                                            autoComplete="off"
                                            {...register(
                                                'email',
                                                // { required: "Ingrese un valor para Correo Electrónico." }
                                            )}
                                        />
                                        <p className='mt-2 text-warning'>{errors.email?.message}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Latitud</label>
                                        <input
                                            className="form-control"
                                            placeholder="Latitud"
                                            autoComplete="off"
                                            {...register(
                                                'latitude',
                                                // { required: "Ingrese un valor para Latitud." }
                                            )}
                                        />
                                        <p className='mt-2 text-warning'>{errors.latitude?.message}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label className="form-label">Longitud</label>
                                        <input
                                            className="form-control"
                                            placeholder="Longitud"
                                            autoComplete="off"
                                            {...register(
                                                'longitude',
                                                // { required: "Ingrese un valor para Longitud." }
                                            )}
                                        />
                                        <p className='mt-2 text-warning'>{errors.longitude?.message}</p>
                                    </div>
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

export default ModalNewHeadquarters;