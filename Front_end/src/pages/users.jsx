import React, { Component } from "react"
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd"
import { ExcelRenderer } from "react-excel-renderer"
import styled from 'styled-components';
const GridWrapper = styled.div`
font-family: 'Roboto';
  margin-top: 6em;
  margin-left: 19em;
  margin-right: 6em;
  display: flex;
  justify-content: center;
  flex-direction: column;
  }
  
`;



export default class users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: '',
            dataSource: [],
            columns: [
                {
                    title: "Name",
                    dataIndex: "Name",
                    ellipsis: true,

                },
                {
                    title: "Last Name",
                    dataIndex: "Last_name",
                    ellipsis: true,
                },
                {
                    title: "Email",
                    dataIndex: "Email",
                    ellipsis: true,
                },
                {
                    title: "Role",
                    dataIndex: "Role",
                    ellipsis: true,

                },
                {
                    title: "Created",
                    dataIndex: "Created",
                    ellipsis: true,
                },
                {
                    title: "",
                    dataIndex: "action",
                    render: (text, record) =>
                        record.Email && record.Email != 'admin'? (
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.Email)}
                            >
                                <a style={{ whiteSpace: "nowrap", textDecoration: "underline", color: "#0060B6", }}>Delete</a>

                            </Popconfirm>
                        ) : null
                }


            ],

        }
    }


    handleShow = () => {
        fetch("/prediction/users",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    permission: true
                })
            }).then(response => response.json())
            .then(response => {

                if (!response.error) {
                    console.log(response)
                    this.setState({
                        dataSource: response.result,
                        success: ''
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    handleDelete = email => {
        fetch("/prediction/users/delete",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: email
                })
            }).then(response => response.json())
            .then(response => {

                if (!response.error) {
                    console.log(response)
                    this.setState({
                        dataSource: response.result,
                        success: response.success
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {




        const columns = this.state.columns.map(col => { return col })
        const dataSource = this.state.dataSource
        const success = this.state.success


        return (
            <GridWrapper>
                <div style={{ marginTop: 50, }}>

                    <Button size="large" onClick={this.handleShow}>Show Application's Users</Button>


                    <div style={{ marginTop: 20, }}>
                        <div style={{ marginTop: 50, }}>
                            {dataSource === [] ? null :
                                <Table
                                    scroll={{ x: 'max-content' }}
                                    dataSource={dataSource}
                                    columns={columns}
                                />}
                        </div>
                        {
                            success === '' ? null : (<div style={{ marginTop: 20, }} id="success-alert">



                                <span className="success">{this.state.success}</span>

                            </div>)
                        }
                    </div>
                </div >
            </GridWrapper>
        )
    }
}