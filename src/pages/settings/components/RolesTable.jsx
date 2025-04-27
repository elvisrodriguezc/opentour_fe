import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';

import { fetchRoles, rolesSelector } from "../../../reducer/slices/rolesSlice";

import ModalNewRole from "./ModalNewRole";
import ModalEditRoles from "./ModalEditRole";
import { Button, Form, InputGroup } from "react-bootstrap";

const RolesTable = () => {

    const dispatch = useDispatch();

    const allRoles = useSelector(rolesSelector.selectEntities);
    const { loading } = useSelector(store => store.roles)

    useEffect(() => {
        if (loading === 'empty') {
            dispatch(fetchRoles())
        }
    }, [dispatch, loading])

    // DataTable Headquarter
    const [filteredRoles, setFilteredRoles] = useState([]);
    useEffect(() => {
        setFilteredRoles(Object.values(allRoles));
    }, [allRoles]);


    const columnsHeadQuarter = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            name: 'Rol',
            selector: row => <strong>{row.name}</strong>,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.description,
            grow: 2,
            sortable: true,
            wrap: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <ModalEditRoles data={row} />
            ),
            center: true
        }
    ]

    const dataHeadquarter = filteredRoles
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        const result = Object.values(allRoles).filter(role => {
            return role.name.toLowerCase().includes(value) || role.description.toLowerCase().includes(value);
        });
        setFilteredRoles(result);
    }

    return (
        <div className="mb-4 pb-3">
            <div className="mb-3 d-flex float-end">
                {/* <Form.Control
                    type="text"
                    placeholder="Buscar Rol"
                    className="mb-2"
                /> */}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Buscar..."
                        aria-label="Buscar..."
                        aria-describedby="basic-addon2"
                        onChange={handleSearch}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup>
            </div>
            <div className="clearfix">
                <h4 className="d-flex align-items-center mb-2 mt-3">
                    <Icon className="iconify fs-24px me-2 text-body text-opacity-75 my-n1" icon="solar:building-bold-duotone" />
                    <span>Roles de Usuarios</span>
                </h4>
                <p>Define el funcionamiento de los usuarios en el sistema.</p>
            </div>


            <div className="card">
                <div className="list-group list-group-flush fw-bold">
                    <DataTable
                        title={<ModalNewRole />}
                        columns={columnsHeadQuarter}
                        data={dataHeadquarter}
                        pagination
                    />
                </div>
            </div>
        </div>

    )
}

export default RolesTable
