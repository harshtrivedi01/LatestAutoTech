'use client';

import SimpleCarousel from '../Carousel/SimpleCarousel';

// Example with image URLs
const SAMPLE_IMAGES = [
  'https://via.placeholder.com/800x450?text=Slide+1',
  'https://via.placeholder.com/800x450?text=Slide+2',
  'https://via.placeholder.com/800x450?text=Slide+3',
  'https://via.placeholder.com/800x450?text=Slide+4',
];

export default function CarouselExample() {
  return (
    <div style={{ padding: '40px 20px' }}>
      <h1>Simple Carousel Example</h1>
      
      {/* Basic carousel with images */}
      <SimpleCarousel 
        items={SAMPLE_IMAGES}
        autoPlay={true}
        interval={4000}
      />

      {/* Example with custom content */}
      <div style={{ marginTop: '40px' }}>
        <h2>Carousel with Custom Content</h2>
        <SimpleCarousel 
          items={[
            <div key={1} style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              Slide 1
            </div>,
            <div key={2} style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              Slide 2
            </div>,
            <div key={3} style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold'
            }}>
              Slide 3
            </div>,
          ]}
          autoPlay={true}
          interval={5000}
        />
      </div>
    </div>
  );
}
