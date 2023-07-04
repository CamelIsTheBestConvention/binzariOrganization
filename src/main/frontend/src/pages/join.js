import React, { useState } from "react";
import styled, { css } from "styled-components";
import PhoneCountry from "../components/joinContent/phoneCountry";
import JoinStep2 from "../components/joinContent/joinStep2";
import JoinStep1 from "../components/joinContent/joinStep1";
import Header from "../components/common/header/header";
import Footer from "../components/common/footer/footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Check from "../images/joinImages/check.png";
import OpenEye from "../images/joinImages/view.png";
import CloseEye from "../images/joinImages/hide.png";
import AgreeImg from "../images/joinImages/agree.png";
import AgreeCorrectImg from "../images/joinImages/correctAgree.png";
import RightArrow from "../images/joinImages/rightArrow.png";

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
  console.log(form);

  // 유효성검사
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  // const [typeMessage, setTypeMessage] = useState("");
  // const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  const [isname, setIsName] = useState(false);
  const [isphone, setIsPhone] = useState(false);
  // const [istype, setIsType] = useState(false);
  const [isemail, setIsEmail] = useState(false);
  const [ispassword, setIsPassword] = useState(false);
  const [ispasswordCheck, setIsPasswordCheck] = useState(false);

  const onChangeName = (e) => {
    setForm({ ...form, name: e.target.value });
    const currentName = form.name;
    setName(currentName);
    const nameRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/;

    if (!nameRegExp.test(currentName)) {
      setNameMessage("2-6사이 한글을 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onChangePhone = (e) => {
    setForm({ ...form, phone: e.target.value });
    const currentPhone = form.phone;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 휴대폰 번호를 입력해주세요.");
      setIsPhone(false);
    } else {
      setPhoneMessage("");
      setIsPhone(true);
    }
  };

  const onChangeEmail = (e) => {
    setForm({ ...form, email: e.target.value });
  };

  const EmailCheck = () => {
    const currentEmail = form.email;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      alert("이메일의 형식을 확인해주세요.");
      setIsEmail(false);
    } else {
      alert("사용가능한 이메일입니다.");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    setForm({ ...form, password: e.target.value });
    const currentPassword = form.password;
    setPassword(currentPassword);
    const passwordRegExp = /^[a-zA-z0-9]{8,16}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage("8-16 사이 대소문자 또는 숫자만 입력해 주세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

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

  // 타입선택
  const [isChecked, setIsChecked] = useState(false);

  const handlerClickRadioBtn = () => {
    setIsChecked(!isChecked);
  };

  // 비번 눈깔
  const [ShowPw, setShowPw] = useState(false);

  const ToggleShowPw = () => {
    setShowPw(!ShowPw);
  };

  // 비번확인 눈깔
  const [checkShowPw, setCheckShowPw] = useState(false);

  const ToggleCheckShowPw = () => {
    setCheckShowPw(!checkShowPw);
  };

  // 약관동의
  const [AllCheck, setAllCheck] = useState(false);
  const [MustAllCheck, setMustAllCheck] = useState(false);
  const [MustCheck1, setMustCheck1] = useState(false);
  const [MustCheck2, setMustCheck2] = useState(false);
  const [ChoiceAllCheck, setChoiceAllCheck] = useState(false);
  const [ChoiceCheck1, setChoiceCheck1] = useState(false);

  function handleAllChecked(event) {
    setAllCheck(event.target.checked);
    setMustAllCheck(event.target.checked);
    setMustCheck1(event.target.checked);
    setMustCheck2(event.target.checked);
    setChoiceAllCheck(event.target.checked);
    setChoiceCheck1(event.target.checked);
  }

  function handleMustAllChecked(event) {
    setMustAllCheck(event.target.checked);
    setMustCheck1(event.target.checked);
    setMustCheck2(event.target.checked);
    setAllCheck(ChoiceAllCheck && event.target.checked);
  }

  function handleMustChecked1(event) {
    setMustCheck1(event.target.checked);
    setMustAllCheck(MustCheck2 && event.target.checked);
    if (!MustAllCheck && ChoiceAllCheck && MustCheck2) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }

  function handleMustChecked2(event) {
    setMustCheck2(event.target.checked);
    setMustAllCheck(MustCheck1 && event.target.checked);
    if (!MustAllCheck && ChoiceAllCheck && MustCheck1) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }

  function handleChoiceAllChecked(event) {
    setChoiceAllCheck(event.target.checked);
    setChoiceCheck1(event.target.checked);
    setAllCheck(MustAllCheck && event.target.checked);
  }

  function handleChoiceChecked1(event) {
    setChoiceCheck1(event.target.checked);
    setChoiceAllCheck(event.target.checked);
    if (!ChoiceAllCheck && MustAllCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }

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
                    onChange={onChangeName}
                  />
                  <Message> {nameMessage} </Message>
                </NameWrapper>
                <PhoneWrapper>
                  <PhoneTitleWrapper>휴대전화</PhoneTitleWrapper>
                  <PhoneCountry />
                  <PhoneInputWrapper>
                    <Input
                      type="text"
                      placeholder="01012345678"
                      value={form.phone}
                      onChange={onChangePhone}
                    />
                    <SendBtn type="button" onClick={handlerSend}>
                      인증번호 발송
                    </SendBtn>
                  </PhoneInputWrapper>
                  <Message> {phoneMessage} </Message>
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
                  <TypeChoiceWrapper>
                    <TypeInputWrapper
                      id="CheckedNormal"
                      isChecked={isChecked === "normal"}
                      onClick={() => setIsChecked("normal")}
                    >
                      <TypeInput
                        id="normal"
                        type="radio"
                        name="id-type-radio"
                        value="일반"
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      />
                      <Label for="normal">일반</Label>
                      <CheckImg
                        src={Check}
                        id="normalImg"
                        isChecked={isChecked === "normal"}
                      />
                    </TypeInputWrapper>
                    <TypeInputWrapper
                      id="CheckedMaster"
                      isChecked={isChecked === "master"}
                      onClick={() => setIsChecked("master")}
                    >
                      <TypeInput
                        id="master"
                        type="radio"
                        name="id-type-radio"
                        value="사업자"
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      />
                      <Label for="master">사업자</Label>
                      <CheckImg
                        src={Check}
                        id="masterImg"
                        isChecked={isChecked === "master"}
                      />
                    </TypeInputWrapper>
                    <TypeInputWrapper
                      id="CheckedLaw"
                      isChecked={isChecked === "law"}
                      onClick={() => setIsChecked("law")}
                    >
                      <TypeInput
                        id="law"
                        type="radio"
                        name="id-type-radio"
                        value="법인"
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      />
                      <Label for="law">법인</Label>
                      <CheckImg
                        src={Check}
                        id="lawImg"
                        isChecked={isChecked === "law"}
                      />
                    </TypeInputWrapper>
                  </TypeChoiceWrapper>
                </TypeWrapper>
                <EmailWrapper>
                  <EmailTitleWrapper>이메일</EmailTitleWrapper>
                  <EmailInputWrapper>
                    <EmailInput
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={onChangeEmail}
                    />
                    <EmailBtn type="button" onClick={EmailCheck}>
                      인증하기
                    </EmailBtn>
                  </EmailInputWrapper>
                </EmailWrapper>
                <PwWrapper>
                  <PwTitleWrapper>비밀번호</PwTitleWrapper>
                  <PwInputWrapper>
                    <PwInput
                      type={ShowPw ? "text" : "password"}
                      placeholder="Password#16000099"
                      minlength="8"
                      maxLength="16"
                      value={form.password}
                      onChange={onChangePassword}
                    />
                    {ShowPw ? (
                      <EyeImg src={CloseEye} onClick={ToggleShowPw} />
                    ) : (
                      <EyeImg src={OpenEye} onClick={ToggleShowPw} />
                    )}
                  </PwInputWrapper>
                  <Message> {phoneMessage} </Message>
                </PwWrapper>
                <PwWrapper>
                  <PwCheckTitleWrapper>비밀번호 확인</PwCheckTitleWrapper>
                  <PwInputWrapper>
                    <PwInput
                      type={checkShowPw ? "text" : "password"}
                      placeholder="Password#16000099"
                      minlength="8"
                      maxLength="16"
                      value={form.passwordCheck}
                      onChange={(e) =>
                        setForm({ ...form, passwordCheck: e.target.value })
                      }
                    />
                    {checkShowPw ? (
                      <EyeImg src={CloseEye} onClick={ToggleCheckShowPw} />
                    ) : (
                      <EyeImg src={OpenEye} onClick={ToggleCheckShowPw} />
                    )}
                  </PwInputWrapper>
                </PwWrapper>
                {/* 약관동의 */}
                <AgreeTitleWrapper>이용약관동의</AgreeTitleWrapper>
                <AgreeTotal>
                  <label for="allCheck">
                    <CheckInput
                      type="checkbox"
                      id="allCheck"
                      checked={AllCheck}
                      onChange={handleAllChecked}
                    />
                    <AgreeTotalImg
                      src={!AllCheck ? AgreeImg : AgreeCorrectImg}
                    />
                    <Span>이용약관 전체동의</Span>
                  </label>
                </AgreeTotal>

                <AgreeUnder>
                  <AgreeUnderTotal>
                    <label for="mustAllCheck">
                      <CheckInput
                        type="checkbox"
                        id="mustAllCheck"
                        checked={MustAllCheck}
                        onChange={handleMustAllChecked}
                      />
                      <AgreeUnderTotalImg
                        src={!MustAllCheck ? AgreeImg : AgreeCorrectImg}
                      />
                      <Span>필수 이용약관 전체동의</Span>
                    </label>
                  </AgreeUnderTotal>

                  <AgreeUnderContent>
                    <AgreeUnderContentCheck>
                      <label for="mustCheck1">
                        <CheckInput
                          type="checkbox"
                          id="mustCheck1"
                          checked={MustCheck1}
                          onChange={handleMustChecked1}
                        />
                        <AgreeUnderContentCheckImg
                          src={!MustCheck1 ? AgreeImg : AgreeCorrectImg}
                        />
                        <Span>서비스 이용약관 동의</Span>
                      </label>
                    </AgreeUnderContentCheck>
                    <AgreeUnderContentDetail>
                      <Span>상세보기</Span>
                      <AgreeUnderContentDetailImg src={RightArrow} />
                    </AgreeUnderContentDetail>
                  </AgreeUnderContent>

                  <AgreeUnderContent style={{ marginBottom: "15px" }}>
                    <AgreeUnderContentCheck>
                      <label for="mustCheck2">
                        <CheckInput
                          type="checkbox"
                          id="mustCheck2"
                          checked={MustCheck2}
                          onChange={handleMustChecked2}
                        />
                        <AgreeUnderContentCheckImg
                          src={!MustCheck2 ? AgreeImg : AgreeCorrectImg}
                        />
                        <Span>개인정보 처리 방침 동의</Span>
                      </label>
                    </AgreeUnderContentCheck>
                    <AgreeUnderContentDetail>
                      <Span>상세보기</Span>
                      <AgreeUnderContentDetailImg src={RightArrow} />
                    </AgreeUnderContentDetail>
                  </AgreeUnderContent>

                  <AgreeUnderTotal>
                    <label for="choiceAllCheck">
                      <CheckInput
                        type="checkbox"
                        id="choiceAllCheck"
                        checked={ChoiceAllCheck}
                        onChange={handleChoiceAllChecked}
                      />
                      <AgreeUnderTotalImg
                        src={!ChoiceAllCheck ? AgreeImg : AgreeCorrectImg}
                      />
                      <Span>선택 이용약관 전체동의</Span>
                    </label>
                  </AgreeUnderTotal>

                  <AgreeUnderContent>
                    <AgreeUnderContentCheck>
                      <label for="choiceCheck1">
                        <CheckInput
                          type="checkbox"
                          id="choiceCheck1"
                          checked={ChoiceCheck1}
                          onChange={handleChoiceChecked1}
                        />
                        <AgreeUnderContentCheckImg
                          src={!ChoiceCheck1 ? AgreeImg : AgreeCorrectImg}
                        />
                        <Span>알림 동의</Span>
                      </label>
                    </AgreeUnderContentCheck>
                    <AgreeUnderContentDetail>
                      <Span>상세보기</Span>
                      <AgreeUnderContentDetailImg src={RightArrow} />
                    </AgreeUnderContentDetail>
                  </AgreeUnderContent>
                </AgreeUnder>
                <JoinSubmitBtn
                  type="submit"
                  value="회원가입"
                  disabled={
                    !(
                      form.type &&
                      form.email &&
                      form.password &&
                      form.passwordCheck &&
                      MustAllCheck
                    )
                  }
                />
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

// 타입 css
const TypeChoiceWrapper = styled.article`
  display: flex;
  width: 100%;
  font-size: 0.8rem;
`;

const TypeInputWrapper = styled.article`
  width: 30%;
  padding-bottom: 3px;
  margin-right: 5%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 2px solid white;

  :hover {
    border-bottom: 2px solid #5ec48d;
    color: #5ec48d;
  }

  ${(props) =>
    props.isChecked &&
    css`
      border-bottom: 2px solid #5ec48d;
      color: #5ec48d;
    `}
`;

const TypeInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const CheckImg = styled.img`
  width: 15px;
  height: 15px;
  visibility: hidden;

  ${(props) =>
    props.isChecked &&
    css`
      visibility: visible;
    `}
`;

// 이메일 인풋
const EmailInputWrapper = styled.article`
  display: flex;

  EmailInputWrapper::placeholder {
    color: #afafaf;
  }
`;

const EmailBtn = styled.button`
  width: 25%;
  background-color: #afafaf;
  color: #fff;
  border-radius: 5px;
  font-size: 11px;
  padding: 6px 10px;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #5ec48d;
    transition: 0.5s;
  }
`;

const EmailInput = styled.input`
  width: 77%;
  border: none;
  border-bottom: 1px solid #a0a0a0;
  margin-right: 10px;
  padding-left: 5px;
  padding-right: 20px;
  padding-bottom: 3px;
`;

// 비번 인풋
const PwInputWrapper = styled.article`
  position: relative;
  border-bottom: 1px solid #a0a0a0;
`;

const PwInput = styled.input`
  width: 70%;
  outline: none;
  border: none;
  padding-bottom: 5px;
  padding-left: 5px;
`;

const EyeImg = styled.img`
  position: absolute;
  right: 20px;
  cursor: pointer;
  padding-right: 5px;
`;

const JoinSubmitBtn = styled.input`
  font-size: 0.92rem;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #afafaf;
  margin-bottom: 40px;

  :hover {
    background-color: #8fffa9;
    transition: 0.5s;
    cursor: pointer;
  }
`;
// 약관동의
const AgreeTitleWrapper = styled.article`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

// 전체동의
const AgreeTotal = styled.article`
  border-bottom: 1px solid #a0a0a0;
  font-size: 0.8rem;
  padding-bottom: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const AgreeTotalImg = styled.img`
  width: 18px;
  margin-bottom: -4px;
  margin-right: 5px;
  cursor: pointer;
`;

// 하단 약관 동의
const AgreeUnder = styled.article`
  margin-left: 3px;
  margin-bottom: 2rem;
  cursor: pointer;
`;

// 하단 약관 전체 동의
const AgreeUnderTotal = styled.article`
  font-size: 0.77rem;
  cursor: pointer;
`;

const AgreeUnderTotalImg = styled.img`
  width: 16px;
  margin-bottom: -3px;
  margin-right: 5px;
  cursor: pointer;
`;

// 하단 약관 세부 동의
const AgreeUnderContent = styled.article`
  display: flex;
  justify-content: space-between;
  margin-left: 2px;
  margin-top: 5px;
  cursor: pointer;
`;

const AgreeUnderContentCheck = styled.article`
  font-size: 0.7rem;
`;

const AgreeUnderContentCheckImg = styled.img`
  width: 14px;
  margin-bottom: -2px;
  margin-right: 5px;
  cursor: pointer;
`;

const AgreeUnderContentDetail = styled.article`
  font-size: 0.6rem;
`;

const AgreeUnderContentDetailImg = styled.img`
  width: 8px;
  margin-left: 5px;
`;

const CheckInput = styled.input`
  display: none;
`;

const Span = styled.span`
  cursor: pointer;
`;

// 유효성 메세지
const Message = styled.p`
  margin-top: 1rem;
  color: red;
  font-size: 0.7rem;
`;
