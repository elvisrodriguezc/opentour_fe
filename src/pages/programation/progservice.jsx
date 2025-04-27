import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOneProgService, progservicesSelectors } from '../../reducer/slices/progservicesSlice'
import DataTable from 'react-data-table-component'
import { Spinner } from 'react-bootstrap'

const Services = () => {
    const dispatch = useDispatch()
    const id = useParams().id

    const serviceSelected = useSelector(state => progservicesSelectors.selectById(state, id))
    const { loading } = useSelector(state => state.progservices)

    useEffect(() => {
        dispatch(fetchOneProgService(id))
    }, [id, dispatch])

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            name: 'Servicio',
            selector: row => row.serie + ' ' + row.number,
            sortable: true,
        },
        {
            name: 'Vendedor',
            selector: row => row.seller.username,
            sortable: true,
        },
        {
            name: 'Jalador',
            selector: row => row.promoter.name,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.client.name + ' ' + row.client.country_abbreviation,
            sortable: true,
        },
        {
            name: 'Precio',
            selector: row => (
                row.isfree === true ? <span className='badge bg-success'>Gratis</span> :
                    <>
                        <div className='d-flex justify-content-between w-100'>
                            <span className='text-gray-500 me-1'>Precio</span>
                            <strong>{row.price.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</strong>
                        </div>
                        <div className='d-flex justify-content-between w-100'>
                            <span className='text-gray-500 me-1'>Descuento</span>
                            <strong>{row.discount.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</strong>
                        </div>
                        <div className='d-flex justify-content-between w-100'>
                            <span className='text-gray-500 me-1'>Total</span>
                            <strong>{row.total.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })}</strong>
                        </div>
                    </>
            ),
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => (
                <>
                    {
                        <span className={`me-2${row.isverified === true ? ' text-warning' : ' text-gray'}`}><i className='fas fa-user-check fa-lg'></i></span>
                    }
                    {
                        <span className={`me-2${row.ispaid === true ? ' text-success' : ' text-gray'}`}><i className='fas fa-dollar-sign fa-lg'></i></span>
                    }
                    {
                        row.status === true ? <span className='badge bg-primary'><i className='fas fa-circle'></i> Activo</span> : ""
                    }
                </>
            ),
            sortable: true,
        },
    ]

    const data = serviceSelected?.journeypasses

    return (
        <div>
            <div className='d-flex align-items-center mb-3'>
                <div>
                    <ul className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><a href="/programation">Home</a></li>
                        <li className="breadcrumb-item"><a href="/programation">Programación</a></li>
                        <li className="breadcrumb-item active">Servicio</li>
                    </ul>
                    <h1 className="page-header mb-0">Servicio <small>Servicios que se realizarán en el día</small></h1>
                </div>
            </div>
            <div className='card border-0 mb-3'>
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap border-0 p-3">
                    <div>
                        <h4 className="card-title">Servicio {serviceSelected?.id}</h4>
                        <h5 className="card-subtitle">{serviceSelected?.servicetype.name}</h5>
                        <span className="card-subtitle">Capacidad Habilitada {serviceSelected?.seating_capacity}</span>
                        <br />
                        <span className='text-gray-500'>Programación: </span> {serviceSelected?.programation}
                        <br />
                        <span className='text-gray-500'>Usuario: </span> {serviceSelected?.creator.username}

                    </div>
                    <div className="mb-3 mb-sm-0">
                        <span className='text-gray-500 me-2'>Hora Salida: </span>
                        <h4 className="card-title"> {serviceSelected?.start_time}</h4>
                        <span className='text-gray-500 me-2'>Hora Llegada: </span>
                        <h4 className="card-title"> {serviceSelected?.end_time || '--:--'}</h4>

                        <span className='text-gray-500 me-2'>Turno: </span>{serviceSelected?.workshift.number + ' - ' + serviceSelected?.workshift.company}
                        <br />
                        <span className='text-gray-500 me-2'>Vehículo: </span>{serviceSelected?.vehicle.license_plate + ' - ' + serviceSelected?.vehicle.name + ' '}
                        <span className='fw-bold'>{serviceSelected?.vehicle.seating_capacity}</span>
                    </div>
                    <div className="mb-3 mb-sm-0">
                        <div className="d-flex justify-content-between flex-wrap">
                            <span className='text-gray-500 me-2'>Conductor: </span>{serviceSelected?.driver.name}
                        </div>
                        <div className="d-flex justify-content-between flex-wrap">
                            <span className='text-gray-500 me-2'>Guía: </span>{serviceSelected?.guide.name}
                        </div>
                        <div className="d-flex justify-content-between flex-wrap">
                            <span className='text-gray-500 me-2'>Supervisor: </span>{serviceSelected?.supervisor.name}
                        </div>
                        <div className="d-flex justify-content-between flex-wrap">
                            {serviceSelected?.note ? <span className="badge bg-secondary me-2">{serviceSelected.note}</span> : <span className='fst-italic text-primary'>No se registraron observaciones</span>}
                        </div>
                    </div>

                </div>
                <div className="card-body">
                    <div className=" d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                        <DataTable
                            columns={columns}
                            data={data}
                            progressPending={loading === 'pending'}
                            progressComponent={<>
                                <div className="text-center">
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        variant="primary"
                                        className="m-4"
                                    />
                                </div>
                                <span className='text-gray fw-bold fs-5'>Cargando...</span>
                            </>}
                            noDataComponent={<>
                                <div className="text-center">
                                    <i className='fa fa-box-open text-gray-500 fs-40px p-4' />
                                </div>
                                <span className='text-gray fw-bold fs-5'>No hay datos disponibles</span>
                            </>}
                        />
                    </div>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                    <div className="d-flex align-items-center mt-2 mt-md-0">
                        TOTALES
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services