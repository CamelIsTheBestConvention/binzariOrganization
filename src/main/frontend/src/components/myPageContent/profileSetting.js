import styled from "styled-components";
import { useState } from "react";
import PwModal from "./pwModal";
import PhoneModal from "./phoneModal";

const ProfileSetting = (props) => {
  // 모달창 노출 여부 state
  const [modalOpenPw, setModalOpenPw] = useState(false);
  const [modalOpenPhone, setModalOpenPhone] = useState(false);
  const [toggle, setToggle] = useState(props.toggle);

  // 모달창 노출
  const showModalPw = () => {
    setModalOpenPw(true);
  };

  const showModalPhone = () => {
    setModalOpenPhone(true);
  };

  return (
    <>
      <ProfileSettingWrapper>
        <ProfileSettingUl style={{ display: toggle ? "block" : "none" }}>
          <ProfileSettingLi>프로필 이미지 변경</ProfileSettingLi>
          <ProfileSettingLi onClick={showModalPw}>
            비밀번호 변경
          </ProfileSettingLi>
          <ProfileSettingLi onClick={showModalPhone}>
            핸드폰 번호 변경
          </ProfileSettingLi>
        </ProfileSettingUl>
        {modalOpenPw && <PwModal setModalOpenPw={setModalOpenPw} />}
        {modalOpenPhone && <PhoneModal setModalOpenPhone={setModalOpenPhone} />}
      </ProfileSettingWrapper>
    </>
  );
};
export default ProfileSetting;

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
