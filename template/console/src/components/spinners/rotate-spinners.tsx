import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner, LoadingText } from './wrapper'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% { 
    transform: rotate(1440deg); 
    opacity: 0.05;
  }
`

const Ball = styled.div`
  position: absolute;
  left: 50%;
  top: 0%;
  width: ${props => `${props.ballSize}${props.sizeUnit}`};
  height: ${props => `${props.ballSize}${props.sizeUnit}`};
  border-radius: 50%;
  background-color: ${props => props.color};
  transform: translateX(-50%) translateY(100%);
  transform-origin: 0 250% 0;
  animation: ${rotate} 4s both infinite;
  animation-timing-function: cubic-bezier(
    0.5,
    ${props => props.index * 0.3},
    0.9,
    0.9
  );
`
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.size}${props.sizeUnit}`};
  height: ${props => `${props.size}${props.sizeUnit}`};
`

const getBalls = ({
  countBalls,
  radius,
  angle,
  color,
  size,
  ballSize,
  sizeUnit,
}) => {
  const balls: React.ReactNodeArray = []
  const offset = ballSize / 2
  for (let i = 0; i < countBalls; i++) {
    const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset
    const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset
    balls.push(
      <Ball
        color={color}
        ballSize={ballSize}
        size={size}
        x={y}
        y={x}
        key={i.toString()}
        index={i}
        sizeUnit={sizeUnit}
      />,
    )
  }
  return balls
}

export interface RotateSpinnerProps {
  size: number
  loading: boolean
  color: string
  sizeUnit: 'px' | 'rem'
  wrapperSize: number
}

class RotateSpinner extends React.PureComponent<RotateSpinnerProps> {
  static defaultProps = {
    loading: true,
    size: 45,
    color: '#6E73E4',
    sizeUnit: 'px',
    wrapperSize: 300,
  }
  render() {
    const { size, color, loading, sizeUnit, wrapperSize } = this.props
    const radius = size / 2
    const countBalls = 8
    const ballSize = size / 5
    const angle = 360 / countBalls

    if (!loading) {
      return null
    }

    return (
      <Spinner
        wrapperDirection="column"
        wrapperSize={wrapperSize}
        sizeUnit={sizeUnit}
      >
        <Wrapper size={size} sizeUnit={sizeUnit}>
          {getBalls({
            countBalls,
            radius,
            angle,
            color,
            size,
            ballSize,
            sizeUnit,
          })}
        </Wrapper>
        <LoadingText>加载中...</LoadingText>
      </Spinner>
    )
  }
}

export default RotateSpinner
