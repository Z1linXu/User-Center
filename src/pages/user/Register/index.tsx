import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import {FormattedMessage, history, Link, SelectLang, useIntl} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO} from "@/pages/constant";





const Register: React.FC = () => {
    const [type, setType] = useState<string>('account');

    const intl = useIntl();



    const handleSubmit = async (values: API.RegisterParams) => {
      const {userPassword, checkPassword }= values;
      //Validation
      if(userPassword !==checkPassword)
      {
        message.error('The passwords do not match.')
        return;
      }
      try {
        // Register
        const id = await register(values);
        if (id) {
          const defaultLoginSuccessMessage = 'Account created！';
          message.success(defaultLoginSuccessMessage);

          /** 此方法会跳转到 redirect 参数所在的位置 */
          if (!history) return;
          const { query } = history.location;
          history.push({
            pathname:'/user/login',
            query,
          });
          return;
        }
      } catch (error: any) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.failure',
          defaultMessage: 'Login failed, please try again!',
        });
        message.error(defaultLoginFailureMessage);
      }
    };
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm

          submitter={{
            searchConfig: {
              submitText: 'Register'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="User Center"
          subTitle="User-Centric Solutions for Your Needs"

          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab='Sign Up'
            />

          </Tabs>
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
                  {
                    min:4,
                    type:'string',
                    message: 'length can not smaller than 4',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='Password'

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
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder='Please confirm your userPassword.'

                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="Please confirm your userPassword."
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
              <ProFormText
                name="serialNumber"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder='Please enter your serialNumber'
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.serialNumber.required"
                        defaultMessage="Please enter your Serial number"
                      />
                    ),
                  },
                  {
                    max:5,
                    type:'string',
                    message: 'length can not bigger than 5',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 12,
              float: 'right',
            }}
          >
            <Link to="/user/login">Sign In </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
