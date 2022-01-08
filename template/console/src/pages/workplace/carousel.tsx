import React from 'react';
import { Carousel } from '@arco-design/web-react';

const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
];
function C() {
  return (
    <Carousel
      indicatorType="slider"
      showArrow="never"
      autoPlay
      style={{
        width: '100%',
        height: 160,
      }}
    >
      {imageSrc.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            style={{
              width: 280,
              transform: 'translateY(-30px)',
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default C;
