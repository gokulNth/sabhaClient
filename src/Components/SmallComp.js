import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { caculateAge, canNavigate, GenericWords, RequestAPI } from '../Utils/Constant';
import { TextBox } from './UtilComp';

function ElectionTableHead(props) {
  const { searchQuery, handleChange } = props;
  return (
    <tr>
      <th className='text-center' style={{ minWidth: '5rem' }}>
        #
      </th>
      <th>
        <TextBox
          id='member_name'
          name='Member Name'
          onChange={(e) => handleChange('member_name', e.target.value)}
          value={searchQuery.member_name}
        />
      </th>
      <th>
        <TextBox
          id='father_name'
          name='Father Name'
          onChange={(e) => handleChange('father_name', e.target.value)}
          value={searchQuery.father_name}
        />
      </th>
      <th>
        <TextBox
          id='id'
          name='ID'
          onChange={(e) => handleChange('id', e.target.value)}
          value={searchQuery['id']}
          type='number'
        />
      </th>
      <th className='text-center'>Is Voted</th>
      <th className='text-center'>Phone Number</th>
      <th className='text-center'>Locality</th>
      <th className='text-center'>Token number</th>
      <th className='text-center'>Voting Mode</th>
    </tr>
  );
}

function Table({ data: list }) {
  return list.map((data, index) => (
    <tr key={index}>
      <th scope='row' className='text-center'>
        {index + 1}
      </th>
      <td>
        {canNavigate(`/api/member/${data.id}`)
          ? <Link to={`/${data.id}`}>
            <div className='text-primary'>{data.member_name}</div>
          </Link>
          : <div className='text-primary'>{data.member_name}</div>
        }
      </td>
      <td>{data.father_name || GenericWords.NA}</td>
      <td>{data.id}</td>
    </tr>
  ));
}

function ElectionTableData(props) {
  const {
    showToastFn,
    showVoted,
    showMode,
    data: dataMem,
    changeVoteCount,
  } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataMem);
  }, [dataMem]);
  return data.map((singleData, index) => (
    <tr key={index}>
      <td className='text-center'>{singleData.id}</td>
      <ElectionBody
        data={singleData}
        showToastFn={showToastFn}
        showMode={showMode}
        showVoted={showVoted}
        changeVoteCount={changeVoteCount}
        index={index}
      />
    </tr>
  ));
}

