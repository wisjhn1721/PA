import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

// local
import { BadgeScan, Scan, Register, Register } from "./forms";
import { Navigation } from "./components/Navigation";


const { Header, Content, Footer } = Layout;


const routes = [
  {
    path: "/badgescan",
    Component: BadgeScan,
  },
  {
    path: "/scans",
    Component: Scan,
  },
  {
    path: "/login",
    Component: Register
  },
  {
    path: "register",
    Component: Register
  }
];

const Home = () => {
  return (
    <h2>Welcome to PerfectAttendance!</h2>
  )
}


const App = () => {
  return (
    <Router>
      <Layout className="site-layout">
        <Header>
          <Navigation />
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: "22px 16px", padding: 40 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {routes.map(({ path, Component }, i) => (
              <Route
                key={i}
                path={path}
                element={<Component />}
              />
            ))}
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PerfectAttendance ©2022</Footer>
      </Layout>
    </Router> 
    
  );
}

export default App;
