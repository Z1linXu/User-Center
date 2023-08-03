import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {Alert,  message,  Tabs} from 'antd';
import React, { useState } from 'react';
import {FormattedMessage, history, Link, SelectLang, useIntl, useModel} from 'umi';
import styles from './index.less';
import {MY_WEB, SYSTEM_LOGO} from "@/pages/constant";


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({ ...values, type });
      if (user) {
        const defaultLoginSuccessMessage = 'Login successful！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }

      // 如果失败去设置用户错误信息
      setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again!',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="User Center"
          subTitle="User-Centric Solutions for Your Needs"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab='Sign In'
            />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content='Account or userPassword incorrect'
            />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder='Please enter your account'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="Please enter your account"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='userPassword'

                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="Please enter your userPassword."
                      />
                    ),
                  },
                  {
                    min:8,
                    type:'string',
                    message: 'length can not smaller than 8',
                  },
                ]}
              />
            </>
          )}
          <Link to="/user/register">Sign Up </Link>
          <div
            style={{
              marginBottom: 12,
              float: 'right',
            }}
          >
            <a
              href={MY_WEB}
              target="_blank"
              rel="noreferrer"
            >
              Forgot password
            </a>
          </div>


        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
