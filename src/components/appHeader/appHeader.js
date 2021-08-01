import React, {Component} from 'react';
import styled from 'styled-components';

const SectionForm = styled.section`
    margin-bottom: 100px;
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;

    input, button {
        border: none;
    }

    input {
        width: 442px;
        height: 52px;
        background: transparent;
        border: 1px solid #fff;
        border-right: none;
        box-sizing: border-box;
        &::placeholder {
            padding-left: 15px;
            color: #fff;
        }
    }

    button {
        width: 100px;
        height: 52px;
        background: lightblue;
        border: 1px solid #fff;
        box-sizing: border-box;
    }
`;

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.changeValue = this.changeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    changeValue(event) {
        this.setState(({value}) => {
            const newValue = event.target.value;
            return {
                value: newValue,
            }
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.value)
        this.setState({
            value: '',
        })
    }
   render() {
    return (
        <SectionForm>
            <Form onSubmit={this.onSubmit}>
                <input 
                    type="text" 
                    value={this.state.value}
                    placeholder="Place write your vin" 
                    onChange={this.changeValue}
                />
                <button>Check</button>
            </Form>
        </SectionForm>
    )
   }
}