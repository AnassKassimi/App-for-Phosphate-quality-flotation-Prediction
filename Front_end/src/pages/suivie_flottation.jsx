import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import { ExcelRenderer } from "react-excel-renderer"
import jwt_decode from 'jwt-decode'
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd"
import styled from 'styled-components';
import CanvasJSReact from '../assets/canvasjs.react.js';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GridWrapper = styled.div`
font-family: 'Roboto';
  margin-top: 6em;
  margin-left: 25em;
  margin-right: 6em;
  .navbar {
    z-index: 1000;
    font-family: 'Roboto';
    margin: auto;}
    &:active {
    color: #f4f6f8; ;
  }}
`;
class suivie_flottation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            rows: [],
            result: '',
            isEpingled: false
        }
    }

    componentDidMount() {
        if (localStorage.usertoken) {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                email: decoded.identity.email,
                
        
              })
        
        }

        if (localStorage.rows) {
            const email = localStorage.getItem('email')
            const rows = localStorage.getItem('rows')
            const isEpingled = localStorage.getItem('isEpingled')
            console.log(JSON.parse(rows)[1].Date)
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            const loggedemail= decoded.identity.email
            if(loggedemail==email){this.setState({

                rows: JSON.parse(rows),
                result: 'Done',
                isEpingled: isEpingled


            })}
            

        }

    }

    handleEpingler() {
        const rows = this.state.rows;
        localStorage.setItem('rows', JSON.stringify(rows));
        localStorage.setItem('isEpingled', true);
        localStorage.setItem('email', this.state.email);
        this.setState({
            isEpingled: true,
            
        })


    }

    handlebackClick() {
        localStorage.removeItem('rows')
        localStorage.removeItem('isEpingled')
        localStorage.removeItem('email')
        this.setState({
            isEpingled: false,
            
        })


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
                            Date: new Date((row[0] - (25567 + 2)) * 86400 * 1000),
                            Poste: row[1],
                            Ligne: row[2],
                            Qualité: row[3],
                            Mode_de_traitement: row[4],
                            BPL_AF: row[5],
                            CO2_AF: row[6],
                            MgO_AF: row[7],
                            SIO2: row[8],
                            Cd_AF_ppm: row[9],
                            Cd_AF: row[10],
                            BPL_NF: row[11],
                            CO2_NF: row[12],
                            MgO_NF: row[13],
                            SIO22: row[14],
                            Cd_NF_ppm: row[15],
                            Cd_NF: row[16],
                            Gain_bpl: row[17],



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
                        rows: newRows,
                        result: 'done'
                    })
                    console.log(this.state.rows)
                }
            }
        })
        return false
    }
    render() {
        const isEpingled = this.state.isEpingled
        const rows = this.state.rows
        var dataPoints_p1 = []
        var dataPoints_p2 = []
        var dataPoints_p3 = []
        var Bpl_range_p1 = []
        var Bpl_range_p2 = []
        var Bpl_range_p3 = []
        var MgO_range_p1 = []
        var MgO_range_p2 = []
        var MgO_range_p3 = []
        var CO2_range_p1 = []
        var CO2_range_p2 = []
        var CO2_range_p3 = []
        for (var i = 0, l = rows.length; i < l; i++) {
            if (rows[i].Poste == "P1") {
                dataPoints_p1.push({
                    x: new Date(rows[i].Date),
                    y: rows[i].Gain_bpl

                });
                Bpl_range_p1.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].BPL_AF, rows[i].BPL_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#2E8B57",
                });
                MgO_range_p1.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].MgO_AF, rows[i].MgO_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });
                CO2_range_p1.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].CO2_AF, rows[i].CO2_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });

            }
            else if (rows[i].Poste == 'P2') {
                dataPoints_p2.push({
                    x: new Date(rows[i].Date),
                    y: rows[i].Gain_bpl
                });
                Bpl_range_p2.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].BPL_AF, rows[i].BPL_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#2E8B57",
                    
                });
                MgO_range_p2.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].MgO_AF, rows[i].MgO_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });
                CO2_range_p2.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].CO2_AF, rows[i].CO2_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });
            }
            else if (rows[i].Poste == 'P3') {
                dataPoints_p3.push({
                    x: new Date(rows[i].Date),
                    y: rows[i].Gain_bpl
                });
                Bpl_range_p3.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].BPL_AF, rows[i].BPL_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#2E8B57",
                });
                MgO_range_p3.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].MgO_AF, rows[i].MgO_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });
                CO2_range_p3.push({
                    x: new Date(rows[i].Date),
                    y: [rows[i].CO2_AF, rows[i].CO2_NF],
                    label: rows[i].Mode_de_traitement,
                    color: "#ff3333",
                });
            }
        }

        var HT_count = 0
        var BT_count = 0
        var TBT_count = 0
        for (var i = 0, l = rows.length; i < l; i++) {
            if (rows[i].BPL_NF >= 68) { HT_count++; }
            else if (rows[i].BPL_NF >= 61) { BT_count++; }
            else { TBT_count++; }
        }

        var HT_before_count = 0
        var BT_before_count = 0
        var TBT_before_count = 0
        for (var i = 0, l = rows.length; i < l; i++) {
            if (rows[i].BPL_AF >= 68) { HT_before_count++; }
            else if (rows[i].BPL_AF >= 61) { BT_before_count++; }
            else { TBT_before_count++; }
        }


        const optionss = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Gain en Bpl"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                title: "Gain en BPL",

                includeZero: false
            },
            data: [{

                xValueFormatString: "D MMM",
                type: "line",
                dataPoints: dataPoints_p1,
                name: "Poste P1",
                showInLegend: true,

            },
            {

                xValueFormatString: "D MMM",
                type: "line",
                dataPoints: dataPoints_p2,
                name: "Poste P2",
                showInLegend: true,

            },
            {

                xValueFormatString: "D MMM",
                type: "line",
                dataPoints: dataPoints_p3,
                name: "Poste P3",
                showInLegend: true,

            }]
        }

        const result = this.state.result

        const bar_after = {
            exportEnabled: true,
            width: 500,
            title: {
                text: "Qualité Sortante"
            },

            axisY: {
                title: "Pourcentage",
                prefix: "%",
                includeZero: false
            },


            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    yValueFormatString: "##,##%",
                    type: "doughnut",
                    dataPoints: [
                        { label: "HT", y: (HT_count / rows.length) * 100 },
                        { label: "BT", y: (BT_count / rows.length) * 100 },
                        { label: "TBT", y: (TBT_count / rows.length) * 100 },
                    ]
                }
            ]
        }

        const bar_before = {
            exportEnabled: true,
            width: 500,
            title: {
                text: "Qualité Entrante"
            },

            axisY: {
                title: "Pourcentage",
                prefix: "%",
                includeZero: false
            },


            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc .
                    yValueFormatString: "##,##%",
                    type: "doughnut",
                    dataPoints: [
                        { label: "HT", y: (HT_before_count / rows.length) * 100 },
                        { label: "BT", y: (BT_before_count / rows.length) * 100 },
                        { label: "TBT", y: (TBT_before_count / rows.length) * 100 },
                    ]
                }
            ]
        }


        const range_p1 = {
            
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du Bpl en poste P1"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                minimum: 50,
                interval: 5,
                title: "Pourcentage du BPL",
                suffix: "%"
            },
            data: [{
                

                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Sortie: {y[1]} %<br/> Entrée: {y[0]} %",
                dataPoints: Bpl_range_p1
            }]
        }
        const range_p2 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du Bpl en poste P2"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                minimum: 50,
                interval: 5,
                title: "Pourcentage du BPL",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Sortie: {y[1]} %<br/> Entrée: {y[0]} %",
                dataPoints: Bpl_range_p2
            }]
        }
        const range_p3 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du Bpl en poste P3"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                minimum: 50,
                interval: 5,
                title: "Pourcentage du BPL",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Sortie: {y[1]} %<br/> Entrée: {y[0]} %",
                dataPoints: Bpl_range_p3
            }]
        }

        const MgO_p1 = {
            
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du MgO en poste P1"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                
                interval: 1,
                title: "Pourcentage du MgO",
                suffix: "%"
            },
            data: [{
                

                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: MgO_range_p1
            }]
        }
        const MgO_p2 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du MgO en poste P2"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                 
                interval: 1,
                title: "Pourcentage du MgO",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: MgO_range_p2
            }]
        }
        const MgO_p3 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du MgO en poste P3"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                
                interval: 1,
                title: "Pourcentage du MgO",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: MgO_range_p3
            }]
        }

        const CO2_p1 = {
            
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du CO2 en poste P1"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                
                interval: 2,
                title: "Pourcentage du CO2",
                suffix: "%"
            },
            data: [{
                

                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: CO2_range_p1
            }]
        }
        const CO2_p2 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du CO2 en poste P2"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                
                interval: 2,
                title: "Pourcentage du CO2",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: CO2_range_p2
            }]
        }
        const CO2_p3 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "La variation du CO2 en poste P3"
            },
            axisX: {
                valueFormatString: "DD"
            },
            axisY: {
                
                interval: 2,
                title: "Pourcentage du CO2",
                suffix: "%"
            },
            data: [{
                type: "rangeColumn",
                indexLabel: "{y[#index]}%",
                xValueFormatString: "D MMM",
                toolTipContent: "<strong>{x}</strong></br><strong>Mode: {label}</strong></br> Entrée: {y[0]} %<br/> Sortie: {y[1]} %",
                dataPoints: CO2_range_p3
            }]
        }

        return (
            <GridWrapper>

                <h1>Suivi du Processus de Flottation du Phosohate :</h1>
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
                        {result != '' && !isEpingled && (<Button

                            onClick={this.handleEpingler.bind(this)}
                            size="large"
                            type="primary"
                            style={{ marginBottom: 16, marginLeft: 10 }}
                        >
                            Épingler
        </Button>)}
                        {this.state.isEpingled && (
                            <Button
                                size="large"
                                type="info"
                                style={{ marginBottom: 16, marginLeft: 10 }}

                                onClick={this.handlebackClick.bind(this)}>

                                Désépingler
</Button>)}

                    </Col>
                </Row>
                <div style={{ marginTop: 40 }}>
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

                {result == '' ? null : <div style={{ display: "block" }}>
                    <label style={{ marginLeft:30,marginTop: 60, fontSize: 20, textDecoration: "underline" }}>Le Gain en BPL(Bone Phosphate Lime) enregistré pour chaque poste :</label>
                    <div style={{ marginTop: 20 }}>
                        <CanvasJSChart options={optionss}

                        />

                    </div>
                    <label style={{ marginLeft:30, marginTop: 60, fontSize: 20, textDecoration: "underline" }}>Aperçu sur la qualité entrante et sortante du Phosphate dans le processus :</label>
                    <div style={{ marginTop: 60 }}>
                        <div style={{ width: "40%", float: 'left' }}>
                            <CanvasJSChart options={bar_before} />


                        </div>
                        <div style={{ width: "40%", float: 'right', marginRight: 70 }}>
                            <CanvasJSChart options={bar_after} />


                        </div>
                    </div>
                    <label style={{marginLeft:30, marginTop: 60, fontSize: 20, textDecoration: "underline" }}>Le suivi de la variation du pourcentage du BPL dans le processus pour chaque poste :</label>
                    <div style={{
                        marginTop: 20, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={range_p1}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={range_p2}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={range_p3}

                        />
                    </div>
                    <label style={{ marginLeft:30,marginTop: 60, fontSize: 20, textDecoration: "underline" }}>Le suivi de la variation du pourcentage du CO2 dans le processus pour chaque poste :</label>
                    <div style={{
                        marginTop: 20, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={CO2_p1}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={CO2_p2}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={CO2_p3}

                        />
                    </div>

                    <label style={{ marginLeft:30,marginTop: 60, fontSize: 20, textDecoration: "underline" }}>Le suivi de la variation du pourcentage du MgO dans le processus pour chaque poste :</label>
                    <div style={{
                        marginTop: 20, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={MgO_p1}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={MgO_p2}

                        />
                    </div>
                    <div style={{
                        marginTop: 60, float: "left",
                        clear: "left", width: "100%"
                    }}>
                        <CanvasJSChart options={MgO_p3}

                        />
                    </div>



                </div>}

            </GridWrapper >)
    }
}
export default suivie_flottation