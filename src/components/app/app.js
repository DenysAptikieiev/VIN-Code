import React, { Component } from 'react';
import AppHeader from '../appHeader';
import LastVinCodes from '../lastVinCodes';
import ResultVinDecoder from '../resultsVinDecoder';
import styled from 'styled-components';
// import nextId from 'react-id-generator';
import nextId from 'react-id-generator';
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;  
  box-sizing: border-box;
  min-width: 280px;
  max-width: 1440px;
  height: 100vh;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: flex-start;
  align-items: strach;
  flex-direction: column;

`;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {vin: '1HGCS1B8XBA006385', id: 1},
                {vin: 'JN1AZ4EH7DM430111', id: 2},
                {vin: '1FTFW1CT5DFC10312', id: 3},
                {vin: '1FTFW1CT5DFC10312', id: 4},
                {vin: '1FTFW1CT5DFC10312', id: 5},
                {vin: '1FTFW1CT5DFC10312', id: 6},
                {vin: '1FTFW1CT5DFC10312', id: 7},
                {vin: '1FTFW1CT5DFC10312', id: 8},
                {vin: '1FTFW1CT5DFC10312', id: 9},
                {vin: '1FTFW1CT5DFC10312', id: 10},
            ],
        }
    }
  render() {
      const {data} = this.state;
    return (
      <Wrapper>
        <AppHeader />
        <LastVinCodes codes={data}/>
        <ResultVinDecoder />
      </Wrapper>
    )
  }
}