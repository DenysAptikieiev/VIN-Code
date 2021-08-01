import React, {Component} from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    list-style: none;
`;

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const {codes} = this.props;
           const elements = codes.map((item, i) => {
               if(i < 5) return(<ListItem key={item.id}>{item.vin}</ListItem>)
            })
            return (
               <>
                    {elements}
               </>
            )
    }
}