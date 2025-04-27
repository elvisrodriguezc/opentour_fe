import DataTable from "react-data-table-component"
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux"

import ModaNewType from "./ModalNewType"
import ModalEditType from "./ModalEditType"
import ModalNewTypeValue from "./ModalNewTypeValue"
import ModalEditTypeValue from "./ModalEditTypeValue"
import { fetchTypes, typesSelector } from "../../../reducer/slices/typesSlice"
import { useEffect } from "react"


const TypesTable = () => {
    const dispatch = useDispatch()

    const allTypes = useSelector(typesSelector.selectEntities)
    const loading = useSelector(store => store.types.loading)

    useEffect(() => {
        if (loading === 'empty') {
            dispatch(fetchTypes())
        }
    }, [dispatch, loading])

    // DataTable Type
    const columnsType = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit: true
        },
        {
            name: 'Tipo',
            selector: row => <strong>{row.name}</strong>,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.description,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Acciones',
            cell: row => (
                <ModalEditType data={row} />
            ),
            center: true,
        },
    ];

    const dataType = allTypes ? Object.values(allTypes) : [];

    const ExpandedComponentType = ({ data }) => {
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
                name: 'Abreviación',
                selector: row => row.abbreviation,
                sortable: true,
                grow: 1
            },
            {
                name: 'Valor',
                selector: row => row.value_data,
                sortable: true,
                grow: 1
            },
            {
                name: 'Description',
                selector: row => row.description,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Actions',
                cell: row => <ModalEditTypeValue data={row} />,
                center: true,
            },
        ];
        const dataTypevalue = data.typevalues;
        return (
            <div className="table-responsive" style={{ backgroundColor: '#FFF' }}>
                <DataTable
                    title={<ModalNewTypeValue typeId={data.id} />}
                    columns={columnsTypevalue}
                    data={dataTypevalue}
                />
            </div>
        );
    };


    return (
        <div className="mb-4 pb-3">
            <h4 className="d-flex align-items-center mb-2 mt-3">
                <Icon className="iconify fs-24px me-2 text-body text-opacity-75 my-n1" icon="solar:bell-bold-duotone" />
                Tipo de Datos
            </h4>
            <p>Información de las opciones de los menus de formularios.</p>
            <div className="card">
                <div className="list-group list-group-flush fw-bold">
                    <DataTable
                        title={<ModaNewType />}
                        columns={columnsType}
                        data={dataType}
                        expandableRows
                        expandOnRowClicked
                        expandableRowsComponent={ExpandedComponentType}
                        pagination
                    />
                </div>
            </div>
        </div>
    )
}
export default TypesTable
