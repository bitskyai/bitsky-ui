/**
 *
 * DiaFooter
 *
 */

import { Col, Icon, Layout, Row, Typography } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darkBlueColor, maxWidth, whiteColor } from '../../styleVariables';

const { Text } = Typography;
const { Footer } = Layout;

const RightContainer = styled.div`
  float: right;
`;

const iconStyle = {
  color: whiteColor,
  fontSize: '16px',
  padding: '0 15px',
};

function DiaFooter() {
  return (
    <div>
      <Footer style={{ backgroundColor: `${darkBlueColor}` }}>
        <Row style={{ maxWidth: `${maxWidth}px`, margin: '0 auto' }}>
          <Col span={6}>
            <Text style={{ color: whiteColor }}>
              {formatMessage({ id: 'app.components.DiaFooter.productName' })}
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
