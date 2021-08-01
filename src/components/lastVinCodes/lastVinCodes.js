import React, { Component } from 'react';
import styled from 'styled-components';
import ListItems from '../listItems';
    
const LastVinCodeSection = styled.section`
    margin: 0 auto;
    text-align: center;
    margin-bottom: 100px;

`;
const UnoderList = styled.ul`
    margin: 0;
    padding: 0;
`;

export default class LastVinCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { codes } = this.props;
        return (
            <LastVinCodeSection>
                <h2>Last VIN Codes</h2>
                <UnoderList>
                    <ListItems codes={codes} />
                </UnoderList>
            </LastVinCodeSection>
        )
    }
}