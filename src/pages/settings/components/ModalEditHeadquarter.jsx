import { use, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Controller, set, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { putHeadquarters, deleteHeadquarters } from "../../../reducer/slices/headquartersSlice";
import { fetchDepartments, departmentsSelector } from "../../../reducer/slices/departmentsSlice";
import { fetchProvinces, provincesSelector } from "../../../reducer/slices/provincesSlice";
import { fetchDistricts, districtsSelector } from "../../../reducer/slices/districtsSlice";

function ModalEditHeadquarters({ data }) {
    const [modalShow, setModalShow] = useState(false);

    const dispatch = useDispatch();

    const { loading: loadingHq } = useSelector(store => store.headquarters)

    const allDepartments = useSelector(departmentsSelector.selectEntities);
    const { loading: loadingDepartments } = useSelector(store => store.departments)
    const allProvinces = useSelector(provincesSelector.selectEntities);
    const { loading: loadingProvinces } = useSelector(store => store.provinces)
    const allDistricts = useSelector(districtsSelector.selectEntities);
    const { loading: loadingDistricts } = useSelector(store => store.districts)

    useEffect(() => {
        if (loadingDepartments === "empty") {
            dispatch(fetchDepartments())
        }
    }, [dispatch, loadingDepartments])

    const [departmentSelected, setDepartmentSelected] = useState(null)
    const [provinceSelected, setProvinceSelected] = useState(null)
    const [districtSelected, setDistrictSelected] = useState(null)



    useEffect(() => {
        setProvinceSelected(null)
        setDistrictSelected(null)
        if (departmentSelected) {
            dispatch(fetchProvinces(departmentSelected))
        }
    }, [departmentSelected, dispatch])

    useEffect(() => {
        setDistrictSelected(null)
        if (provinceSelected) {
            dispatch(fetchDistricts(provinceSelected))
        }
    }, [provinceSelected, dispatch])


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
            id: data.id,
            name: data.name,
            address: data.address,
            ubigeodistrito_id: data.ubigeodistrito_id,
            phone: data.phone,
            email: data.email,
            latitude: data.latitude,
            longitude: data.longitude,
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
                dispatch(deleteHeadquarters(data.id))
            }
        })
    }

    const onSubmit = data => {
        setModalShow(false);
        console.log(data)
        dispatch(putHeadquarters(data))
    };

    return (
        <div>
            <Button variant="primary" onClick={handleModal} className="me-2 btn-sm">
                <i className="fa fa-edit fa-lg"></i>
            </Button>
            <Button variant="danger" onClick={handleDelete} className="me-2 btn-sm">
                <i className="fa fa-times fa-lg"></i>
            </Button>
            {loadingHq === "pendig" ? <i className="fas fa-spin fa-spinner fa-lg"></i> : ""}

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>
                        <Modal.Title>Editar Sedes o Sucursales </Modal.Title>
                        {(loadingHq === "pendig" || loadingDepartments === "pendig" || loadingProvinces === "pendig" || loadingDistricts === "pendig") &&
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
                                            options={Object.values(allDepartments)}
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
                                            options={Object.values(allProvinces)}
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
                                                    placeholder={"Elija una Opción"}
                                                    options={Object.values(allDistricts)}
                                                    value={Object.values(allDistricts).find((d) => d.value === (value))}
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

export default ModalEditHeadquarters;