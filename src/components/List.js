import React from 'react';
import CardContainer from './CardContainer';

const List = ({ data, isSearching }) => {
    const displayResults = data.map((result, i) => {
        return <CardContainer key={result.location} matchStatus={result} />;
    });
    return <div>{displayResults}</div>;
};

export default List;

List.defaultProps = {
    data: []
};
