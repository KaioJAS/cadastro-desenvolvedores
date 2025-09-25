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
import { Desenvolvedor } from '@/types/desenvolvedor';
import { Nivel } from '@/types/nivel';
import { DesenvolvedorService } from '@/services/DesenvolvedorService'
import { NivelService } from '@/services/NivelService';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

const Crud = () => {
    let emptyDesenvolvedor: Desenvolvedor = {
        id: 0,
        nivel_id: 0,
        nome: '',
        sexo: '',
        data_nascimento: '',
        hobby: ''
    };

    const [desenvolvedores, setDesenvolvedores] = useState(null);
    const [desenvolvedorDialog, setDesenvolvedorDialog] = useState(false);
    const [deleteDesenvolvedorDialog, setDeleteDesenvolvedorDialog] = useState(false);
    const [desenvolvedor, setDesenvolvedor] = useState<Desenvolvedor>(emptyDesenvolvedor);
    const [niveisDisponiveis, setNiveisDisponiveis] = useState<Nivel[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        DesenvolvedorService.getDesenvolvedores(globalFilter, currentPage, rowsPerPage)
            .then((response) => {
                setDesenvolvedores(response.data);
                setTotalRecords(response.total);
            })
            .catch((error) => {
                console.log("deu ruim", error);
            })
    }, [globalFilter, currentPage, rowsPerPage]);

    useEffect(() => {
        NivelService.getNiveis()
            .then((response) => {
                setNiveisDisponiveis(response.data);
            })
            .catch((error) => {
                console.log("erro ao buscar níveis", error);
            })
    }, []);


    const openNew = () => {
        setDesenvolvedor(emptyDesenvolvedor);
        setSubmitted(false);
        setDesenvolvedorDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDesenvolvedorDialog(false);
    };

    const hideDeleteNivelDialog = () => {
        setDeleteDesenvolvedorDialog(false);
    };

    const salvarDados = () => {
        setSubmitted(true);

        if (desenvolvedor.nome.trim() && desenvolvedor.sexo && desenvolvedor.data_nascimento && desenvolvedor.nivel_id) {
            if (desenvolvedor.id) {
                DesenvolvedorService.updateDesenvolvedores(desenvolvedor.id,
                    {
                        nome: desenvolvedor.nome,
                        sexo: desenvolvedor.sexo,
                        data_nascimento: desenvolvedor.data_nascimento,
                        hobby: desenvolvedor.hobby,
                        nivel_id: desenvolvedor.nivel_id
                    }
                )
                    .then(() => {
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Desenvolvedor Atualizado',
                            life: 3000
                        });
                        DesenvolvedorService.getDesenvolvedores(globalFilter, currentPage, rowsPerPage)
                            .then((response) => {
                                setDesenvolvedores(response.data);
                                setTotalRecords(response.total);
                            });
                    });
            } else {
                DesenvolvedorService.createDesenvolvedores(
                    {
                        nome: desenvolvedor.nome,
                        sexo: desenvolvedor.sexo,
                        data_nascimento: desenvolvedor.data_nascimento,
                        hobby: desenvolvedor.hobby,
                        nivel_id: desenvolvedor.nivel_id
                    }
                )
                    .then(() => {
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Desenvolvedor Criado',
                            life: 3000
                        });
                        DesenvolvedorService.getDesenvolvedores(globalFilter, currentPage, rowsPerPage)
                            .then((response) => {
                                setDesenvolvedores(response.data);
                                setTotalRecords(response.total);
                            });
                    });
            }

            setDesenvolvedorDialog(false);
            setDesenvolvedor(emptyDesenvolvedor);
        }
    };

    const editDesenvolvedor = (Desenvolvedor: Desenvolvedor) => {
        setDesenvolvedor({ ...Desenvolvedor });
        setDesenvolvedorDialog(true);
    };

    const confirmDeleteDesenvolvedor = (Desenvolvedor: Desenvolvedor) => {
        setDesenvolvedor(Desenvolvedor);
        setDeleteDesenvolvedorDialog(true);
    };

    const deleteDesenvolvedores = () => {
        DesenvolvedorService.deleteDesenvolvedores(desenvolvedor.id)
            .then(() => {
                let _nivels = (desenvolvedores as any)?.filter((val: any) => val.id !== desenvolvedor.id);
                setDesenvolvedores(_nivels);
                setDeleteDesenvolvedorDialog(false);
                setDesenvolvedor(emptyDesenvolvedor);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Desenvolvedor Excluido',
                    life: 3000
                });
            });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _desenvolvedor = { ...desenvolvedor };
        _desenvolvedor[`${name}`] = val;

        setDesenvolvedor(_desenvolvedor);
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

    const dataBodyTemplate = (rowData: Desenvolvedor) => {
        if (rowData.data_nascimento) {
            const data = new Date(rowData.data_nascimento);
            return data.toLocaleDateString('pt-BR');
        }
        return '';
    };

    const actionBodyTemplate = (rowData: Desenvolvedor) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editDesenvolvedor(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteDesenvolvedor(rowData)} />
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
            <Button label="Salvar" icon="pi pi-check" text onClick={salvarDados} />
        </>
    );
    const deleteNivelDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteNivelDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteDesenvolvedores} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-3">Desenvolvedores</h5>
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={desenvolvedores}
                        dataKey="id"
                        paginator
                        rows={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        totalRecords={totalRecords}
                        lazy
                        first={(currentPage - 1) * rowsPerPage}
                        onPage={(e) => {setCurrentPage(e.page + 1); setRowsPerPage(e.rows);}}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrar {first} de {last} com {totalRecords} desenvolvedores"
                        emptyMessage="Nenhum Desenvolvedor encontrado."
                        header={header}
                        responsiveLayout="stack"
                    >
                        <Column field="nome" header="Nome"></Column>
                        <Column field="sexo" header="Sexo"></Column>
                        <Column field="data_nascimento" header="Data Nascimento" body={dataBodyTemplate}></Column>
                        <Column field="hobby" header="Hobby"></Column>
                        <Column field="nivel.nivel" header="Nivel"></Column>
                        <Column  field="acoes" align="right" header="Ações" bodyStyle={{ textAlign: "right"}} body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={desenvolvedorDialog} style={{ width: '450px' }} header={desenvolvedor.id ? 'Atualizar Desenvolvedor' : 'Novo Desenvolvedor'} modal className="p-fluid" footer={NivelDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={desenvolvedor.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !desenvolvedor.nome
                                })}
                            />
                            {submitted && !desenvolvedor.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="sexo">Sexo</label>
                            <Dropdown
                                id="sexo"
                                value={desenvolvedor.sexo}
                                onChange={(e) => {
                                    let _desenvolvedor = { ...desenvolvedor };
                                    _desenvolvedor.sexo = e.value;
                                    setDesenvolvedor(_desenvolvedor);
                                }}
                                options={[
                                    { label: 'Masculino', value: 'M' },
                                    { label: 'Feminino', value: 'F' }
                                ]}
                                placeholder="Selecione o sexo"
                                className={classNames({
                                    'p-invalid': submitted && !desenvolvedor.sexo
                                })}
                            />
                            {submitted && !desenvolvedor.sexo && <small className="p-invalid">Sexo é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="data_nascimento">Data de Nascimento</label>
                            <Calendar
                                id="data_nascimento"
                                value={desenvolvedor.data_nascimento ? new Date(desenvolvedor.data_nascimento) : null}
                                onChange={(e) => {
                                    let _desenvolvedor = { ...desenvolvedor };
                                    _desenvolvedor.data_nascimento = e.value ? e.value.toISOString().split('T')[0] : '';
                                    setDesenvolvedor(_desenvolvedor);
                                }}
                                dateFormat="dd/mm/yy"
                                placeholder="Selecione a data"
                                className={classNames({
                                    'p-invalid': submitted && !desenvolvedor.data_nascimento
                                })}
                            />
                            {submitted && !desenvolvedor.data_nascimento && <small className="p-invalid">Data de nascimento é obrigatória.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="hobby">Hobby</label>
                            <InputText
                                id="hobby"
                                value={desenvolvedor.hobby}
                                onChange={(e) => onInputChange(e, 'hobby')}
                                placeholder="Digite o hobby"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="nivel_id">Nível</label>
                            <Dropdown
                                id="nivel_id"
                                value={desenvolvedor.nivel_id}
                                onChange={(e) => {
                                    let _desenvolvedor = { ...desenvolvedor };
                                    _desenvolvedor.nivel_id = e.value;
                                    setDesenvolvedor(_desenvolvedor);
                                }}
                                options={niveisDisponiveis.map(nivel => ({ label: nivel.nivel, value: nivel.id }))}
                                placeholder="Selecione o nível"
                                className={classNames({
                                    'p-invalid': submitted && !desenvolvedor.nivel_id
                                })}
                            />
                            {submitted && !desenvolvedor.nivel_id && <small className="p-invalid">Nível é obrigatório.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDesenvolvedorDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteNivelDialogFooter} onHide={hideDeleteNivelDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {desenvolvedor && (
                                <span>
                                    Tem certeza que deseja deletar <b>{desenvolvedor.nome}</b>?
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
