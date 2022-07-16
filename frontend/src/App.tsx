import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

// local
import { BadgeScan, Scan, Login, Register } from "./forms";
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
    Component: Login
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
      <Layout className="layout" style={{height:"100vh", overflow: "auto"}}>
        <Header>
          <Navigation />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, height: '100%' }}>
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
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PerfectAttendance ©2022</Footer>
      </Layout>
    </Router> 
    
  );
}

export default App;
