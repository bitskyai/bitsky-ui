/**
 *
 * CardPageCmp
 *
 */

import { Card } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
// import BitSkyFooter from '../Footer';

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { darkBlueColor, midBlueColor } from '../../styleVariables';

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
        <div style={{ padding: '10px 50px' }}>
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
