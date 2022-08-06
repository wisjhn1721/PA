import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

// local
import { BadgeScan, Scan, Register, Login, Home } from "./forms";
import { Navigation } from "./components/Navigation";
import { useState } from "react";
import { CourseList } from "./components/CourseList";


const { Header, Content, Footer } = Layout;



const App = () => {
  const [user, setUser] = useState<{[key: string]: string} | null>(null);

  const routes = [
    {
      path: "/badgescan",
      Component: <BadgeScan />
    },
    {
      path: "/scans",
      Component: <Scan />
    },
    {
      path: "/login",
      Component: <Login onLoggedIn={(val) => setUser(val)} />
    },
    {
      path: "/register",
      Component: <Register onLoggedIn={(val) => setUser(val)} />
    }
  ];


  return (
    <Router>
      <Layout className="site-layout">
        <Header>
          <Navigation user={user} />
        </Header>
        <Content
          className="site-layout-background"
          style={{ margin: "22px 16px", padding: 40 }}
        >
          <Routes>
            <Route path="/" element={user ? <CourseList user={user} /> : <Home />} />
            
            {routes.map(({ path, Component }, i) => (
              <Route
                key={i}
                path={path}
                element={Component}
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
