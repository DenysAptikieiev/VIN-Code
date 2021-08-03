/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import styled from 'styled-components';

import vinValidator from 'vin-validator';
import iconInfo from './icons/info-icon.svg'
import find from './icons/find.svg'

const flexCenter = `
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SectionForm = styled.section`
    position: relative;
    ${flexCenter};
    flex-direction: column;
    ${'' /* margin-bottom: 70px; */}
`;

const BlockInfo = styled.div`
    position: relative;
    ${flexCenter};
    margin: 100px auto;
    h1 {
        font-size: 24px;
    }
    span {
        cursor: pointer;
        width: 25px;
        height: 25px;
        margin-left: 10px;
        border-radius: 50%;
        border: none;
        background: url(${iconInfo}) center / cover;
    }

    .info-table {
        position: absolute;
        left: -67px;
        background: #fff;
        width: 300px;   
        padding: 5px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
        display: ${props => props.info ? 'block' : 'none'};
        .triangle {
            position: absolute;
            top: calc(54% - 15px);
            right: -8px;
            background: white;
            box-shadow: 0 -5px 10px -3px rgb(64 60 67 / 16%);
            width: 15px;
            height: 15px;
            transform: rotate(45deg);
        }
    }

    @media(min-width: 280px) and (max-width: 530px) {
        .info-table {
            top: -61px;
            left: -1px;
            width: 227px;
            z-index: 2;
            .triangle {
                top: calc(40% - 15px);
            }
        }
    }
`;


const Form = styled.form`
    ${flexCenter};
    
    @media(min-width: 280px) and (max-width: 530px) {
        input {
            max-width: 250px;
        }
    }
`;

const FindSection = styled.div`
    position: relative;
    
    display: flex;
    justify-content: space-between;
    min-width: 442px;
    height: 44px;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border: ${props => props.error ? '1px solid red' : '1px solid green'};

    button {
        position: absolute;
        top: 6px;
        right: 12px;
        width: 40px;
        background: transparent;
        border: none;
        cursor: pointer;
        &:focus,
        &:active {
            outline: none;
        }
    }
    @media(min-width: 280px) and (max-width: 530px) {
        min-width: 260px;
    }
`;

const BlockInput = styled.div`
    ${flexCenter};
`;

const Input = styled.div`
    input {
        font-size: 20px;
        padding-left: 15px;
        border: none;
        &:active,
        &:focus{
            outline: none;
        }
    }

    @media(min-width: 280px) and (max-width: 530px) {
        input {
            padding: 0;
        }
    }
`;

const BlockLastVin = styled.ul`
        ${flexCenter}
        flex-direction: column;
        background: #fff;
        position: absolute;
        top: 42px;
        right: 22px;

        max-width: 440px;
        margin: 0;
        padding: 0;

        box-shadow: 0 5px 5px 1px rgb(64 60 67 / 16%);
        border-radius: 0 0 20px 20px;
        display: ${props => props.lastValue ? 'block' : 'none'};

        @media(min-width: 280px) and (max-width: 530px) {
            width: 250px;
        }
`;

const ListItem = styled.li`
    display: ${props => props.lastValue ? 'block' : 'none'};
    list-style: none;
    ${flexCenter};
    padding: 5px;
    box-sizing: border-box;
`;

const IncorrectValidation = styled.div`
    position: absolute;
    top: -41px;
    left: 23px;
    display: ${props => props.error ? 'block' : 'none'};

    p {
        color: red;
        text-transform: uppercase;
    }
`;

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            lastValue: false,
            info: false,
        }
        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.additemForm = this.additemForm.bind(this);
        this.onToggleInfo = this.onToggleInfo.bind(this);
    }
    changeValue(event) {
        const newValue = event.target.value;
        const isValidVin = vinValidator.validate(newValue);
        const error = isValidVin ? false : true;
        this.setState(({ value }) => {
            return {
                value: newValue,
                error: error,
            }
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const value = this.state.value;
        const isValidVin = vinValidator.validate(value);
        if (!isValidVin) {
            this.setState({
                error: true,
                lastValue: false,
            })
        } else {
            this.props.onAdd(value)
        }
        this.setState({
            value: '',
        })
    }
    onFocus() {
        this.setState({
            lastValue: !this.state.lastValue,
        })
    }
    additemForm(e) {
        if(e.target.nodeName === 'INPUT') {
            this.setState({
                lastValue: true,
            })
        } else {
            this.setState({
                lastValue: false,
            })
        }
        if (e.target.classList.contains('list-item-vin')) {
            const value = e.target.outerText;
            this.setState({
                lastValue: !this.state.lastValue,
                value: value,
            })
            this.props.onAdd(value)
        }
    }
    onToggleInfo(e) {
        const target = e.target;
        if(target.className === 'info-span') {
            this.setState({
                info: !this.state.info,
            })
        } else {
            this.setState({
                info: false,
            })
        }
    }

    render() {
        const { codes } = this.props;
        // eslint-disable-next-line array-callback-return
        const lastVinItems = codes.map((item, i) => {
            if (i < 5) return (<ListItem
                key={item.id}
                lastValue={this.state.lastValue}
                value={item.vin}
                className="list-item-vin"
            >
                {item.vin}
            </ListItem>)
        })

        return (
            <SectionForm  onClick={this.additemForm} >
                <BlockInfo info={this.state.info} onClick={this.onToggleInfo}>
                    <h1>Find a VIN Code info</h1>
                    <span className="info-span"></span>
                    <div className="info-table" >
                        <div className="triangle"></div>
                            The car's vehicle identification number (VIN) is the identifying code
                            for a SPECIFIC automobile. The VIN serves as the car's fingerprint,
                            as no two vehicles in operation have the same VIN. A VIN is composed
                            of 17 characters (digits and capital letters) that act as a unique
                            identifier for the vehicle.
                        </div>
                </BlockInfo>
                <Form onSubmit={this.onSubmit} error={this.state.error} >
                    <FindSection error={this.state.error}>
                        <BlockInput>
                            <Input>
                                <input
                                    type="text"
                                    value={this.state.value}
                                    placeholder="Please enter VIN code"
                                    onChange={this.changeValue}
                                    onFocus={this.onFocus}
                                />
                            </Input>
                        </BlockInput>
                        <button className="find"><img src={find} alt="find" /></button>
                        <BlockLastVin lastValue={this.state.lastValue}>
                            {lastVinItems}
                        </BlockLastVin>
                        <IncorrectValidation error={this.state.error}>
                            <p>
                                Incorrect VIN code Check in correct
                            </p>
                        </IncorrectValidation>
                    </FindSection>
                </Form>
            </SectionForm>
        )
    }
}