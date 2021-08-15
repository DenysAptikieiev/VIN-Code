import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    list-style: none;
    cursor: pointer;
`;

const ListItems = () => {
    const { codes } = this.props;
    // eslint-disable-next-line array-callback-return
    const elements = codes.map((item, i) => {
        if (i < 5) return (<ListItem key={item.id}>{item.vin}</ListItem>)
    })
    return (
        <>
            {elements}
        </>
    )
}

export default ListItems;