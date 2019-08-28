/**
 *
 * DiaFooter
 *
 */

import React from 'react';
import { Layout, Typography, Row, Col, Icon } from 'antd';
const { Text } = Typography;
const { Footer } = Layout;
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const RightContainer = styled.div`
  float: right;
`;

const iconStyle = {
  color: whiteColor,
  fontSize: '16px',
  padding: '0 15px',
};

import { darkBlueColor, maxWidth, whiteColor } from '../../styleVariables';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

function DiaFooter() {
  return (
    <div>
      <Footer style={{ backgroundColor: `${darkBlueColor}` }}>
        <Row style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
          <Col span={6}>
            <Text style={{ color: whiteColor }}>
              {formatMessage({ id: 'app.components.DiaFooter.productName'})}
            </Text>
          </Col>
          <Col span={18}>
            <RightContainer>
              <a href="#">
                <Icon type="twitter" style={iconStyle} />
              </a>
              <a href="#">
                <Icon type="github" style={iconStyle} />
              </a>
              <a href="#">
                <Icon type="facebook" style={iconStyle} />
              </a>
            </RightContainer>
          </Col>
        </Row>
      </Footer>
    </div>
  );
}

DiaFooter.propTypes = {};

export default DiaFooter;
