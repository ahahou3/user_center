import { Footer } from '@/components';
import { register} from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined,} from '@ant-design/icons';
import { LoginForm, ProFormText, ProFormSelect} from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import {Tabs, message, Divider, Space} from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';
import {SYSTEM_LOGO} from "@/constants/indext";
import {Link} from "@@/exports";
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword}= values;
    //校验
    if(userPassword !== checkPassword){
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const id = await register({
        ...values,
        type,
      });
      if (id > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        history.push({
          pathname:'/user/login',
          urlParams,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log("error = ", error)
      message.error(error.message?? defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '开始暴富'
            }
          }}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="Bao FU"
          subTitle={'准备暴富的家伙们'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '注册 Register',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入用户名 Account'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！Account is Required',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码 Password'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！Password is Required',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能小于 8 Cannot shorter than 8 character',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请重复输入密码 Repeat Password'}
                rules={[
                  {
                    required: true,
                    message: '重复密码是必填项！Repeat Password is Required',
                  },
                  {
                    min: 8,
                    type: "string",
                    message: '密码长度不能小于 8 Cannot shorter than 8 character',
                  },
                ]}
              />
              <Space split={<Divider type="vertical"/>}>
                <ProFormSelect
                  width="xs"
                  options={[
                    {
                      value: '0',
                      label: '男 Male',
                    },
                    {
                      value: '1',
                      label: '女 Female',
                    },
                    {
                      value: '2',
                      label: '不想告诉你 Dont wanna tell ',
                    },
                  ]}
                  rules={[
                    {
                      required: true,
                      message: '性别是必填项！Gender is Required',
                    },
                  ]}
                  name="gender"
                  label="性别 Gender"
                />
                  <Link to="/user/login">已有账号？请登录</Link>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                </a>
              </Space>
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
