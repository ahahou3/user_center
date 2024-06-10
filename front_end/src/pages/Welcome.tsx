import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎来到暴富之家 Welcome to Rich People site
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            这是我做的第一个项目(v0.0.1)，功能正在逐步完善中。目前正在内测，如果有关于功能改善和体验提升的建议，直接微信私聊我。
          </p>
          <p
            style={{
              fontSize: '15px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom:32,
              width: '65%',
            }}
          >
            This my first personal project(v0.0.1), future functions are on the way. If you have any suggestion, please
            DM me.
          </p>
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            更新日志 Update Log
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            <p>- 现在注册页面可以返回登录页，并且注册页面要求选择性别 (14/May/2024)</p>
            <p>- Now you can return to login page from register page, and gender is required in register page
              (14/May/2024)</p>
            <p>- 现在管理员可以逻辑删除用户 (14/May/2024)</p>
            <p>- Now Admin user can logical delete normal user (14/May/2024)</p>
            <p>- 现在管理员可以修改用户的用户名，电话，邮箱，头像，性别，权限 (15/May/2024)</p>
            <p>- Now Admin user can update username, phone, email, avatar ,gender, privileges(15/May/2024)</p>
            <p>- 现在管理员可以通过用户名，账号，电话，邮箱，性别，账号状态，权限 检索用户 (17/May/2024)</p>
            <p>- Now Admin user can search user by username, user account, phone, email, gender, state, privileges (17/May/2024)</p>
            <p>- 原数据库过期，改用做过数据迁移的新数据库 (10/June/2024)</p>
            <p>- The original database has expired and has been replaced with a new database that has undergone data migration (10/June/2024)</p>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            {/*<InfoCard*/}
            {/*  index={1}*/}
            {/*  href="https://umijs.org/docs/introduce/introduce"*/}
            {/*  title="了解 umi"*/}
            {/*  desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"*/}
            {/*/>*/}
            {/*<InfoCard*/}
            {/*  index={2}*/}
            {/*  title="了解 ant design"*/}
            {/*  href="https://ant.design"*/}
            {/*  desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"*/}
            {/*/>*/}
            {/*<InfoCard*/}
            {/*  index={3}*/}
            {/*  title="了解 Pro Components"*/}
            {/*  href="https://procomponents.ant.design"*/}
            {/*  desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"*/}
            {/*/>*/}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
