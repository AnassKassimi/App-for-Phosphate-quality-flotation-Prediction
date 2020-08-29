import React from 'react';
import styled from 'styled-components';
import Excelpage from "../Components/Excelpage";
import "antd/dist/antd.css"
const Wrapper = styled.div`
font-family: 'Roboto';


  grid-gap: 10px;
  margin-top: 6em;
  margin-left: 16em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
export const multi_predictions = (props) => (
    <Wrapper>

        <Excelpage />

    </Wrapper>
)