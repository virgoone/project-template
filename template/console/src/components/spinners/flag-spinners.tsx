import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Spinner, LoadingText } from './wrapper'

const wave = props => keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(${-props.size / 5}${props.sizeUnit});
    opacity: 0.25;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.size}${props.sizeUnit}`};
  height: ${props => `${props.size}${props.sizeUnit}`};
`

const Line = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  animation: ${wave} 1.5s cubic-bezier(0.86, 0, 0.07, 1) infinite;
  animation-delay: ${props => props.index * 0.05}s;
`

const Plane = styled.div`
  position: absolute;
  top: ${props => `${props.y}${props.sizeUnit}`};
  left: ${props => `${props.x}${props.sizeUnit}`};
  width: ${props => `${props.size / 6}${props.sizeUnit}`};
  height: ${props => `${props.size / 6}${props.sizeUnit}`};
  background-color: ${props => props.color};
`

const getPlanes = ({
  countPlaneInLine,
  color,
  size,
  sizeUnit,
}): React.ReactNode[] => {
  const lines: React.ReactNode[] = []
  const planes: React.ReactNode[] = []
  let keyValue = 0
  for (let i = 0; i < countPlaneInLine; i++) {
    for (let j = 0; j < countPlaneInLine; j++) {
      planes.push(
        <Plane
          color={color}
          size={size}
          x={i * (size / 6 + size / 9)}
          y={j * (size / 6 + size / 9) + size / 10}
          key={i + j.toString()}
          index={keyValue}
          sizeUnit={sizeUnit}
        />,
      )
      keyValue++
    }
    lines.push(
      <Line
        index={keyValue}
        key={keyValue.toString()}
        size={size}
        sizeUnit={sizeUnit}
      >
        {[...planes]}
      </Line>,
    )
    planes.length = 0
  }
  return lines
}
export interface FlagSpinnerProps {
  size: number
  color: string
  loading: boolean
  sizeUnit: 'px' | 'rem'
  wrapperSize: number
}
class FlagSpinner extends React.PureComponent<FlagSpinnerProps> {
  static defaultProps = {
    loading: true,
    size: 50,
    color: '#6E73E4',
    sizeUnit: 'px',
    wrapperSize: 300,
  }
  render() {
    const { size, color, loading, sizeUnit, wrapperSize } = this.props
    const countPlaneInLine = 4

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
          {getPlanes({ countPlaneInLine, color, size, sizeUnit })}
        </Wrapper>
        <LoadingText>Loading...</LoadingText>
      </Spinner>
    )
  }
}

export default FlagSpinner
