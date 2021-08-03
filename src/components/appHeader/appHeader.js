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
    margin-bottom: 100px;
    position: relative;
    ${flexCenter};
    flex-direction: column;
`;

const BlockInfo = styled.div`
    ${flexCenter};
    h1 {
        font-size: 24px;
    }
    button {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        border-radius: 50%;
        border: none;
        background: url(${iconInfo}) center / cover;
    }
`;

const Form = styled.form`
    ${flexCenter};
    position: relative;
    input {
        border-radius: 20px;
        font-size: 20px;
        box-sizing: border-box;
    }

    input {
        width: 442px;
        height: 52px;
        background: transparent;
        border: ${props => props.error ? '1px solid red' : '1px solid'};
        padding-left: 15px;
        margin-right: 5px;
        z-index: 1;
        background: #fff;
        &:active,
        &:focus{
            outline: none;
        }
    }

    button {
        width: 50px;
        background: transparent;
        border: none;

        &:focus,
        &:active {
            outline: none;
        }
    }

    @media(min-width: 280px) and (max-width: 530px) {
        input {
            max-width: 250px;
        }
    }
`;

const BlockLastVin = styled.ul`
        ${flexCenter}
        flex-direction: column;
        position: relative;
        top: -34px;
        left: -28px;
        border: 1px solid;
        width: 440px;
        margin: 0;
        padding: 0;
        border-radius: 20px;
        padding-top: 44px;
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

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            lastValue: false,
        }
        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.additemForm = this.additemForm.bind(this);
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
        console.log();
        if (e.target.classList.contains('list-item-vin')) {
            const value = e.target.outerText;
            this.setState({
                lastValue: !this.state.lastValue,
                value: value,
            })
            this.props.onAdd(value)
        }
    }

    render() {
        const { codes } = this.props;
        // eslint-disable-next-line array-callback-return
        const lastVinItems = codes.map((item, i) => {
            if (i < 5) return (<ListItem
                key={item.id}
                lastValue={this.state.lastValue}
                onClick={this.additemForm}
                value={item.vin}
                className="list-item-vin"
            >
                {item.vin}
            </ListItem>)
        })

        return (
            <SectionForm>
                <BlockInfo>
                    <h1>Find a Vin Code info</h1>
                    <button></button>
                </BlockInfo>
                <Form onSubmit={this.onSubmit} error={this.state.error}>
                    <input
                        type="text"
                        value={this.state.value}
                        placeholder="Place write your vin"
                        onChange={this.changeValue}
                        onFocus={this.onFocus}
                    />
                    <button className=""><img src={find} alt="" /></button>
                </Form>
                <BlockLastVin lastValue={this.state.lastValue}>{lastVinItems}</BlockLastVin>
            </SectionForm>
        )
    }
}