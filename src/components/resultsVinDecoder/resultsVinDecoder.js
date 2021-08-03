/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import styled from 'styled-components';

const DecoderValueBlock = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    height: 100vh;
`;

const Values = styled.div`
    align-self: center;
    width: 100%;
    ${'' /* border: 1px solid; */}
    span {
        display: block;
        ${'' /* max-width: 200px; */}
        border-bottom: 1px solid;
        padding: 5px;
        box-sizing: border-box;

        &:nth(odd) {
            background: grey;
        }
    }
`;
export default class ResultVinDecoder extends Component {
    render() {
        const { codes } = this.props;

        const element = codes.map(item => {
            return (
                <span
                    key={item.VariableId}
                >
                    {item.Variable || 'No data'}: {item.Value || 'No data'}
                </span>
            )
        });
        const make = codes.map(item => { if (item.Variable === "Make") return item.Value });
        const model = codes.map(item => { if (item.Variable === "Model") return item.Value });
        return (
            <DecoderValueBlock>
                <h2>{make} {model}</h2>
                <Values>{element}</Values>
            </DecoderValueBlock>
        )
    }
};
