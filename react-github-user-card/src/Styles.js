import styled from "styled-components";

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

// const FollowDiv = styled.div`
//   width: 25%;
//   margin: 2% 0;
// `;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const StyledLink = styled.a`
  text-decoration: none;
  background-color: #d3d3d3;
  padding: 2%;
  margin: 2% 0;
  border-radius: 5px;
`;

const UserCardWrap = styled.div`
  background-color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 5%;
  margin: 5% 10%;
  color: white;
`;

export { HeaderWrap, LinksWrapper, StyledLink, UserCardWrap };
