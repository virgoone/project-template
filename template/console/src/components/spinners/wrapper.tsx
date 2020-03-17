import styled from 'styled-components'

export const Spinner = styled.div`
  position: relative;
  width: 100%;
  height: ${props => `${props.wrapperSize}${props.sizeUnit}`};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => `${props.wrapperDirection || 'row'}`};
`

export const LoadingText = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  margin-top: 20px;
`
