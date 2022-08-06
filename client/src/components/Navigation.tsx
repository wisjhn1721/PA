import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  SecurityScanOutlined,
  ScanOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface NavigationProps {
  user: { [key: string]: string } | null;
  onLoggedIn: () => void;
}

const Navigation = ({ user, onLoggedIn }: NavigationProps) => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[currentRoute]}
      selectedKeys={[currentRoute]}
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item key="/badgescan" icon={<SecurityScanOutlined />}>
            <Link to="/badgescan">Scan Badge</Link>
          </Menu.Item>
          <Menu.Item key="/scans" icon={<ScanOutlined />}>
            <Link to="/scans">Scans</Link>
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            style={{ position: "absolute", top: 0, right: 40 }}
            icon={<UserOutlined style={{ fontSize: 20 }} />}
          >
            <Menu.Item
              onClick={() => onLoggedIn()}
              key="/logout"
              icon={<LoginOutlined />}
            >
              <Link to="/">Logout</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </>
      ) : (
        <Menu.SubMenu
          key="sub1"
          style={{ position: "absolute", top: 0, right: 40 }}
          icon={<UserOutlined style={{ fontSize: 20 }} />}
        >
          <Menu.Item key="/login" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/register" icon={<UserOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu.SubMenu>
      )}
    </Menu>
  );
};

export { Navigation };
