import { useEffect, useState } from 'react';
import { APIS, RequestAPI } from '../Utils/Constant';

function ChildInfo(props) {
  const { child: data } = props;

  return (
    <div className='columns m-2 mt-2'>
      <div className='column col-12'>
        <table
          style={{
            backgroundColor: data.id ? '#ccffd3' : '#ffcccc',
            boxShadow: 'rgb(136 136 136) 15px 15px 30px',
            width: '70%',
          }}
          className='table container'
        >
          <tbody>
            <tr>
              <th>Member ID</th>
              <td>
                {data.id ? (
                  data.id
                ) : (
                  <>
                    --Not a member--
                    <div
                      className='btn tooltip tooltip-bottom btn-success btn-sm'
                      data-tooltip='add'
                      style={{ marginLeft: '30px' }}
                    >
                      <i className='icon icon-plus'></i>
                    </div>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{data.phone || 'NA'}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{data.dob || 'NA'}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td>{data.email_id || 'NA'}</td>
            </tr>
            {(data.custom_field || []).map((field, key) => (
              <tr key={key}>
                <th>{field.label}</th>
                <td>{field.value}</td>
              </tr>
            ))}
            <tr>
              <th>Marital Status</th>
              <td>{data.marital_status || 'NA'}</td>
            </tr>
            {data.marital_status === 'married' && (
              <tr>
                <th>Spouse Name</th>
                <td>{data.spouse_name || 'NA'}</td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    </div>
  );
}

export default function ChildrenList(props) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  useEffect(() => {
    (props.data || []).forEach((i) => {
      if (i.id) {
        RequestAPI(`${APIS.HOST}api/child/${i.id}`, 'GET', {}, true).then(
          (response) => {
            if (response.status === 200) {
              setData((data) => [...data, ...response.data]);
            } else {
              setData('No data found');
            }
          }
        );
      } else {
        setData((data) => [...data, i]);
      }
    });
  }, [props.data]);
  return (
    <div className='panel-body'>
      {data.length ? (
        <ul className='tab tab-block m-2'>
          {(data || []).map((i, index) => (
            <li
              className={`tab-item`}
              onClick={() => setSelectedId(index.toString())}
              key={index}
            >
              <div
                className={`text-dark btn btn-block ${i.id ? 'btn-success' : 'btn-error'
                  }`}
                style={{
                  backgroundColor: i.id
                    ? index.toString() === selectedId
                      ? '#3bff52'
                      : '#ccffd3'
                    : index.toString() === selectedId
                      ? '#ff3b3b'
                      : '#ffcccc',
                }}
              >
                {i.member_name}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-center m-2'>
          <b>No Data Entered</b>
        </div>
      )}
      {selectedId && <ChildInfo child={data[selectedId]} />}
    </div>
  );
}
