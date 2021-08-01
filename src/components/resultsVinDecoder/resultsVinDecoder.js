import React, { Component } from 'react';
import styled from 'styled-components';
import vinService from '../../services/vinService.js'

const DecoderValue = styled.section`
    margin: 0 auto;
    h1 {
        text-align: center;
    }
    p {
        span {
            display: block;
        }
    }
`;
export default class ResultVinDecoder extends Component {
    constructor(props) {
        super(props);
        this.updateVin()
        this.state = {
            make: null,
            model: null,
            modelYear: null,
            bodyClass: null, 
            transmissionValue: null,
            transmissionSpeed: null,
            grossVehicleWeightRatingFrom: null, //weight
            displacementLiters: null, //Engine(m3)

        }
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
                            break;
                        case "Make":
                            return item;
                            break;
                        case "Model Year":
                            return item;
                            break;
                        case "Body Class":
                            return item;
                            break;
                        case "Transmission Style":
                            return item;
                            break;
                        case "Transmission Speeds":
                            return item;
                            break;
                        case "Gross Vehicle Weight Rating From":
                            return item;
                            break;
                        case "Displacement (L)":
                            return item;
                            break;
                        default:
                            return null;
                            break;
                    }
                });

                const values = variable.map(item => item.Value);

                this.setState({
                    make: values[0],
                    model: values[1],
                    modelYear: values[2],
                    bodyClass: values[3], 
                    transmissionValue: values[5],
                    transmissionSpeed: values[6],
                    grossVehicleWeightRatingFrom: values[4], //weight
                    displacementLiters: values[7], 
                })
            })
    }
    render() {
        const { 
            make, 
            model, 
            modelYear, 
            bodyClass,  
            transmissionValue,
            transmissionSpeed, 
            grossVehicleWeightRatingFrom, 
            displacementLiters
        } = this.state;
        return (
            <DecoderValue>
                <h1>Result Decoder</h1>
                <p>
                    <span>Mark: {make}</span>
                    <span>Model: {model}</span>
                    <span>Year: {modelYear}</span>
                    <span>Body Type: {bodyClass}</span>
                    <span>Transmission Type: {transmissionValue}</span>
                    <span>Transmission Speed: {transmissionSpeed}</span>
                    <span>Weight: {grossVehicleWeightRatingFrom}</span>
                    <span>Engine: {displacementLiters}m3</span>
                </p>
            </DecoderValue>
        )
    }
}