import React, { Component } from 'react';
import { ElectionSubHeader } from '../Components/SubHeader';
import { LoadingComponent } from '../Components/UtilComp';
import { debounce, constructQuery, RequestAPI } from '../Utils/Constant';
import {
  ElectionTableData,
  ElectionTableHead,
  FilterMenu,
} from '../Components/SmallComp';

class ElectionPage extends Component {
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
    this.handleFilterValue = this.handleFilterValue.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
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
    this.setState({ isLoading: true });
    const { vote: Isvote, tkn: Istkn, asc: Isasc, searchQuery } = this.state;
    let queryParams = constructQuery(searchQuery);
    const query = `http://localhost:3001/api/searchall?word=${Isvote === null ? '' : Isvote ? 1 : 0
      }%voted${queryParams.length ? `,${queryParams}` : ''}&sort=${Istkn ? 'token_number' : 'id'
      }%${Isasc ? 'desc' : 'asc'}`;
    RequestAPI(query, 'GET', {}, true).then(({ data, status }) => {
      if (status === 200) {
        this.setState({ data });
      }
    }).catch((error) => {
      this.setState({ data: error });
    })
    this.setState({ isLoading: false });
  }

  handleClearFilter() {
    this.setState({
      vote: null,
      tkn: false,
      asc: false,
      isFiltered: false,
    });
    this.handleSearchData();
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
        <ElectionSubHeader
          count={count}
          token_number={data.token_number}
          isFiltered={isFiltered}
          handleClear={this.handleClearFilter}
          handleToggleModal={this.handleToggleModal}
        />
        {isLoading ? (
          <LoadingComponent />
        ) : !data.map ? (
          <div className='p-2 m-2 text-center text-bold text-large text-uppercase text-error' >{data}</div>
        ) : (
          <div style={{ overflowX: 'scroll' }}>
            <table style={{ overflow: 'hidden' }} className='table table-hover'>
              <thead className='bg-dark text-light'>
                <ElectionTableHead
                  searchQuery={searchQuery}
                  handleChange={this.handleChange}
                />
              </thead>
              <tbody style={{ overflow: 'scroll' }}>
                <ElectionTableData
                  data={data}
                  showToastFn={showToastFn}
                  changeVoteCount={this.changeVoteCount}
                  showVoted
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

export default ElectionPage;
