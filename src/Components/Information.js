import { Link } from 'react-router-dom';
import { GenericWords, Icons } from '../Utils/Constant';

function PersonalInfo(props) {
  const { mother_name, father_id, father_name, address, phone, whatsapp, dob } =
    props.data;
  return (
    <div className='panel-body'>
      <table
        className='table text-center container'
        style={{
          borderTop: '2px solid',
          backgroundColor: '#ccffd3',
          width: '90%',
          boxShadow: 'rgb(136 136 136) 15px 15px 30px',
        }}
      >
        <tbody>
          <tr>
            <th>Parents Name</th>
            <td className='columns'>
              <span className='column'>
                <img src={`${Icons.manIcon}`} alt='father' />
              </span>
              <span className='column text-left'>
                {father_name ? father_name : GenericWords.NA}&nbsp;
                {father_id && <Link to={`/${father_id}`}>{father_id}</Link>}
              </span>
            </td>
            <td className='columns'>
              <span className='column'>
                <img src={`${Icons.womanIcon}`} alt='mother' />
              </span>
              <span className='column text-left'>
                {mother_name || GenericWords.NA}
              </span>
            </td>
          </tr>
          <tr>
            <th scope='columns'>Address</th>
            <td colSpan='2'>{address || GenericWords.NA}</td>
          </tr>
          <tr>
            <th scope='columns'>Phone Number</th>
            <td className='columns'>
              <span className='column'>
                <img src={`${Icons.phoneIcon}`} alt='phone' />
              </span>
              <span className='column text-left'>
                {phone || GenericWords.NA}
              </span>
            </td>
            <td className='columns'>
              <span className='column'>
                <img src={`${Icons.whatsappIcon}`} alt='whatsapp' />
              </span>
              <span className='column text-left'>
                {whatsapp || GenericWords.NA}
              </span>
            </td>
          </tr>
          <tr>
            <th scope='columns'>Date Of Birth</th>
            <td colSpan='2'>
              {dob ? new Date(dob).toDateString() : GenericWords.NA}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
    </div>
  );
}

function AdditionalInfo(props) {
  const { data, customField } = props;
  return (
    <div className='collapsible-body bg-secondary'>
      <table
        className='table text-center container'
        style={{ width: '70%', boxShadow: 'rgb(136 136 136) 15px 15px 30px' }}
      >
        <tbody>
          <tr>
            <th>Member ID</th>
            <td className='text-left'>{data.id}</td>
          </tr>
          <tr>
            <th>Email ID</th>
            <td className='text-left'>{data.email_id || 'NA'}</td>
          </tr>
          <tr>
            <th>Gher Navu</th>
            <td className='text-left'>{data.gher_navu || 'NA'}</td>
          </tr>
          <tr>
            <th>Gothru</th>
            <td className='text-left'>{data.gothru || 'NA'}</td>
          </tr>
          <tr>
            <th>Marital Status</th>
            <td className='text-left'>
              {(data.marital_status || 'NA').toUpperCase()}
            </td>
          </tr>
          {data.marital_status === 'married' && (
            <tr>
              <th>Spouse Name</th>
              <td className='text-left'>{data.spouse_name || 'NA'}</td>
            </tr>
          )}
          {customField &&
            customField.map((i, key) => (
              <tr key={key}>
                <th>{i.label}</th>
                <td className='text-left'>{i.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
    </div>
  );
}

export { PersonalInfo, AdditionalInfo };
