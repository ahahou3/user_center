import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '老王出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ahahou3',
          blankTarget: true,
        },
        {
          key:'备案号',
          title:'闽ICP备2024055721号-1',
          href:'https://beian.miit.gov.cn',
          blankTarget: true,
        }
      ]}
    />
  );
};
export default Footer;
