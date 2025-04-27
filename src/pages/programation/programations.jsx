import React, { use, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import DataTable from 'react-data-table-component';
import { Button, Nav, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgramations, programationsSelectors } from '../../reducer/slices/programationsSlice.js';
import ModalProgramationNew from './components/programation/modalProgramationNew.jsx';


function Programations() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allProgramation = useSelector(programationsSelectors.selectEntities);
    const { loading } = useSelector(state => state.programations);
    const columns = [
        {
            name: 'Id',
            id: 'id',
            selector: row => row.id,
            sortable: true,
            grow: 0.3,
        },
        {
            name: 'Número',
            selector: row => (
                <Button
                    variant="primary"
                    onClick={() => {
                        navigate(`/programation/programation/${row.id}`, { replace: true })
                    }}
                >
                    {row.serie + " " + row.number}
                </Button>
            ),
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => {
                const date = new Date(row.date);
                const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

                const weekday = weekdays[date.getDay()];
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();

                return `${weekday}, ${day} ${month} ${year}`;
            },
            sortable: true,
            grow: 2
        },
        {
            name: 'Usuario',
            selector: row => row.creator.name,
            sortable: true,
        },
        {
            name: 'Nota',
            selector: row => row.note,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => {
                if (row.status === 1) return <span className='badge bg-success'>Activo</span>
                if (row.status === 2) return <span className='badge bg-danger'>Cancelado</span>
                if (row.status === 3) return <span className='badge bg-black'>Cerrado</span>
            },
            sortable: true,
        },
        {
            name: 'Axn',
            selector: row => (
                <Button
                    variant="danger"
                    onClick={() => { }}
                >
                    <i className='fa fa-ban fa-lg' />
                </Button>
            ),
        }
    ];

    useEffect(() => {
        if (loading === 'empty') {
            dispatch(fetchProgramations({ startdate: '2023-01-01', finishdate: '2023-12-31' }));
        }
    }, [dispatch, loading]);

    const data = Object.values(allProgramation)

    return (
        <>
            <ol className="breadcrumb float-xl-end">
                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                <li className="breadcrumb-item active">Programación</li>
            </ol>
            <h1 className="page-header">Programación Diaría<small>Servicios que se realizarán en el día</small></h1>
            <Panel>
                <PanelHeader>
                    Programación Diaria
                </PanelHeader>
                <PanelBody>
                    <DataTable title={
                        <div className='float-end'>
                            <ModalProgramationNew />
                        </div>
                    }
                        columns={columns}
                        data={data}
                        noDataComponent={<>
                            <div className="text-center">
                                <i className='fa fa-box-open text-gray-500 fs-40px p-4' />
                            </div>
                            <span className='text-gray fw-bold fs-5'>No hay datos disponibles</span>
                        </>}
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
                        pagination
                        paginationComponentOptions={
                            {
                                rowsPerPageText: 'Filas por pagina',
                                rangeSeparatorText: 'de',
                            }
                        }
                        defaultSortFieldId="id"
                        defaultSortAsc={false}
                    />
                </PanelBody>
            </Panel>
        </>
    )
}

export default Programations;