import React from 'react';
import { debounce, constructQuery, RequestAPI } from '../Utils/Constant';
import { ElectionTableData, FilterMenu } from './SmallComp';
import { SimpleHeader } from './SubHeader';
import { TextBox, LoadingComponent } from './UtilComp';

class OnlineVotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchQuery: {
        member_name: '',
        father_name: '',
        id: '',
      },
      isLoading: false,
      count: 0,
      modalActive: false,
      vote: null,
      asc: false,
      tkn: false,
      isFiltered: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchData = debounce(this.handleSearchData.bind(this), 300);
    this.changeVoteCount = this.changeVoteCount.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleFilterValue = this.handleFilterValue.bind(this);
  }
  componentDidMount() {
    this.handleSearchData();
  }
  changeVoteCount(num) {
    const { count } = this.state;
    this.setState({ count: count + num });
  }
  handleFilterValue(Isvote, Istkn, Isasc) {
    this.setState({ vote: Isvote, tkn: Istkn, asc: Isasc, isFiltered: true });
    this.handleSearchData();
  }
  handleToggleModal() {
    this.setState({ modalActive: !this.state.modalActive });
  }
  handleChange(id, value) {
    const { searchQuery } = this.state;
    this.setState({
      searchQuery: Object.assign(searchQuery, { [id]: value }),
    });
    this.handleSearchData();
  }

  handleSearchData() {
    const { vote: Isvote, tkn: Istkn, asc: Isasc, searchQuery } = this.state;
    let queryParams = constructQuery(searchQuery);
    const query = `http://localhost:3001/api/online?word=${Isvote === null ? '' : Isvote ? 1 : 0
      }%voted${queryParams.length ? `,${queryParams}` : ''}&sort=${Istkn ? 'token_number' : 'id'
      }%${Isasc ? 'desc' : 'asc'}`;
    RequestAPI(query, 'GET', {}, true).then(({ data, status }) => {
      if (status === 200) {
        this.setState({ data });
      }
    }).catch(err => {
      this.setState({ data: err });
    })
  }
  render() {
    const {
      data = [],
      searchQuery,
      isLoading,
      count,
      modalActive,
      vote,
      tkn,
      asc,
      isFiltered,
    } = this.state;
    const { showToastFn } = this.props;
    return (
      <div>
        {modalActive && (
          <FilterMenu
            data={{ vote, tkn, asc }}
            handleToggleModal={this.handleToggleModal}
            handleFilterValue={this.handleFilterValue}
          />
        )}
        <SimpleHeader name='online vote list' onBack='/election'>
          <div className='btn btn-link'>Online Votes: {count}</div>
          <div className={`btn ${isFiltered ? 'btn-success' : 'btn-link'}`}>
            <span onClick={this.handleToggleModal}>Filter</span>
            {isFiltered && (
              <span
                className='btn btn-clear float-right'
                onClick={() => {
                  this.setState({
                    vote: null,
                    tkn: false,
                    asc: false,
                    isFiltered: false,
                  });
                  this.handleSearchData();
                }}
              ></span>
            )}
          </div>
        </SimpleHeader>
        {isLoading ? (
          <LoadingComponent />
        ) : !data.map ? (
          <div className='p-2 m-2 text-center text-bold text-large text-uppercase text-error' >{data}</div>
        ) : (
          <div style={{ overflowX: 'scroll' }}>
            <table style={{ overflow: 'hidden' }} className='table table-hover'>
              <thead className='bg-dark text-light'>
                <tr>
                  <th className='text-center' style={{ minWidth: '5rem' }}>
                    #
                  </th>
                  <th>
                    <TextBox
                      id='member_name'
                      name='Member Name'
                      onChange={(e) =>
                        this.handleChange('member_name', e.target.value)
                      }
                      value={searchQuery.member_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='father_name'
                      name='Father Name'
                      onChange={(e) =>
                        this.handleChange('father_name', e.target.value)
                      }
                      value={searchQuery.father_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='id'
                      name='ID'
                      onChange={(e) => this.handleChange('id', e.target.value)}
                      value={searchQuery['id']}
                      type='number'
                    />
                  </th>
                  <th className='text-center'>Phone Number</th>
                  <th className='text-center'>Locality</th>
                  <th className='text-center'>Token number</th>
                  <th className='text-center'>Voting Mode</th>
                </tr>
              </thead>
              <tbody style={{ overflow: 'scroll' }}>
                <ElectionTableData
                  data={data}
                  showToastFn={showToastFn}
                  changeVoteCount={this.changeVoteCount}
                  showMode
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

class OfflineVotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchQuery: {
        member_name: '',
        father_name: '',
        id: '',
      },
      isLoading: false,
      count: 0,
      modalActive: false,
      vote: null,
      tkn: false,
      asc: false,
      isFiltered: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchData = debounce(this.handleSearchData.bind(this), 300);
    this.changeVoteCount = this.changeVoteCount.bind(this);
    this.handleFilterValue = this.handleFilterValue.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
  }
  componentDidMount() {
    this.handleSearchData(this.state.searchQuery);
  }
  changeVoteCount(num) {
    const { count } = this.state;
    this.setState({ count: count + num });
  }
  handleFilterValue(Isvote, Istkn, Isasc) {
    this.setState({ vote: Isvote, tkn: Istkn, asc: Isasc, isFiltered: true });
    this.handleSearchData();
  }
  handleToggleModal() {
    this.setState({ modalActive: !this.state.modalActive });
  }
  handleChange(id, value) {
    const { searchQuery } = this.state;
    this.setState({
      searchQuery: Object.assign(searchQuery, { [id]: value }),
    });
    this.handleSearchData();
  }

  handleSearchData() {
    const { vote: Isvote, tkn: Istkn, asc: Isasc, searchQuery } = this.state;
    let queryParams = constructQuery(searchQuery);
    const query = `http://localhost:3001/api/offline?word=${Isvote === null ? '' : Isvote ? 1 : 0
      }%voted${queryParams.length ? `,${queryParams}` : ''}&sort=${Istkn ? 'token_number' : 'id'
      }%${Isasc ? 'desc' : 'asc'}`;
    RequestAPI(query, 'GET', {}, true).then(({ data, status }) => {
      if (status === 200) {
        this.setState({ data });
      }
    }).catch(err => {
      this.setState({ data: err });
    })
  }

  render() {
    const {
      data,
      searchQuery,
      isLoading,
      count,
      modalActive,
      vote,
      tkn,
      asc,
      isFiltered,
    } = this.state;
    const { showToastFn } = this.props;
    return (
      <div>
        {modalActive && (
          <FilterMenu
            data={{ vote, tkn, asc }}
            handleToggleModal={this.handleToggleModal}
            handleFilterValue={this.handleFilterValue}
          />
        )}
        <SimpleHeader name='offline vote list' onBack='/election'>
          <div className='btn btn-link'>Offline Votes: {count}</div>
          <div className={`btn ${isFiltered ? 'btn-success' : 'btn-link'}`}>
            <span onClick={this.handleToggleModal}>Filter</span>
            {isFiltered && (
              <span
                className='btn btn-clear float-right'
                onClick={() => {
                  this.setState({
                    vote: null,
                    tkn: false,
                    asc: false,
                    isFiltered: false,
                  });
                  this.handleSearchData();
                }}
              ></span>
            )}
          </div>
        </SimpleHeader>
        {isLoading ? (
          <LoadingComponent />
        ) : !data.map ? (
          <div className='p-2 m-2 text-center text-bold text-large text-uppercase text-error' >{data}</div>
        ) : (
          <div style={{ overflowX: 'scroll' }}>
            <table style={{ overflow: 'hidden' }} className='table table-hover'>
              <thead className='bg-dark text-light'>
                <tr>
                  <th className='text-center' style={{ minWidth: '5rem' }}>
                    #
                  </th>
                  <th>
                    <TextBox
                      id='member_name'
                      name='Member Name'
                      onChange={(e) =>
                        this.handleChange('member_name', e.target.value)
                      }
                      value={searchQuery.member_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='father_name'
                      name='Father Name'
                      onChange={(e) =>
                        this.handleChange('father_name', e.target.value)
                      }
                      value={searchQuery.father_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='id'
                      name='ID'
                      onChange={(e) => this.handleChange('id', e.target.value)}
                      value={searchQuery['id']}
                      type='number'
                    />
                  </th>
                  <th className='text-center'>Is Voted</th>
                  <th className='text-center'>Phone Number</th>
                  <th className='text-center'>Locality</th>
                  <th className='text-center'>Token number</th>
                </tr>
              </thead>
              <tbody style={{ overflow: 'scroll' }}>
                <ElectionTableData
                  data={data}
                  showToastFn={showToastFn}
                  changeVoteCount={this.changeVoteCount}
                  showVoted
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export { OnlineVotes, OfflineVotes };
