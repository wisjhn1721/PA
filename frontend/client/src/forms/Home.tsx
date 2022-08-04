import styled from "styled-components";

// local
import card1 from "../imgs/card1.jpg";
import rollcall from "../imgs/rollcall.jpeg";
import rollsheet from "../imgs/rollsheet.jpg";

const Container = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px auto;
`;

const Header = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const ImgContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 7px;
  border: 4px solid black;
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

      <h4>• No more hand raising.</h4>
      <ImgContainer>
        <img src={rollcall} width={300} alt="Attendance" />
      </ImgContainer>

      <br />

      <h4>• No more attendance sheets that others have to manually grade.</h4>
      <ImgContainer>
        <img src={rollsheet} width={300} alt="Roll Call" />
      </ImgContainer>

      <br />

      <h4>• Take advantage of your student card.</h4>
      <ImgContainer>
        <img src={card1} alt="Student Card Sample" />
      </ImgContainer>
    </Container>
  );
};

export { Home };
