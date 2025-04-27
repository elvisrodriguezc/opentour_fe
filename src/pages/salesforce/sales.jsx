import React, { use, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJourneypasses, journeypassesSelector } from '../../reducer/slices/journeypassesSlice';
import ModalSaleNew from './components/modalSaleNew';

const Sales = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch()

    const allJourneypasses = useSelector(journeypassesSelector.selectEntities)
    const { loading } = useSelector(store => store.journeypasses)
    useEffect(() => {
        if (loading === "empty") {
            dispatch(fetchJourneypasses())
        }
    }, [loading, dispatch])

    useEffect(() => {
        console.log(allJourneypasses)
    }, [allJourneypasses])


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            name: 'Servicio',
            selector: row => <Link to={`/sales/sales/${row.id}`} className="btn btn-success btn-xs"> {row.serie}</Link>,
            sortable: true,
        },
        {
            name: 'Promotor',
            selector: row => {
                return (
                    <div className='align-items-center'>
                        {row.promoter?.name}
                    </div>
                )
            },
            sortable: false, // Sorting by JSX element is not 
            wrap: true,
        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Cliente',
            selector: row => row.client.name + ' ' + row.client.country_abbreviation,
            sortable: true,
        },
        {
            name: 'Cant',
            selector: row => row.quantity,
            sortable: true,
            center: true,
            grow: 0.25,
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

    const data = Object.values(allJourneypasses);


    return (
        <div>
            <div className="d-flex align-items-center mb-3">
                <div>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/programation/programations">Listado</Link></li>
                        <li className="breadcrumb-item active">Programación</li>
                    </ul>
                    <h1 className="page-header mb-0">Fuerza de Ventas</h1>
                </div>
            </div>

            <div className='card border-0 mb-3'>
                <div className="card-body">
                    <div className=" d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
                        <h4>{userData.name}</h4>
                        <ModalSaleNew />
                    </div>
                </div>
                <div className='card-footer'>
                    <DataTable
                        columns={columns}
                        data={data}
                        progressPending={false}
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
        </div>

    )
}

export default Sales