import styled from "styled-components";
import { useState } from "react";

function PhoneModal({ setModalOpenPhone, status }) {
  const [phone, setPhone] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [isphone, setIsPhone] = useState(false);

  const closeModal = () => {
    setModalOpenPhone(false);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
    const currentPhone = phone;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const phoneRegExpMaster = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;

    if (status === 0) {
      if (!phoneRegExp.test(currentPhone)) {
        setPhoneMessage("올바른 휴대폰 번호를 입력해주세요.");
        setIsPhone(false);
      } else {
        setPhoneMessage("");
        setIsPhone(true);
      }
    } else if (status === 1) {
      if (!phoneRegExpMaster.test(currentPhone)) {
        setPhoneMessage("올바른 사업 번호를 입력해주세요.");
        setIsPhone(false);
      } else {
        setPhoneMessage("");
        setIsPhone(true);
      }
    }
  };

  return (
    <PwModalWrapper>
      <ModalBtn onClick={closeModal}>X</ModalBtn>
      <PwInputWrapper>
        <PwInputTitle>휴대폰 번호 입력</PwInputTitle>
        <PwCurrentInput type="text" placeholder="현재 휴대폰 번호 입력" />
        <PwInputTitle>새 휴대폰 번호 입력</PwInputTitle>
        <PwChangeInput
          type="text"
          placeholder="새 휴대폰 번호 입력"
          onChange={onChangePhone}
        />
        <Message> {phoneMessage} </Message>
        <PwChangeBtn type="button">변경하기</PwChangeBtn>
      </PwInputWrapper>
    </PwModalWrapper>
  );
}
export default PhoneModal;

const PwModalWrapper = styled.div`
  width: 90%;
  height: 25%;
  z-index: 999;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  opacity: 1;
  border: 1px solid black;
  border-radius: 8px;
  min-height: 14rem;
  max-width: 420px;
`;

const ModalBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const PwInputWrapper = styled.div`
  padding: 1.5rem;
`;

const PwInputTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const PwCurrentInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const PwChangeInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
  padding-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const PwChangeBtn = styled.button`
  width: 100%;
  padding: 0.6rem 0;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;

  :hover {
    background-color: #8fffa9;
    cursor: pointer;
  }
`;

// 유효성 메세지
const Message = styled.p`
  margin-bottom: 1rem;
  color: red;
  font-size: 0.7rem;
`;