function ElectionBody(props) {
  const { data, showToastFn, showVoted, showMode } = props;
  const [singleData, setSingleData] = useState(data);
  useEffect(() => {
    setSingleData(data);
  }, [data]);
  const handleVote = (id, voted) => {
    const { changeVoteCount, showToastFn } = props;
    let [mode, mid] = (id || '').split('_');
    voted = voted === 1 ? 0 : 1;
    mid &&
      mode &&
      RequestAPI(
        `http://localhost:3001/api/update/vote/${mid}`,
        'POST',
        { mode, voted },
        true
      ).then((response) => {
        if (response.status === 200) {
          setSingleData({
            ...data,
            ...response.data,
          });
          changeVoteCount(voted ? 1 : -1);
        }
      })
        .catch((error) =>
          showToastFn({ toastMessage: error.message }, 'error')
        );
  };
  const {
    member_name,
    father_name,
    id,
    voted,
    photo,
    phone,
    address,
    token_number,
    mode,
    dob,
  } = singleData;
  return (
    <>
      <td
        className='c-hand text-primary'
        onClick={() => {
          photo &&
            showToastFn({
              toastMessage: `${member_name} Age ${caculateAge(dob)}`,
              toastImage: `data:${photo}`,
              additionalIfo: `Address ${address || GenericWords.NA}`,
            });
        }}
      >
        {member_name}
      </td>
      <td>{father_name}</td>
      <td>{id}</td>
      {showVoted && (
        <td className='c-hand text-center'>
          <div
            className={`label ${voted && 'label-success'}`}
            id={`N_${id}`}
            onClick={(e) => handleVote(e.target.id, voted)}
          >
            Voted
          </div>
        </td>
      )}
      <td className='text-center'>{phone}</td>
      <td className='text-center c-hand'>
        <div className='text-primary'>
          {address
            ? address.includes('Dindigul')
              ? 'Local'
              : 'Outside'
            : 'Local'}
        </div>
      </td>
      <td className='text-center'>
        <code>{token_number || 0}</code>
      </td>
      {showMode && (
        <td className='text-center container'>
          <div className='columns'>
            {/* {mode} */}
            <div
              className={`column c-hand label label-rounded m-1 ${voted && mode && mode.includes('E') && 'label-success'
                }`}
              id={`E_${id}`}
              onClick={(e) => handleVote(e.target.id, voted)}
            >
              Email
            </div>
            <div
              className={`column c-hand label label-rounded m-1 ${voted && mode && mode.includes('W') && 'label-success'
                }`}
              id={`W_${id}`}
              onClick={(e) => handleVote(e.target.id, voted)}
            >
              Whatsapp
            </div>
            <div
              className={`column c-hand label label-rounded m-1 ${voted && mode && mode.includes('P') && 'label-success'
                }`}
              id={`P_${id}`}
              onClick={(e) => handleVote(e.target.id, voted)}
            >
              Post
            </div>
            <div
              className={`column c-hand label label-rounded m-1 ${voted && mode && mode.includes('O') && 'label-success'
                }`}
              id={`O_${id}`}
              onClick={(e) => handleVote(e.target.id, voted)}
            >
              Online
            </div>
          </div>
        </td>
      )}
    </>
  );
}

function FilterMenu(props) {
  const { data, handleToggleModal, handleFilterValue } = props;
  const { vote, tkn, asc } = data;
  const [Isvote, setVote] = useState(vote);
  const [Istkn, setTkn] = useState(tkn);
  const [Isasc, SetAsc] = useState(asc);
  return (
    <div className={`modal active`} id='modal-id'>
      <div className='modal-overlay'></div>
      <div className='modal-container'>
        <div className='modal-header'>
          <div
            className='btn btn-clear float-right'
            onClick={handleToggleModal}
            aria-label='Close'
          ></div>
          <div className='modal-title h3 text-primary'>Filter Menu</div>
        </div>
        <div className='modal-body'>
          <div className='content'>
            <div className='form-group'>
              <label className='form-label'>
                <b>Sort By Voted</b>
              </label>
              <label className='form-radio form-inline'>
                <input
                  onChange={() => {
                    setVote(true);
                  }}
                  type='radio'
                  checked={Isvote}
                  name='IsVoted'
                />
                <i className='form-icon'></i> Voted
              </label>
              <label className='form-radio form-inline'>
                <input
                  onChange={() => {
                    setVote(false);
                  }}
                  type='radio'
                  checked={Isvote !== null && !Isvote}
                  name='IsVoted'
                />
                <i className='form-icon'></i> Not Voted
              </label>
            </div>
            <div className='form-group'>
              <label className='form-checkbox'>
                <input
                  onChange={() => {
                    setTkn(!Istkn);
                  }}
                  type='checkbox'
                  name='Sort_Token'
                />
                <i className='form-icon'></i>
                <b>Sort By Token Number</b>
              </label>
            </div>
            <div className='form-group'>
              <b>Ascending </b>
              <label className='form-switch form-inline'>
                <input
                  onChange={() => {
                    SetAsc(!Isasc);
                  }}
                  type='checkbox'
                />
                <i className='form-icon'></i>
                <b>Descending</b>
              </label>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            onClick={() => {
              handleFilterValue(Isvote, Istkn, Isasc);
              handleToggleModal();
            }}
            className='btn btn-success'
          >
            Submit
          </button>
          &nbsp;&nbsp;
          <button className='btn btn-light' onClick={handleToggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export { Table, ElectionTableData, ElectionTableHead, FilterMenu };
