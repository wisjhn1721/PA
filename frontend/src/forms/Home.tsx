import styled from "styled-components";

// local
import card1 from "../imgs/card1.jpg";
import rollcall from "../imgs/rollcall.jpeg";
import rollsheet from "../imgs/rollsheet.jpg";

const Container = styled.div``;

const Header = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Home = () => {
  return (
    <Container>
      <Header>Welcome to PerfectAttendance!</Header>
      <SubHeader>
        <h3>
          Take the first step towards a great attendance system and{" "}
          <a href="/register">Sign Up</a> today!
        </h3>
      </SubHeader>

      <img
        style={{ float: "left", margin: "5px 20px" }}
        src={rollcall}
        width={300}
        alt="Attendance"
      />
      <h4 style={{ textAlign: "justify" }}>No more hand raising.</h4>
      <br />

      <img
        style={{ float: "right", marginLeft: 20 }}
        src={rollsheet}
        width={300}
        alt="Roll Call"
      />
      <h4 style={{ float: "right" }}>
        No more attendance sheets that others have to manually grade.
      </h4>

      <br />
      <img style={{ float: "left" }} src={card1} alt="Student Card Sample" />
      <h4>Take advantage of your student card.</h4>
    </Container>
  );
};

export { Home };
