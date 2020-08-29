import React, { Component } from 'react';
import {Button} from 'antd';
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
class prediction_unaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formData: {
        BPL_entrant: null,
        MgO_entrant: null,
        CO2_entrant: null,
        Cd_entrant: null,
        Débit_phosphate_brut_CV001: null,
        Densité_PK03: null,
        Pression_PK03: null,
        Densité_PK04: null,
        Dilution_HP04: null,
        Pression_PK004: null,
        Densité_PK05: null,
        Dilution_HP05: null,
        Pression_PK05: null,
        Debit_air_cell_1: null,
        Debit_air_cell_2: null,
        Debit_air_cell_3: null,
        Debit_air_cell_4: null,
        Debit_air_cell_5: null,
        Debit_air_cell_6: null,
        Debit_air_cell_7: null,
        Pression_PK23: null,

      },
      result: ''
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('/prediction/',
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
        Débit_phosphate_brut_CV001: '',
        Densité_PK03: '',
        Pression_PK03: '',
        Densité_PK04: '',
        Dilution_HP04: '',
        Pression_PK004: '',
        Densité_PK05: '',
        Dilution_HP05: '',
        Pression_PK05: '',
        Debit_air_cell_1: '',
        Debit_air_cell_2: '',
        Debit_air_cell_3: '',
        Debit_air_cell_4: '',
        Debit_air_cell_5: '',
        Debit_air_cell_6: '',
        Debit_air_cell_7: '',
        Pression_PK23: '',

      


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
          <h5>Paramètres et Variables d'entrée :</h5>
          <form style={{ marginTop: 20 }}>
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
              <label htmlFor="Cd_entrant">Cd Entrant :</label>
              <input
                type="number"
                step="0.1"
                name="Cd_entrant"
                value={formData.Cd_entrant}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Débit_phosphate_brut_CV001">Débit Phosphate Brut en CV001 :</label>
              <input
                type="number"
                step="0.1"
                name="Débit_phosphate_brut_CV001"
                value={formData.Débit_phosphate_brut_CV001}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Densité_PK03">Densité en PK03 :</label>
              <input
                type="number"
                step="0.1"
                name="Densité_PK03"
                value={formData.Densité_PK03}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Pression_PK03">Pression en PK03 :</label>
              <input
                type="number"
                step="0.1"
                name="Pression_PK03"
                value={formData.Pression_PK03}
                onChange={this.handleChange}

              />
            </div>
            <div className="input">
              <label htmlFor="Densité_PK04">Densité en PK04 :</label>
              <input
                type="number"
                step="0.1"
                name="Densité_PK04"
                value={formData.Densité_PK04}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Dilution_HP04">Dilution en HP04 :</label>
              <input
                type="number"
                step="0.1"
                name="Dilution_HP04"
                value={formData.Dilution_HP04}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Pression_PK004">Pression en PK004 :</label>
              <input
                type="number"
                step="0.1"
                name="Pression_PK004"
                value={formData.Pression_PK004}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Densité_PK05">Densité en PK05 :</label>
              <input
                type="number"
                step="0.1"
                name="Densité_PK05"
                value={formData.Densité_PK05}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Dilution_HP05">Dilution en HP05 :</label>
              <input
                type="number"
                step="0.1"
                name="Dilution_HP05"
                value={formData.Dilution_HP05}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Pression_PK05">Pression en PK05 :</label>
              <input
                type="number"
                step="0.1"
                name="Pression_PK05"
                value={formData.Pression_PK05}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_1">Debit air cell 1 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_1"
                value={formData.Debit_air_cell_1}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_2">Debit air cell 2 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_2"
                value={formData.Debit_air_cell_2}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_3">Debit air cell 3 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_3"
                value={formData.Debit_air_cell_3}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_4">Debit air cell 4 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_4"
                value={formData.Debit_air_cell_4}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_5">Debit air cell 5 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_5"
                value={formData.Debit_air_cell_5}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_6">Debit air cell 6 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_6"
                value={formData.Debit_air_cell_6}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Debit_air_cell_7">Debit air cell 7 :</label>
              <input
                type="number"
                step="0.1"
                name="Debit_air_cell_7"
                value={formData.Debit_air_cell_7}
                onChange={this.handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Pression_PK23">Pression en PK23 :</label>
              <input
                type="number"
                step="0.1"
                name="Pression_PK23"
                value={formData.Pression_PK23}
                onChange={this.handleChange}
              />
            </div>
            <form className="buttons">
              <div className="predict">
                <Button size="large" disabled={isLoading || !this.state.formData.BPL_entrant || !this.state.formData.MgO_entrant || !this.state.formData.CO2_entrant || !this.state.formData.Cd_entrant || !this.state.formData.Débit_phosphate_brut_CV001 || !this.state.formData.Debit_air_cell_1 || !this.state.formData.Debit_air_cell_2 || !this.state.formData.Debit_air_cell_3 || !this.state.formData.Debit_air_cell_4 || !this.state.formData.Debit_air_cell_5 || !this.state.formData.Debit_air_cell_6 || !this.state.formData.Debit_air_cell_7 || !this.state.formData.Pression_PK004 || !this.state.formData.Pression_PK03 || !this.state.formData.Pression_PK05 || !this.state.formData.Pression_PK23 || !this.state.formData.Densité_PK03 || !this.state.formData.Densité_PK04 || !this.state.formData.Densité_PK05 || !this.state.formData.Dilution_HP04 || !this.state.formData.Dilution_HP05} type="submit" onClick={!isLoading ? this.handlePredictClick : null}>{isLoading ? 'En cours' : 'Prédire'}</Button>
              </div>
              <div className="reset">
                <Button
                  size="large"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Réinitialiser prédiction
                </Button>

              </div>
            </form>

          </form>
        </div>
        {result === '' ? null :
          (<div className="form-wrapper" style={{ backgroundColor: "#519e8a" }}>
            <h5>Prédictions :</h5>
            <form >
              <div className="input">
                <label htmlFor="BPL_sortant">BPL Sortant :</label>
                <output>{result[0]}</output>

              </div>
              
              <div className="input">
                <label htmlFor="CO2_sortant">CO2 Sortant :</label>
                <output>{result[1]}</output>

              </div>
              <div className="input">
                <label htmlFor="MgO_sortant">MgO Sortant :</label>
                <output>{result[2]}</output>
              </div>
            </form>

          </div>)
        }




      </GridWrapper>
    );
  }
}
export default prediction_unaire;