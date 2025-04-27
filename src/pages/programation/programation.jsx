import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOneProgramation, programationsSelectors } from '../../reducer/slices/programationsSlice'
import { Button } from 'react-bootstrap'
import ModalProgServiceNew from './components/progservices/modalProgServiceNew'

const Programation = () => {
    const { id: programation_id } = useParams()
    const dispatch = useDispatch()
    const programationSelected = useSelector(state => programationsSelectors.selectById(state, programation_id))
    const { loading } = useSelector(state => state.programations)
    useEffect(() => {
        if (loading === 'empty') {
            dispatch(fetchOneProgramation(programation_id))
        }
    }, [dispatch, loading, programation_id])

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            id: 'salida',
            name: 'Salida',
            selector: row => row.start_time,
            sortable: true,
            omit: true
        },
        {
            name: 'Salida',
            selector: row => <span className='fw-bolder fs-20px'>{row.start_time}</span>,
            sortable: true,
        },
        {
            name: 'Servicio',
            selector: row => row.servicetype.name,
            sortable: true,
            grow: 0.3,
        },
        {
            name: 'Vehículo',
            selector: row => row.vehicle.license_plate + ' - T' + row.workshift.number,
            sortable: true,
        },
        {
            name: 'Conductor',
            selector: row => row.driver.name,
            sortable: true,
        },
        {
            name: 'Guía',
            selector: row => row.guide.name,
            sortable: true,
        },
        {
            name: 'Supervisor',
            selector: row => row.supervisor.name,
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <Button variant="danger" size='sm' ><i className="fa fa-ban fa-lg"></i></Button>
                    <Link to={`/programation/service/${row.id}`} className='btn btn-primary btn-sm'><i className="fa fa-edit fa-lg"></i></Link>
                </>
            ),
            center: true,
        },
    ]
    const data = programationSelected?.services ? programationSelected.services : []

    return (
        <div>
            <div className="d-flex align-items-center mb-3">
                <div>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/programation/programations">Listado</Link></li>
                        <li className="breadcrumb-item active">Programación</li>
                    </ul>
                    <h1 className="page-header mb-0">Programación {programationSelected?.serie}-{programationSelected?.number}</h1>
                </div>
            </div>

            <div className='card border-0 mb-3'>
                <div className="card-body">
                    <div className=" d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                        Fecha: <span className='fw-bolder'>{programationSelected?.date}</span>
                        <div className="d-flex align-items-center mt-2 mt-md-0">
                            {
                                programationSelected?.status === 1 ? <span className="badge bg-success me-2">Activo</span> :
                                    programationSelected?.status === 2 ? <span className="badge bg-danger me-2">Cancelado</span> :
                                        programationSelected?.status === 3 ? <span className="badge bg-black me-2">Cerrado</span> :
                                            programationSelected?.status === 4 ? <span className="badge bg-warning me-2">Pendiente</span> :
                                                programationSelected?.status === 5 ? <span className="badge bg-info me-2">En Proceso</span> :
                                                    programationSelected?.status === 6 ? <span className="badge bg-primary me-2">Finalizado</span> : null
                            }
                        </div>
                        <a href="#/" className="btn btn-white btn-rounded px-4 rounded-pill"><i className="fa fa-plus fa-lg me-2 ms-n2 text-bright"></i> Editar</a>
                    </div>
                    Creado por:
                    <span className='fw-bolder'> {programationSelected?.creator.name}</span>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                        {programationSelected?.note ? <span className="badge bg-secondary me-2">{programationSelected.note}</span> : <span className='fst-italic text-primary'>No se registraron observaciones</span>}

                    </div>
                </div>

            </div>

            <div className="mb-3 d-md-flex fw-bold">
                <div className="mt-md-0 mt-2">
                    <a href="#/" className="text-dark text-decoration-none"><i className="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Exportar CSV</a></div>
                {/* <div className="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
                    <a href="#/" data-bs-toggle="dropdown" className="text-dark text-decoration-none">More Actions <b className="caret"></b></a>
                    <div className="dropdown-menu">
                        <a href="#/" className="dropdown-item">Action</a>
                        <a href="#/" className="dropdown-item">Another action</a>
                        <a href="#/" className="dropdown-item">Something else here</a>
                        <div role="separator" className="dropdown-divider"></div>
                        <a href="#/" className="dropdown-item">Separated link</a>
                    </div>
                </div> */}
            </div>

            <div className="card border-0">
                <ul className="nav nav-tabs nav-tabs-v2 px-3">
                    <li className="nav-item me-2"><a href="#/" className="nav-link px-2 active">Todo</a></li>
                    <li className="nav-item me-2"><a href="#/" className="nav-link px-2">Incompletas</a></li>
                    <li className="nav-item me-2"><a href="#/" className="nav-link px-2">Inpagas</a></li>
                    <li className="nav-item me-2"><a href="#/" className="nav-link px-2">Abiertas</a></li>
                    <li className="nav-item me-2"><a href="#/" className="nav-link px-2">Cerradas</a></li>
                </ul>
                <div className="tab-content p-3">
                    <div className="tab-pane fade show active" id="allTab">
                        <div className="input-group mb-3">
                            <button className="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown"><span className="d-none d-md-inline">Servicios </span><span className="d-inline d-md-none"><i className="fa fa-credit-card"></i></span> <b className="caret"></b></button>
                            <div className="dropdown-menu">
                                <a href="#/" className="dropdown-item">Por Empresa</a>
                                <a href="#/" className="dropdown-item">Por Supervisor</a>
                                <div role="separator" className="dropdown-divider"></div>
                                <a href="#/" className="dropdown-item">Otro</a>
                            </div>

                            <div className="flex-fill position-relative">
                                <div className="input-group">
                                    <div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0" style={{ zIndex: 10 }}>
                                        <i className="fa fa-search opacity-5"></i>
                                    </div>
                                    <input type="text" className="form-control px-35px bg-light" placeholder="Search orders..." />
                                </div>
                            </div>
                        </div>
                        <DataTable
                            title={loading !== "pending" ? <div className='float-end'> <ModalProgServiceNew id={programationSelected?.id} /></div> : ""}
                            data={data}
                            columns={columns}
                            noDataComponent={<>
                                <div className="text-center">
                                    <i className='fa fa-box-open text-gray-500 fs-40px p-4' />
                                </div>
                                <span className='text-gray fw-bold fs-5'>No hay datos disponibles</span>
                            </>}
                            progressPending={loading === 'pending'}
                            progressComponent={<>
                                <div className="text-center">
                                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                                </div>
                                <span className='text-gray fw-bold fs-5 p-4'>Cargando...</span>
                            </>}
                            defaultSortFieldId="salida"
                            defaultSortAsc={true}
                        />
                    </div>
                </div>
            </div>

        </div>)
}

export default Programation