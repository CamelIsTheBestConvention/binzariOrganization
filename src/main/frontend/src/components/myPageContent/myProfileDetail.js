import styled from "styled-components";
import ProfileFavorite from "./profileFavorite";
import { useState } from "react";
import PwModal from "./pwModal";
import PhoneModal from "./phoneModal";
import ProfileFavoriteMaster from "./profileFavoriteMaster";

const MyProfileDetail = () => {
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
      <DetailWrapper>
        <Toggle onClick={changeToggle}>{toggleState ? "▲" : "▼"}</Toggle>
        <ProfileSettingWrapper>
          <ProfileSettingUl style={{ display: toggleState ? "block" : "none" }}>
            <ProfileSettingLi>프로필 이미지 변경</ProfileSettingLi>
            <ProfileSettingLi onClick={showModalPw}>
              비밀번호 변경
            </ProfileSettingLi>
            <ProfileSettingLi onClick={showModalPhone}>
              핸드폰 번호 변경
            </ProfileSettingLi>
          </ProfileSettingUl>
          {modalOpenPw && <PwModal setModalOpenPw={setModalOpenPw} />}
          {modalOpenPhone && (
            <PhoneModal setModalOpenPhone={setModalOpenPhone} />
          )}
        </ProfileSettingWrapper>
        {status === 0 && <ProfileFavorite />}
        {status === 1 && <ProfileFavoriteMaster />}
      </DetailWrapper>
    </>
  );
};
export default MyProfileDetail;

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
