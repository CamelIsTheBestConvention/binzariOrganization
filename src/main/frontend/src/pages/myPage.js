import styled from "styled-components";
import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";
import ProfileFace from "../images/myPageImages/personProfile.png";
import ProfileArrowImg from "../images/myPageImages/arrow.jpg";
import PwModal from "../components/myPageContent/pwModal";
import PhoneModal from "../components/myPageContent/phoneModal";
import ProfileFavoriteMaster from "../components/myPageContent/profileFavoriteMaster";
import ProfileFavorite from "../components/myPageContent/profileFavorite";
import { useState } from "react";

const MyPage = () => {
  const [status, setStatus] = useState(1);
  const [toggleState, setToggleState] = useState(false);
  // 모달창 노출 여부 state
  const [modalOpenPw, setModalOpenPw] = useState(false);
  const [modalOpenPhone, setModalOpenPhone] = useState(false);

  const changeToggle = () => {
    setToggleState(!toggleState);
  };

  // 모달창 노출
  const showModalPw = () => {
    setModalOpenPw(true);
  };

  const showModalPhone = () => {
    setModalOpenPhone(true);
  };

  return (
    <>
      <Header />
      <MyPageMain>
        <MyPageWrapper>
          <MyProfileWrapper>
            <ProfileImgWrapper>
              <ProfileImgImg src={ProfileFace} />
            </ProfileImgWrapper>
            <ProfileInfoWrapper>
              <ProfileNickName>
                문성준
                <ArrowImg src={ProfileArrowImg} />
              </ProfileNickName>
              <ProfileType>{status}</ProfileType>
            </ProfileInfoWrapper>
          </MyProfileWrapper>

          <DetailWrapper>
            <Toggle onClick={changeToggle}>{toggleState ? "▲" : "▼"}</Toggle>
            <ProfileSettingWrapper>
              <ProfileSettingUl
                style={{ display: toggleState ? "block" : "none" }}
              >
                <ProfileSettingLi>프로필 이미지 변경</ProfileSettingLi>
                <ProfileSettingLi onClick={showModalPw}>
                  비밀번호 변경
                </ProfileSettingLi>
                <ProfileSettingLi onClick={showModalPhone}>
                  핸드폰 번호 변경
                </ProfileSettingLi>
              </ProfileSettingUl>
              {modalOpenPw && (
                <PwModal setModalOpenPw={setModalOpenPw} status={setStatus} />
              )}
              {modalOpenPhone && (
                <PhoneModal
                  setModalOpenPhone={setModalOpenPhone}
                  status={status}
                />
              )}
            </ProfileSettingWrapper>
            {status === 0 && <ProfileFavorite />}
            {status === 1 && <ProfileFavoriteMaster />}
          </DetailWrapper>
        </MyPageWrapper>
      </MyPageMain>
      <Footer />
    </>
  );
};
export default MyPage;

const MyPageMain = styled.main`
  width: 90%;
  min-height: 600px;
  max-width: 500px;
  margin: 0 auto;
`;

const MyPageWrapper = styled.section`
  width: 100%;
  padding-top: 30px;
`;

const MyProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 0.3em;
`;

const ProfileImgWrapper = styled.div`
  border-radius: 70%;
  max-width: 55px;
  max-height: 55px;
  overflow: hidden;
`;

const ProfileImgImg = styled.img`
  height: 100%;
  object-fit: cover;
`;

const ProfileInfoWrapper = styled.div`
  display: inline-block;
  margin: auto 0 auto 1rem;
`;

const ProfileNickName = styled.p`
  margin: 3px 0px;
  font-weight: bold;
  font-size: 1.3rem;
`;

const ArrowImg = styled.img`
  height: 18px;
  margin-left: 0.3rem;
`;

const ProfileType = styled.p`
  margin: 3px 0px;
  font-size: 0.8rem;
`;

const DetailWrapper = styled.div`
  /* margin-top: 0.5rem; */
`;

const Toggle = styled.button`
  width: 100%;
  padding: 0.3rem 0;
  margin-top: 0.5rem;
  background-color: white;
  border: none;

  :hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const ProfileSettingWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.3em;
`;

const ProfileSettingUl = styled.ul`
  list-style: none;
  margin-top: 0%;
  padding-left: 20px;
`;

const ProfileSettingLi = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
`;
