import React, { useState } from "react";
import styled from "styled-components";
import JoinAgree from "../components/joinContent/joinAgree";
import JoinBtn from "../components/joinContent/joinBtn";
import PhoneCountry from "../components/joinContent/phoneCountry";
import JoinStep2 from "../components/joinContent/joinStep2";
import JoinStep1 from "../components/joinContent/joinStep1";
import EmailInput from "../components/joinContent/emailInput";
import PwInput from "../components/joinContent/pwInput";
import PwInputCheck from "../components/joinContent/pwInputCheck";
import TypeChoice from "../components/joinContent/typeChoice";
import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  // 회원가입 단계
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // 입력값
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  // 휴대폰 인증
  const [randomNumber, setRandomNumber] = useState("");
  const [showNumber, setShowNumber] = useState(false);
  const [NextRight, setNextRight] = useState(false);

  const handlerSendRight = () => {
    alert("인증 완료되었습니다.");
    setNextRight(true);
  };

  const handlerSend = () => {
    alert("인증번호가 발송되었습니다.");

    const number = Math.floor(Math.random() * 1000000);
    const sixDigitNumber = String(number).padStart(6, "0");
    setRandomNumber(sixDigitNumber);
    setShowNumber(true);
  };

  return (
    <>
      <Header />
      <div>
        <form>
          {step === 1 && (
            <JoinMain>
              <JoinWrapper>
                <JoinTitleWrapper>
                  <h4>회원가입</h4>
                </JoinTitleWrapper>
                <JoinStep1 />
                <NameWrapper>
                  <NameTitleWrapper>이름</NameTitleWrapper>
                  <Input
                    type="text"
                    placeholder="성이름"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </NameWrapper>
                <PhoneWrapper>
                  <PhoneTitleWrapper>휴대전화</PhoneTitleWrapper>
                  <PhoneCountry />
                  <PhoneInputWrapper>
                    <Input
                      type="text"
                      placeholder="01012345678"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                    <SendBtn type="button" onClick={handlerSend}>
                      인증번호 발송
                    </SendBtn>
                  </PhoneInputWrapper>
                  <SendNumber
                    style={{ display: showNumber ? "block" : "none" }}
                  >
                    {showNumber && <p>{randomNumber}</p>}
                  </SendNumber>
                  <SendCheckBtn
                    type="button"
                    style={{ display: showNumber ? "block" : "none" }}
                    onClick={handlerSendRight}
                  >
                    인증 확인
                  </SendCheckBtn>
                </PhoneWrapper>
                <NextJoinBtn
                  onClick={handleNext}
                  disabled={!(form.name && form.phone && NextRight)}
                >
                  다음
                </NextJoinBtn>
              </JoinWrapper>
            </JoinMain>
          )}
          {step === 2 && (
            <JoinMain>
              <JoinWrapper>
                <JoinTitleWrapper>
                  <BackBtn onClick={handleBack}>⬅</BackBtn>
                  <h4>회원가입</h4>
                </JoinTitleWrapper>
                <JoinStep2 />
                <TypeWrapper>
                  <TypeTitleWrapper>유형</TypeTitleWrapper>
                  <TypeChoice />
                </TypeWrapper>
                <EmailWrapper>
                  <EmailTitleWrapper>이메일</EmailTitleWrapper>
                  <EmailInput />
                </EmailWrapper>
                <PwWrapper>
                  <PwTitleWrapper>비밀번호</PwTitleWrapper>
                  <PwInput />
                </PwWrapper>
                <PwWrapper>
                  <PwCheckTitleWrapper>비밀번호 확인</PwCheckTitleWrapper>
                  <PwInputCheck />
                </PwWrapper>
                <JoinAgree />
                <JoinBtn />
              </JoinWrapper>
            </JoinMain>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Join;

const JoinMain = styled.main`
  width: 90%;
  margin: 0 auto;
`;

const JoinTitleWrapper = styled.div`
  text-align: center;
  font-size: 16px;
  position: relative;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 0.5rem;
  cursor: pointer;
`;

const JoinWrapper = styled.section`
  width: 100%;
  padding-top: 30px;
`;

const NextJoinBtn = styled.button`
  width: 100%;
  background-color: #afafaf;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  height: 33px;
  margin-top: 15px;

  :hover {
    background-color: #8fffa9;
    transition: 0.5s;
    cursor: pointer;
  }
`;

// form2 css
const TypeWrapper = styled.section`
  margin-bottom: 20px;
`;

const EmailWrapper = styled.section`
  width: 100%;
  margin-bottom: 30px;
`;

const PwWrapper = styled.section`
  margin-bottom: 30px;
`;

const TypeTitleWrapper = styled.article`
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const EmailTitleWrapper = styled.article`
  font-size: 0.9rem;
`;

const PwTitleWrapper = styled.article`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const PwCheckTitleWrapper = styled.article`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

// form1 css
const NameWrapper = styled.section`
  margin-bottom: 1rem;
`;

const PhoneWrapper = styled.section`
  width: 100%;
  margin-bottom: 1rem;
`;

const NameTitleWrapper = styled.article`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const PhoneTitleWrapper = styled.article`
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 90%;
  border: none;
  border-bottom: 1px solid #a0a0a0;
  margin-right: 10px;
  padding-left: 5px;
  padding-right: 20px;
  padding-bottom: 3px;
`;

const PhoneInputWrapper = styled.article`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

// 휴대폰 번호 css 보류
// const Input = styled.input`
//   width: 65%;
//   border: none;
//   border-bottom: 1px solid #a0a0a0;
// `;

const SendBtn = styled.button`
  height: 28px;
  width: 33%;
  font-size: 0.7rem;
  border-radius: 5px;
  border: none;
  background-color: #afafaf;
  color: white;
  font-weight: bold;
  margin-right: -26px;

  :hover {
    background-color: #5ec48d;
    cursor: pointer;
  }
`;

const SendNumber = styled.div`
  display: none;
  width: 97%;
  border: none;
  border-bottom: 1px solid #a0a0a0;
  font-size: 1rem;
  margin-top: 20px;
`;

const SendCheckBtn = styled.button`
  width: 100%;
  background-color: #afafaf;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  height: 33px;
  margin-top: 15px;
  margin-bottom: -20px;

  :hover {
    background-color: #8fffa9;
    transition: 0.5s;
    cursor: pointer;
  }
`;
