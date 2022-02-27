import React from 'react';
import image from '../Images/Amman.jpeg';
import { Icons } from '../Utils/Constant';

export default function Header() {
  return (
    <div
      className='center-align'
      style={{
        backgroundImage: 'radial-gradient(white, cyan)',
      }}
    >
      <div className='columns text-center' style={{ margin: '0 auto' }}>
        <div className='column col-4'>Since: 1947</div>
        <div className='column col-4'>ஸ்ரீ ரேணுகாதேவி அம்மன் துணை</div>
        <div className='column col-4'>Reg No.: 20/68</div>
        <div className='container' style={{ width: '80%' }}>
          <div className='columns hide-md hide-sm'>
            <h1
              className='column col-10'
              style={{ fontSize: 70, marginTop: '2rem' }}
            >
              <b>DINDIGUL TOWN SOWRASHTRA MAHAJANA SABHA</b>
            </h1>
            <div className='column col-2' style={{ marginTop: '1.4rem' }}>
              <img
                src={image}
                className='borderColor s-rounded'
                loading='lazy'
                alt='cover2'
                width='auto'
                height='200px'
              />
            </div>
          </div>
          <div className='show-sm show-md hide-xs'>
            <h3 className='column col-12'>
              DINDIGUL TOWN <br />
              SOWRASHTRA MAHAJANA SABHA
            </h3>
          </div>
        </div>
        <div className='container hide-sm hide-md' style={{ width: '90%' }}>
          <div className='columns'>
            <div className='columns col-3' style={{ marginTop: '1rem' }}>
              <div className='column text-right'>
                <img src={Icons.phoneIcon} alt='phone' />
              </div>
              <div className='column text-left'>6383987646</div>
            </div>
            <div className='columns col-3' style={{ marginTop: '1rem' }}>
              <div className='column text-right'>
                <img src={Icons.whatsappIcon} alt='whatsapp' />
              </div>
              <div className='column text-left'>9952816780</div>
            </div>
            <div className='columns col-3' style={{ marginTop: '1rem' }}>
              <div className='column text-right'>
                <img src={Icons.telePhoneIcon} alt='telePhone' />
              </div>
              <div className='column text-left'>0451-2427598</div>
            </div>
            <div className='columns col-3' style={{ marginTop: '1rem' }}>
              <div className='column text-right'>
                <img src={Icons.emailIcon} alt='email' />
              </div>
              <div className='column text-left'>dtsmahajanasabha@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
