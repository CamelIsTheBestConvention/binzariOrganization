import styled from "styled-components";
import ProfileFace from "../../images/myPageImages/personProfile.png";
import ProfileArrowImg from "../../images/myPageImages/arrow.jpg";
import React, { useState } from "react";

const MyProfile = () => {
  return (
    <>
      <MyProfileWrapper>
        <ProfileImgWrapper>
          <ProfileImgImg src={ProfileFace} />
        </ProfileImgWrapper>
        <ProfileInfoWrapper>
          <ProfileNickName>
            문성준
            <ArrowImg src={ProfileArrowImg} />
          </ProfileNickName>
          <ProfileType>11</ProfileType>
        </ProfileInfoWrapper>
      </MyProfileWrapper>
    </>
  );
};
export default MyProfile;

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
