import React, { Component } from 'react';
import AppHeader from '../appHeader';
import ResultVinDecoder from '../resultsVinDecoder';

import styled from 'styled-components';
import nextId from 'react-id-generator';
import vinService from '../../services/vinService.js';

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 20px;  
  box-sizing: border-box;
  min-width: 280px;
  max-width: 1440px;
  height: 100vh;
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: strach;
  flex-direction: column;

`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateVin();
    this.state = {
      data: [
        { vin: '1HGCS1B8XBA006385', id: 1 },
        { vin: 'JN1AZ4EH7DM430111', id: 2 },
        { vin: '1FTFW1CT5DFC10312', id: 3 },
      ],
      vinDecoder: []
    }
    this.addItem = this.addItem.bind(this);
    this.updateVin = this.updateVin.bind(this);
  }

  vinService = new vinService();
  
  updateVin(vinCode = '1HGCS1B8XBA006385') {
    this.vinService.vehicleCharacteristics(vinCode)
        .then(data => {
            const result = data.Results;
            const variable = result.filter(item => {
                switch(item.Variable) {
                    case "Model": 
                        return item;
                    case "Make":
                        return item;
                    case "Model Year":
                        return item;
                    case "Body Class":
                        return item;
                    case "Transmission Style":
                        return item;
                    case "Transmission Speeds":
                        return item;
                    case "Gross Vehicle Weight Rating From":
                        return item;
                    case "Displacement (L)":
                        return item;
                    default:
                        return null;
                }
            });
            this.setState({
              vinDecoder: [...variable]
            })
        })
}
  addItem(body) {
    const newItem = {
      vin: body,
      id: nextId(),
    };
    this.setState(({ data }) => {
      const newData = [newItem, ...data ];
      return {
        data: newData,
      }
    })
    this.updateVin(body)
  }
  render() {
    const { data, vinDecoder } = this.state;
    // console.log('vinDecoder: ', vinDecoder);
    return (
      <Wrapper>
        
        {/* <LastVinCodes  /> */}
        <AppHeader onAdd={this.addItem} codes={data}/>
        <ResultVinDecoder codes={vinDecoder}/>
      </Wrapper>
    )
  }
}