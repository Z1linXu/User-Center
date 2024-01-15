import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
//import { useIntl } from 'umi';

const Footer: React.FC = () => {
  //const intl = useIntl();
  const defaultMessage = 'Produced by Zilin Xu';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Zilin Xu',
          title: 'Zilin Xu',
          href: 'http://www.zilinxu.com/',
          blankTarget: true,
        },
        {
          key: 'User Center',
          title: 'User Center',
          href: 'http://user.zilinxu.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined />Zilin Xu Github</>,
          href: 'https://github.com/Z1linXu/user-center',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
