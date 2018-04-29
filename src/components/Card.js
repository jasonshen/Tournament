import React from 'react';
import styled, { css } from 'styled-components';
import media from './media';

const Card = ({
    matchStatus,
    showViolation,
    handleClick,
    error,
    reportSuccess
}) => {
    return (
        <Container>
            {reportSuccess || error}
            <MatchPercent>{matchStatus.percent_match}% Match!</MatchPercent>

            <Image src={matchStatus.location} />

            <ReportButton onClick={handleClick}>Report Match!</ReportButton>
        </Container>
    );
};

export default Card;

const matchColor = {
    low: '#ADD8E6',
    mid: '#98FB98',
    high: '#ff7f7f'
};

const Container = styled.figure`
    display: grid;
    box-shadow: -4px 4px 6px lightGrey;
    border: 1px solid lightGrey;
    padding: 1em;
    margin: 2em 6em 0 6em;
    background: white;
`;

const MatchPercent = styled.h2`
    font-size: 3em;
    text-align: center;
`;

const Image = styled.img`
    text-align: center;
    display: block;
    margin: 0 auto;
`;

const ReportButton = styled.button`
    font-size: 1em;
    margin 20px;
    border-radius: 10px;
    color: #ECECEB;
    background: #F9A828;
    padding: 10px 20px 10px 20px;
`;
