import React, { Component } from "react"
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd"
import { ExcelRenderer } from "react-excel-renderer"
import { EditableFormRow, EditableCell } from "../utils/editable"
import ExportJsonExcel from 'js-export-excel';


export default class Excelpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPredicted: false,
            cols: [],
            rows: [],
            errorMessage: null,
            columns: [
                {
                    title: "BPL",
                    dataIndex: "BPL_entrant",
                    editable: true,
                    ellipsis: true,
                    fixed: 'left',

                },
                {
                    title: "CO2",
                    dataIndex: "CO2_entrant",
                    editable: true,
                    ellipsis: true,
                    fixed: 'left',
                },
                {
                    title: "MgO",
                    dataIndex: "MgO_entrant",
                    editable: true,
                    ellipsis: true,
                    fixed: 'left',
                },
                
                {
                    title: "Cd",
                    dataIndex: "Cd_entrant",
                    editable: true,
                    ellipsis: true,
                    fixed: 'left',
                },
                {
                    title: "Débit phosphate brut CV001",
                    dataIndex: "Débit_phosphate_brut_CV001",
                    editable: true,
                    ellipsis: true,

                },
                {
                    title: "Densité PK03",
                    dataIndex: "Densité_PK03",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Pression PK03",
                    dataIndex: "Pression_PK03",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Densité PK04",
                    dataIndex: "Densité_PK04",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Dilution HP04",
                    dataIndex: "Dilution_HP04",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Pression PK004",
                    dataIndex: "Pression_PK004",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Densité PK05",
                    dataIndex: "Densité_PK05",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Dilution HP05",
                    dataIndex: "Dilution_HP05",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Pression PK05",
                    dataIndex: "Pression_PK05",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 1",
                    dataIndex: "Debit_air_cell_1",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 2",
                    dataIndex: "Debit_air_cell_2",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 3",
                    dataIndex: "Debit_air_cell_3",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 4",
                    dataIndex: "Debit_air_cell_4",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 5",
                    dataIndex: "Debit_air_cell_5",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 6",
                    dataIndex: "Debit_air_cell_6",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 7",
                    dataIndex: "Debit_air_cell_7",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Pression PK23",
                    dataIndex: "Pression_PK23",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "",
                    dataIndex: "action",
                    render: (text, record) =>
                        this.state.rows.length >= 1 ? (
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.key)}
                            >
                                <a style={{ whiteSpace: "nowrap", textDecoration: "underline", color: "#0060B6", }}>Delete</a>

                            </Popconfirm>
                        ) : null
                }
            ],
            columns_after: [
                {
                    title: "BPL",
                    dataIndex: "BPL_entrant",
                    ellipsis: true,
                    fixed: 'left',

                },
                {
                    title: "CO2",
                    dataIndex: "CO2_entrant",
                    ellipsis: true,
                    fixed: 'left',
                },
                {
                    title: "MgO",
                    dataIndex: "MgO_entrant",
                    ellipsis: true,
                    fixed: 'left',
                },
               
                {
                    title: "Cd",
                    dataIndex: "Cd_entrant",
                    ellipsis: true,
                    fixed: 'left',
                },
                {
                    title: "Débit phosphate brut CV001",
                    dataIndex: "Débit_phosphate_brut_CV001",
                    ellipsis: true,

                },
                {
                    title: "Densité PK03",
                    dataIndex: "Densité_PK03",
                    ellipsis: true,
                },
                {
                    title: "Pression PK03",
                    dataIndex: "Pression_PK03",
                    ellipsis: true,
                },
                {
                    title: "Densité PK04",
                    dataIndex: "Densité_PK04",
                    ellipsis: true,
                },
                {
                    title: "Dilution HP04",
                    dataIndex: "Dilution_HP04",
                    ellipsis: true,
                },
                {
                    title: "Pression PK004",
                    dataIndex: "Pression_PK004",
                    ellipsis: true,
                },
                {
                    title: "Densité PK05",
                    dataIndex: "Densité_PK05",
                    ellipsis: true,
                },
                {
                    title: "Dilution HP05",
                    dataIndex: "Dilution_HP05",
                    editable: true,
                    ellipsis: true,
                },
                {
                    title: "Pression PK05",
                    dataIndex: "Pression_PK05",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 1",
                    dataIndex: "Debit_air_cell_1",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 2",
                    dataIndex: "Debit_air_cell_2",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 3",
                    dataIndex: "Debit_air_cell_3",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 4",
                    dataIndex: "Debit_air_cell_4",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 5",
                    dataIndex: "Debit_air_cell_5",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 6",
                    dataIndex: "Debit_air_cell_6",
                    ellipsis: true,
                },
                {
                    title: "Debit air cell 7",
                    dataIndex: "Debit_air_cell_7",
                    ellipsis: true,
                },
                {
                    title: "Pression PK23",
                    dataIndex: "Pression_PK23",
                    ellipsis: true,
                },
                {
                    title: "BPL en sortie",
                    dataIndex: "BPL_sortant",
                    ellipsis: true,
                    fixed: 'right',
                    render(text, record) {
                        return {
                            props: {
                                style: { background: parseInt(text) > 61 ? "#519e8a" : "#dd8989" }
                            },
                            children: <div>{text}</div>
                        };
                    }

                },
                {
                    title: "CO2 en sortie",
                    dataIndex: "CO2_sortant",
                    ellipsis: true,
                    fixed: 'right',
                },
                {
                    title: "MgO en sortie",
                    dataIndex: "MgO_sortant",
                    ellipsis: true,
                    fixed: 'right',
                },
                


            ],
            results: ''
        };
    }
    handleSave = row => {
        const newData = [...this.state.rows]
        const index = newData.findIndex(item => row.key === item.key)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ...row,
        })
        this.setState({ rows: newData })
    }
    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = fileList => {
        console.log("fileList", fileList)
        let fileObj = fileList
        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!",
            })
            return false
        }
        console.log("fileObj.type:", fileObj.type)
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "Unknown file format. Only Excel files are uploaded!",
            })
            return false
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err)
            } else {
                let newRows = []
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {
                        newRows.push({
                            key: index,
                            BPL_entrant: row[0],
                            CO2_entrant: row[1],
                            MgO_entrant: row[2],
                            Cd_entrant: row[3],
                            Débit_phosphate_brut_CV001: row[4],
                            Densité_PK03: row[5],
                            Pression_PK03: row[6],
                            Densité_PK04: row[7],
                            Dilution_HP04: row[8],
                            Pression_PK004: row[9],
                            Densité_PK05: row[10],
                            Dilution_HP05: row[11],
                            Pression_PK05: row[12],
                            Debit_air_cell_1: row[13],
                            Debit_air_cell_2: row[14],
                            Debit_air_cell_3: row[15],
                            Debit_air_cell_4: row[16],
                            Debit_air_cell_5: row[17],
                            Debit_air_cell_6: row[18],
                            Debit_air_cell_7: row[19],
                            Pression_PK23: row[20],


                        })
                    }
                })
                if (newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!",
                    })
                    return false
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null,
                        isPredicted: false,
                        results: '',
                    })
                }
            }
        })
        return false
    }

    handlePredictClick = (event) => {
        console.log("submitting: ", this.state.rows)
        fetch('/prediction/multiprediction',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.state.rows)
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    results: response.result,
                    isPredicted: true,
                });
            });
    }

    downloadExcel = () => {
        const result = this.state.results;

        var option = {};
        let dataTable = [];
        if (result) {
            for (let i in result) {
                if (result) {
                    let obj = {

                        'BPL_entrant': result[i].BPL_entrant,
                        'CO2_entrant': result[i].CO2_entrant,
                        'MgO_entrant': result[i].MgO_entrant,
                        
                        'Cd_entrant': result[i].Cd_entrant,
                        'Débit_phosphate_brut_CV001': result[i].Débit_phosphate_brut_CV001,
                        'Densité_PK03': result[i].Densité_PK03,
                        'Pression_PK03': result[i].Pression_PK03,
                        'Densité_PK04': result[i].Densité_PK04,
                        'Dilution_HP04': result[i].Dilution_HP04,
                        'Pression_PK004': result[i].Pression_PK004,
                        'Densité_PK05': result[i].Densité_PK05,
                        'Dilution_HP05': result[i].Dilution_HP05,
                        'Pression_PK05': result[i].Pression_PK05,
                        'Debit_air_cell_1': result[i].Debit_air_cell_1,
                        'Debit_air_cell_2': result[i].Debit_air_cell_2,
                        'Debit_air_cell_3': result[i].Debit_air_cell_3,
                        'Debit_air_cell_4': result[i].Debit_air_cell_4,
                        'Debit_air_cell_5': result[i].Debit_air_cell_5,
                        'Debit_air_cell_6': result[i].Debit_air_cell_6,
                        'Debit_air_cell_7': result[i].Debit_air_cell_7,
                        'Pression_PK23': result[i].Pression_PK23,
                        'BPL_sortant': result[i].BPL_sortant,
                        'CO2_sortant': result[i].CO2_sortant,
                        'MgO_sortant': result[i].MgO_sortant,
                        

                    }
                    dataTable.push(obj);
                }
            }
        }
        option.fileName = 'Prediction_Flottation'
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: 'sheet',
                sheetFilter: ['BPL_entrant',
                    'CO2_entrant',
                    'MgO_entrant',

                    'Cd_entrant',
                    'Débit_phosphate_brut_CV001',
                    'Densité_PK03',
                    'Pression_PK03',
                    'Densité_PK04',
                    'Dilution_HP04',
                    'Pression_PK004',
                    'Densité_PK05',
                    'Dilution_HP05',
                    'Pression_PK05',
                    'Debit_air_cell_1',
                    'Debit_air_cell_2',
                    'Debit_air_cell_3',
                    'Debit_air_cell_4',
                    'Debit_air_cell_5',
                    'Debit_air_cell_6',
                    'Debit_air_cell_7',
                    'Pression_PK23',
                    'BPL_sortant',
                    'CO2_sortant',
                    'MgO_sortant',],
                    
                sheetHeader: ['BPL_entrant',
                'CO2_entrant',
                    'MgO_entrant',
                    
                    'Cd_entrant',
                    'Débit_phosphate_brut_CV001',
                    'Densité_PK03',
                    'Pression_PK03',
                    'Densité_PK04',
                    'Dilution_HP04',
                    'Pression_PK004',
                    'Densité_PK05',
                    'Dilution_HP05',
                    'Pression_PK05',
                    'Debit_air_cell_1',
                    'Debit_air_cell_2',
                    'Debit_air_cell_3',
                    'Debit_air_cell_4',
                    'Debit_air_cell_5',
                    'Debit_air_cell_6',
                    'Debit_air_cell_7',
                    'Pression_PK23',
                    'BPL_sortant',
                    'CO2_sortant',
                    'MgO_sortant',
                    ],
            }
        ];

        var toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }

    handleDelete = key => {
        const rows = [...this.state.rows]
        this.setState({ rows: rows.filter(item => item.key !== key) })
    }
    handleResetClick = () => {
        this.setState({
            isPredicted: false,
            results: '',
        })
    }
    handleAdd = () => {
        const { count, rows } = this.state
        const newData = {
            key: this.state.rows.length,
            BPL_entrant: 0,
            MgO_entrant: 0,
            CO2_entrant: 0,
            Cd_entrant: 0,
            Débit_phosphate_brut_CV001: 0,
            Densité_PK03: 0,
            Pression_PK03: 0,
            Densité_PK04: 0,
            Dilution_HP04: 0,
            Pression_PK004: 0,
            Densité_PK05: 0,
            Dilution_HP05: 0,
            Pression_PK05: 0,
            Debit_air_cell_1: 0,
            Debit_air_cell_2: 0,
            Debit_air_cell_3: 0,
            Debit_air_cell_4: 0,
            Debit_air_cell_5: 0,
            Debit_air_cell_6: 0,
            Debit_air_cell_7: 0,
            Pression_PK23: 0,


        }
        this.setState({
            rows: [newData, ...rows],
            count: count + 1,
        })
    }

    render() {
        const results = this.state.results;
        const isPredicted = this.state.isPredicted;


        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        }
        const columns_after = this.state.columns_after.map(col => { return col })

        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            }
        })
        return (
            <div >
                <h1>Multi Prédictions à travers fichier Excel :</h1>
                <Row gutter={20} justify="space-between">
                    <Col
                        span={8}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "5%",
                        }}
                    >

                    </Col>

                    <Col
                        span={8}
                        align="right"
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        {this.state.rows.length > 0 && !isPredicted && (
                            <>
                                <Button
                                    onClick={this.handleAdd}
                                    size="large"
                                    type="info"
                                    style={{ marginBottom: 16 }}
                                >
                                    <Icon type="plus" />
                                    Add a row
        </Button>{" "}
                                <Button
                                    onClick={this.handlePredictClick}
                                    size="large"
                                    type="primary"
                                    style={{ marginBottom: 16, marginLeft: 10 }}
                                >
                                    Submit Data
        </Button>
                            </>
                        )}
                        {this.state.isPredicted && (
                            <>
                                <Button
                                    size="large"
                                    type="info"
                                    style={{ marginBottom: 16, marginLeft: 10 }}

                                    onClick={this.handleResetClick}>

                                    Back
                </Button>{" "}
                                <Button
                                    onClick={this.downloadExcel}
                                    size="large"
                                    type="primary"
                                    style={{ marginBottom: 16, marginLeft: 10 }}
                                >
                                    Export to Excel Table
        </Button>
                            </>
                        )}
                    </Col>
                </Row>
                <div>
                    <Upload
                        name="file"
                        beforeUpload={this.fileHandler}
                        onRemove={() => this.setState({ rows: [] })}
                        multiple={false}
                    >
                        <Button>
                            <Icon type="upload" /> Click to Upload Excel File
    </Button>
                    </Upload>
                </div>
                <div style={{ marginTop: 20, }}>
                    <h8 style={{ marginTop: 20, }}>Les Données d'entrées et Paramétres de configuration du fichier Excel doivent suivre l'ordre ci dessous:</h8>
                    <div style={{ marginTop: 50, }}>

                        {results === '' ?
                            <Table
                                scroll={{ x: 'max-content' }}
                                components={components}
                                rowClassName={() => "editable-row"}
                                dataSource={this.state.rows}
                                columns={columns}

                            /> :
                            <Table
                                scroll={{ x: 'max-content' }}
                                dataSource={results}
                                columns={columns_after}
                            />}
                    </div>
                </div>
            </div>
        )
    }
}
