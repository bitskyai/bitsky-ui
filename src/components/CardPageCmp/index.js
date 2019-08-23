/**
 *
 * CardPageCmp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
// import DiaFooter from '../DiaFooter';
import { midBlueColor, darkBlueColor } from '../../styleVariables';

const CardFooter = styled.div`
  color: ${darkBlueColor};
  background-color: ${midBlueColor};
  height: 60px;
  text-align: center;
`;

function CardPageCmp({ cardTitle, cardContent, cardFooter }) {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Card
        style={{
          border: 'none',
          width: '500px',
          margin: '0 auto',
          boxShadow: '0 20px 40px rgba(38, 153, 251, 0.2)',
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div style={{ padding: '40px 50px 10px 50px' }}>
          <h2
            style={{
              color: darkBlueColor,
              textAlign: 'center',
              paddingBottom: '10px',
            }}
          >
            {cardTitle}
          </h2>
          {cardContent}
        </div>
        <CardFooter>{cardFooter}</CardFooter>
      </Card>
    </div>
  );
}

CardPageCmp.propTypes = {
  cardTitle: PropTypes.string,
  cardContent: PropTypes.element,
  cardFooter: PropTypes.element,
};

export default CardPageCmp;
