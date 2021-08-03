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
        this.state = {
            data: [],
        }
    }
    vinService = new vinService();

    render() {
        const {codes} = this.props;
        const element = codes.map(item => {
            return(
                <span key={item.VariableId}>{item.Variable || 'No data'}: {item.Value || 'No data'}</span>
            )
        })
        return (
            <DecoderValue>
                <h2>Result Decoder</h2>
                <p>{element}</p>                    
            </DecoderValue>
        )
    }
}