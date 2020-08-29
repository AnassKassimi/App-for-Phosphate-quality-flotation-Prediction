import React, { Component } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
const GridWrapper = styled.div`
font-family: 'Roboto';
  grid-gap: 10px;
  position:absolute;
  margin-top: 6em;
  margin-left: 19em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
class optimisations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            formData: {
                BPL_entrant: '',
                MgO_entrant: '',
                CO2_entrant: '',
                Cd_entrant: '',
                BPL_sortant: '',
                MgO_sortant: '',
                CO2_sortant: '',


            },
            result: '',

        };
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var formData = this.state.formData;
        formData[name] = value;


        this.setState({
            formData,

        });
    }

    handlePredictClick = (event) => {
        const formData = this.state.formData;
        this.setState({ isLoading: true });
        fetch('/prediction/optimisations',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    result: response.result,
                    isLoading: false
                });
            });

    }

    handleCancelClick = () => {
        const formData = {
            BPL_entrant: '',
            MgO_entrant: '',
            CO2_entrant: '',
            Cd_entrant: '',
            BPL_sortant: '',
            MgO_sortant: '',
            CO2_sortant: '',


        }
        this.setState({
            formData: formData,
            result: ''
        })
    }



    render() {
        const isLoading = this.state.isLoading;
        const formData = this.state.formData;
        const result = this.state.result;


        return (
            <GridWrapper>

                <div className="form-wrapper">
                    <h5>Qualité Phosphate Entrant :</h5>
                    <form style={{ marginTop: 20, }}>

                        <div className="input">
                            <label htmlFor="BPL_entrant">BPL Entrant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="BPL_entrant"
                                value={formData.BPL_entrant}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="MgO_entrant">MgO Entrant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="MgO_entrant"
                                value={formData.MgO_entrant}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="CO2_entrant">CO2 Entrant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="CO2_entrant"
                                value={formData.CO2_entrant}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="Cd_entrant">Cd Entrant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="Cd_entrant"
                                value={formData.Cd_entrant}
                                onChange={this.handleChange}
                            />
                        </div>
                    </form>
                    <h5 style={{ marginTop: 30, }}>Qualité du Phosphate Souhaitant Atteindre :</h5>
                    <form style={{ marginTop: 20, }}>

                        <div className="input">
                            <label htmlFor="BPL_sortant">BPL Sortant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="BPL_sortant"
                                value={formData.BPL_sortant}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="MgO_sortant">MgO Sortant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="MgO_sortant"
                                value={formData.MgO_sortant}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="CO2_sortant">CO2 Sortant :</label>
                            <input
                                type="number"
                                step="0.1"
                                name="CO2_sortant"
                                value={formData.CO2_sortant}
                                onChange={this.handleChange}
                            />
                        </div>



                        <form style={{ marginTop: 30, }} className="buttons">
                            <div className="predict">
                                <Button size="large" disabled={isLoading || !this.state.formData.BPL_entrant || !this.state.formData.MgO_entrant || !this.state.formData.CO2_entrant || !this.state.formData.Cd_entrant || !this.state.formData.BPL_sortant || !this.state.formData.MgO_sortant || !this.state.formData.CO2_sortant} type="submit" onClick={!isLoading ? this.handlePredictClick : null}>{isLoading ? 'En cours' : 'Optimiser'}</Button>
                            </div>
                            <div className="reset">
                                <Button
                                    size="large"
                                    variant="danger"
                                    disabled={isLoading}
                                    onClick={this.handleCancelClick}>
                                    Réinitialiser optimisation
                </Button>

                            </div>
                        </form>

                    </form>
                </div>
                {result === '' ? null :
                    (<div className="form-wrapper" style={{ backgroundColor: "#519e8a" }}>
                        <h5>Optimisations :</h5>
                        <form >
                            <div className="output" >
                                <label htmlFor="Débit_phosphate_brut_CV001">Débit Phosphate Brut en CV001 :</label>
                                <output>{result[0]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Densité_PK03">Densité en PK03 :</label>
                                <output>{result[1]}</output>
                            </div>
                            <div className="output">
                                <label htmlFor="Pression_PK03">Pression en PK03 :</label>
                                <output>{result[2]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Densité_PK04">Densité en PK04 :</label>
                                <output>{result[3]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Dilution_HP04">Dilution en HP04 :</label>
                                <output>{result[4]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Pression_PK004">Pression en PK004 :</label>
                                <output>{result[5]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Densité_PK05">Densité en PK05 :</label>
                                <output>{result[6]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Dilution_HP05">Dilution en HP05 :</label>
                                <output>{result[7]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Pression_PK05">Pression en PK05 :</label>
                                <output>{result[8]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_1">Debit air cell 1 :</label>
                                <output>{result[9]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_2">Debit air cell 2 :</label>
                                <output>{result[10]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_3">Debit air cell 3 :</label>
                                <output>{result[11]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_4">Debit air cell 4 :</label>
                                <output>{result[12]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_5">Debit air cell 5 :</label>
                                <output>{result[13]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_6">Debit air cell 6 :</label>
                                <output>{result[14]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Debit_air_cell_7">Debit air cell 7 :</label>
                                <output>{result[15]}</output>

                            </div>
                            <div className="output">
                                <label htmlFor="Pression_PK23">Pression en PK23 :</label>
                                <output>{result[16]}</output>

                            </div>

                        </form>

                    </div>)
                }




            </GridWrapper>
        );
    }
}
export default optimisations;