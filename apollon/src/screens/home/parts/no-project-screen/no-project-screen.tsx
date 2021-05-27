import { Col, Row, Image, Space } from 'antd';
import React, { ReactElement } from 'react';
import Screen from '../../../../components/screen';
import illustration from '../../../../assets/select_project.svg';

const NoProjectScreen: React.FC = (): ReactElement => (
  <Screen>
    <Row style={{ height: '100%' }}>
      <Col style={{ height: '100%', width: '100%' }}>
        <Space
          direction="vertical"
          style={{
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Image src={illustration} preview={false} width={500} />
          <p style={{ color: '#141414' }}>
            You have no active project. You can select one by clicking on the
            sidebar or by creating a new one
          </p>
        </Space>
      </Col>
    </Row>
  </Screen>
);

export default NoProjectScreen;
