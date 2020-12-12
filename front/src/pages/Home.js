
import React from 'react';
import { Carousel } from 'antd';

export default function Home() {
  return (
    <div className="carousel" style={{ position: 'relative' }}>
      <Carousel autoplay>
        <div>
          <img src="https://techcrunch.com/wp-content/uploads/2019/03/blueground-apartment-2-2-2.jpg" alt="hp1" />
        </div>
        <div>
          <img src="https://i.pinimg.com/originals/9f/31/32/9f31326328e08a642e7d87e64dec60ee.jpg" alt="hp2" />
        </div>
      </Carousel>
      <span>Find Your Home at Home Finder</span>
    </div>
  );
}