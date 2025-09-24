'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Nivel } from '@/types/nivel'

const Crud = () => {
    let emptyNivel: Nivel = {
        id: 0,
        nivel: '',
    };

    const [niveis, setNiveis] = useState(null);
    const [nivelDialog, setNivelDialog] = useState(false);
    const [deleteNivelDialog, setDeleteNivelDialog] = useState(false);
    const [nivel, setNivel] = useState<Nivel>(emptyNivel);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        setNiveis([
            { id: 1, nivel: "Junior"},
            { id: 2, nivel: "Pleno"},
            { id: 3, nivel: "Senior"},
        ])
    }, []);


    const openNew = () => {
        setNivel(emptyNivel);
        setSubmitted(false);
        setNivelDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setNivelDialog(false);
    };

    const hideDeleteNivelDialog = () => {
        setDeleteNivelDialog(false);
    };

    const salvarNivel = () => {
        setSubmitted(true);

        if (nivel.nivel.trim()) {
            let _nivels = [...(niveis as any)];
            let _nivel = { ...nivel };
            if (nivel.id) {
                const index = findIndexById(nivel.id);

                _nivels[index] = _nivel;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Nível Atualizado',
                    life: 3000
                });
            } else {
                _nivel.id = Date.now();
                _nivels.push(_nivel);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Nivel Criado',
                    life: 3000
                });
            }

            setNiveis(_nivels as any);
            setNivelDialog(false);
            setNivel(emptyNivel);
        }
    };

    const editNivel = (nivel: Nivel) => {
        setNivel({ ...nivel });
        setNivelDialog(true);
    };

    const confirmDeleteNivel = (nivel: Nivel) => {
        setNivel(nivel);
        setDeleteNivelDialog(true);
    };

    const deleteNivel = () => {
        let _nivels = (niveis as any)?.filter((val: any) => val.id !== nivel.id);
        setNiveis(_nivels);
        setDeleteNivelDialog(false);
        setNivel(emptyNivel);
        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Nível Excluido',
            life: 3000
        });
    };

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < (niveis as any)?.length; i++) {
            if ((niveis as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _nivel = { ...nivel };
        _nivel[`${name}`] = val;

        setNivel(_nivel);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData: Nivel) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.nivel}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Nivel) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editNivel(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteNivel(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );

    const NivelDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={salvarNivel} />
        </>
    );
    const deleteNivelDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteNivelDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteNivel} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-3">Níveis</h5>
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={niveis}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrar {first} de {last} com {totalRecords} niveis"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum nível encontrado."
                        header={header}
                        responsiveLayout="stack"
                    >
                        <Column field="id" header="ID"></Column>
                        <Column field="nivel" header="Nível" body={nameBodyTemplate}></Column>
                        <Column  field="acoes" align="right" header="Ações" bodyStyle={{ textAlign: "right"}} body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={nivelDialog} style={{ width: '450px' }} header={nivel.id ? 'Atualizar Nível' : 'Novo Nível'} modal className="p-fluid" footer={NivelDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Nome do nível</label>
                            <InputText
                                id="name"
                                value={nivel.nivel}
                                onChange={(e) => onInputChange(e, 'nivel')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !nivel.nivel
                                })}
                            />
                            {submitted && !nivel.nivel && <small className="p-invalid">Nível é obrigatório.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteNivelDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteNivelDialogFooter} onHide={hideDeleteNivelDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {nivel && (
                                <span>
                                    Tem certeza que deseja deletar <b>{nivel.nivel}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
