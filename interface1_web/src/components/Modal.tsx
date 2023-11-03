import React, { FC } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import PageFrame from '../components/PageFrame';

export const Modal = (props: any) => {
  if (!props.show) {
    return null;
  }
  console.log('props ok ', props.onOk)
  const handleOkClick = () => {
    props.onOk();
    props.onClose();
    return null;
  };

  return (
    <Box>
        <StyledBackground></StyledBackground>
        <StyledModal>
            <Box sx={modalStyle}>
                <StyledModalHeader>
                    {props.type === 'error' ? (
                        <h2 className="error-title">{props.title}</h2>
                    ) : (
                        <h2>{props.title}</h2>
                    )}
                </StyledModalHeader>
                <StyledModalBody>{props.children}</StyledModalBody>
                <StyledModalFooter>
                    {props.type === 'error' || props.type === 'info' ? (
                        <button className="close-button" onClick={props.onClose}>Ok</button>
                    ) : (
                        <div>
                            <button className="cancel-button" onClick={props.onClose}>Cancel</button>
                            <button className="close-button" onClick={handleOkClick}>Ok</button>
                        </div>
                        
                    )}
                </StyledModalFooter>
            </Box>
        </StyledModal>
    </Box>
    
  );
};

const modalStyle = {
  position: 'absolute',
  width: '800px',
  height: '297.33px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#16181A',
  border: '1px solid #2D2C2C',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1280px;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 9998;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1280px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
  h2 {
    margin: 0;
    color: white;
    font-size: 20px;
    text-transform: uppercase;
  }
  .error-title{
    color: #CE1833;
  }
`;

const StyledModalBody = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  color: white;
`;

const StyledModalFooter = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  button{
    text-transform: uppercase;
    background-color: #16181A;
    border: 1px solid #2D2C2C;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    width: 237.5px;
    height: 53.33px;
    color: white;
  }
  .cancel-button{
    margin-right: 45px;
    border: 1px solid #CE1833;
  }
  .close-button{
    border: 1px solid #54AC46;
  }
`;
