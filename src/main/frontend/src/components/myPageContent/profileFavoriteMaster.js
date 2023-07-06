import styled from "styled-components";
import BusinessProfile from "../../images/myPageImages/businessProfile.png";
import Danggu from "../../images/myPageImages/danggu.jpg";

const ProfileFavoriteMaster = () => {
  return (
    <>
      <FavoriteStoreWrapper>
        <FavoriteStoreTitle>단골 손님 목록</FavoriteStoreTitle>
        <FavoriteStoreUl>
          <FavoriteStoreLi>
            <FavoriteStoreImgWrapper>
              <BusinessProfileImg src={BusinessProfile} />
            </FavoriteStoreImgWrapper>
            <FavoriteStoreInfo>
              <FavoriteStoreInfoTitle>문성준</FavoriteStoreInfoTitle>
              <FavoriteStoreInfoAddress>msj1108</FavoriteStoreInfoAddress>
              <FavoriteStoreInfoAddress>010-1234-1234</FavoriteStoreInfoAddress>
            </FavoriteStoreInfo>
          </FavoriteStoreLi>
          <FavoriteStoreLi>
            <FavoriteStoreImgWrapper>
              <BusinessProfileImg src={Danggu} />
            </FavoriteStoreImgWrapper>
            <FavoriteStoreInfo>
              <FavoriteStoreInfoTitle>고진혁</FavoriteStoreInfoTitle>
              <FavoriteStoreInfoAddress>010-1111-1111</FavoriteStoreInfoAddress>
              <FavoriteStoreInfoAddress>010-1111-1111</FavoriteStoreInfoAddress>
            </FavoriteStoreInfo>
          </FavoriteStoreLi>
        </FavoriteStoreUl>
      </FavoriteStoreWrapper>
    </>
  );
};
export default ProfileFavoriteMaster;

const FavoriteStoreWrapper = styled.div`
  margin-bottom: 1.3em;
`;

const FavoriteStoreTitle = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const FavoriteStoreUl = styled.ul`
  list-style: none;
  margin-top: 0%;
  padding-left: 20px;
`;

const FavoriteStoreLi = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
`;

const FavoriteStoreImgWrapper = styled.div`
  border-radius: 70%;
  width: 4rem;
  height: 4rem;
`;

const BusinessProfileImg = styled.img`
  border-radius: 70%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FavoriteStoreInfo = styled.div`
  display: inline-block;
  margin: auto 0 auto 1rem;
`;

const FavoriteStoreInfoTitle = styled.p`
  margin: 3px 0px;
`;

const FavoriteStoreInfoAddress = styled.p`
  margin: 3px 0px;
  font-size: small;
`;
