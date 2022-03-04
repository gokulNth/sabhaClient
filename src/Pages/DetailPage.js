import image from '../Images/avatar.png';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChildrenList from '../Components/ChildrenList';
import { AdditionalInfo, PersonalInfo } from '../Components/Information';
import { APIS, caculateAge, GenericWords, RequestAPI } from '../Utils/Constant';
import { SimpleHeader } from '../Components/SubHeader';

export default function Detail() {
  const { mid } = useParams();
  const [data, setData] = useState({});
  const [customField, setCustomField] = useState([]);
  const [descendant, setDescendant] = useState(null);

  const [showInfo, setShowInfo] = useState('info');

  useEffect(() => {
    RequestAPI(`${APIS.HOST}api/member/${mid}`, 'GET', {}, true)
      .then((response) => {
        if (response.status === 200 && response.data.length) {
          setData(response.data[0]);
          let { custom_field, descendant } = response.data[0];
          custom_field && setCustomField(JSON.parse(custom_field));
          descendant && setDescendant(JSON.parse(descendant));
        } else {
          setData('Sorry, No Records Found');
        }
      })
      .catch((error) => {
        setData(error);
      });
  }, [mid]);

  return (
    <div>
      <SimpleHeader name='profile view' />
      <div className='container'>
        {typeof data === 'string' ? (
          <div className='p-2 m-2 text-center text-bold text-large text-uppercase text-error' >{data}</div>
        ) : (
          <div className='columns' style={{ margin: 30 }} >
            <div
              className='panel mt-2 column col-12 text-center'
              style={{
                boxShadow:
                  showInfo === 'info' && 'rgb(136 136 136) 15px 15px 40px',
              }}
            >
              <div
                className='panel-header bg-success text-white text-large c-hand'
                onClick={() => {
                  setShowInfo('info');
                }}
              >
                <header className='navbar'>
                  <section className='text-large'>
                    <div className='panel-title'>
                      <h4>
                        <b>{data.member_name}'s</b>
                        &nbsp; Personal Information
                      </h4>
                    </div>
                  </section>
                  <section className='navbar-section'>
                    <button
                      className='btn tooltip tooltip-bottom btn-success'
                      data-tooltip='edit'
                    >
                      <i className='icon icon-edit'></i>
                    </button>
                  </section>
                </header>
              </div>
              {showInfo === 'info' && (
                <div id='infoPanel'>
                  <div className='panel-header text-center'>
                    <figure
                      className='avatar'
                      style={{ height: '8rem', width: '8rem' }}
                    >
                      <img
                        src={data.photo ? `data:${data.photo}` : image}
                        alt='profile_pic'
                      />
                    </figure>
                    <div className='panel-title h5 mt-10'>
                      {data.member_name} Age {caculateAge(data.dob)}
                    </div>
                  </div>
                  <PersonalInfo data={data} />
                  <div className='panel-footer'>
                    Last Modified:&nbsp;&nbsp;
                    {data.modified_time
                      ? new Date(data.modified_time).toLocaleDateString()
                      : GenericWords.NA}
                  </div>
                </div>
              )}
            </div>
            <div
              className='panel mt-2 column col-12 text-center'
              style={{
                boxShadow:
                  showInfo === 'addInfo' && 'rgb(136 136 136) 15px 15px 40px',
              }}
            >
              <div
                className='panel-header bg-primary text-white c-hand'
                onClick={() => {
                  setShowInfo('addInfo');
                }}
              >
                <div className='panel-title'>Additional information</div>
              </div>
              {showInfo === 'addInfo' && (
                <div id='infoPanel'>
                  <AdditionalInfo data={data} customField={customField} />
                </div>
              )}
            </div>
            <div
              className='panel mt-2 column col-12 text-center'
              style={{
                boxShadow:
                  showInfo === 'chlInfo' && 'rgb(136 136 136) 15px 15px 40px',
              }}
            >
              <div
                className='panel-header text-white c-hand'
                onClick={() => {
                  setShowInfo('chlInfo');
                }}
                style={{ backgroundColor: '#fcba03' }}
              >
                <div className='panel-title'>
                  Children(s) &nbsp;&nbsp;
                  {(descendant && descendant.length) || 0}
                </div>
              </div>
              {showInfo === 'chlInfo' && (
                <div id='infoPanel' style={{ backgroundColor: '#fff2cf' }}>
                  <ChildrenList data={descendant} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
