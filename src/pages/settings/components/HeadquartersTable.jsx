import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import DataTable from 'react-data-table-component';

import ModalEditHeadquarters from "./ModalEditHeadquarter";
import ModalNewHeadquarters from "./ModalNewHeadquarter";
import ModaNewWarehouse from "./ModalNewWarehouse";
import ModaEditWarehouse from "./ModalEditWarehouse";

import { fetchHeadquarters, headquartersSelector } from "../../../reducer/slices/headquartersSlice";

const HeadquartersTable = () => {

    const dispatch = useDispatch();

    const allHeadquarter = useSelector(headquartersSelector.selectEntities);
    const { loading } = useSelector(store => store.headquarters)

    useEffect(() => {
        if (loading === 'empty') {
            dispatch(fetchHeadquarters())
        }
    }, [dispatch, loading])


    // DataTable Headquarter
    const columnsHeadQuarter = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            name: 'Sede',
            selector: row => <strong>{row.name}</strong>,
            sortable: true,
        },
        {
            name: 'Dirección',
            selector: row => row.address,
            grow: 2,
            sortable: true,
            wrap: true
        },
        {
            name: 'Acciones',
            cell: row => (
                <ModalEditHeadquarters data={row} />
            ),
            center: true
        }
    ]

    const dataHeadquarter = allHeadquarter ? Object.values(allHeadquarter) : [];

    const ExpandedComponentHeadquarter = ({ data }) => {
        const columnsTypevalue = [
            {
                id: 'id',
                name: 'ID',
                selector: row => row.id,
                sortable: true,
                omit: true
            },
            {
                id: 'name',
                name: 'Name',
                selector: row => <strong className='text-primary'>{row.name}</strong>,
                sortable: true,
            },
            {
                name: 'Description',
                selector: row => row.description,
                sortable: true,
                wrap: true,
                grow: 2,
            },
            {
                name: 'Actions',
                cell: row => <ModaEditWarehouse data={row} />,
                center: true,
            },
        ];
        const dataTypevalue = data.warehouses;
        return (
            <div className="table-responsive" style={{ backgroundColor: '#FFF' }}>
                <DataTable
                    title={<ModaNewWarehouse headquarterId={data.id} />}
                    columns={columnsTypevalue}
                    data={dataTypevalue}

                />
            </div>
        );
    };



    return (
        <div className="mb-4 pb-3">
            <h4 className="d-flex align-items-center mb-2 mt-3">
                <Icon className="iconify fs-24px me-2 text-body text-opacity-75 my-n1" icon="solar:building-bold-duotone" />
                Sedes o Sucursales
            </h4>
            <p>Información de las sedes o sucursales de la empresa.</p>
            <div className="card">
                <div className="list-group list-group-flush fw-bold">
                    <DataTable
                        title={<ModalNewHeadquarters />}
                        columns={columnsHeadQuarter}
                        data={dataHeadquarter}
                        pagination
                        expandableRows
                        expandOnRowClicked
                        expandableRowsComponent={ExpandedComponentHeadquarter}
                    />
                </div>
            </div>
        </div>

    )
}

export default HeadquartersTable
