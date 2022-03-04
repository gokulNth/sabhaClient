import React from 'react';
import Header from '../Components/Banner';
import { Table } from '../Components/SmallComp';
import { APIS, debounce, constructQuery, RequestAPI } from '../Utils/Constant';
import { TextBox, LoadingComponent } from '../Components/UtilComp';
import { SubHeader } from '../Components/SubHeader';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      values: {
        member_name: '',
        id: '',
        father_name: '',
      },
      isSearch: false,
      isNext: true,
      limit: 0,
      isLogin: false,
    };
    this.dataLimit = 40;
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSearch = debounce(this.handleSearch.bind(this), 300);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.handleSearch(false);
    document.addEventListener('scroll', debounce(this.handleScroll.bind(this), 200))
    const login = JSON.parse(window.localStorage.getItem('login') || window.sessionStorage.getItem('login')) || null;
    if (login) {
      this.setState({ isLogin: login })
    }
  }

  handleScroll() {
    const { isNext } = this.state;
    if (isNext && window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight / (1.5)) {
      this.handleSearch(false);
    }
  }
  getData(url, toAdd) {
    const { data } = this.state;
    RequestAPI(url, 'GET', {}, true)
      .then((i) => {
        if (i.status === 200) {
          this.setState({
            data: toAdd ? i.data : [...data, ...i.data],
            isNext: i.data.length === this.dataLimit
          });
        }
      })
      .catch((e) => {
        this.setState({ data: e.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleChange(e) {
    const { id, value } = e.target;
    const { values } = this.state;
    const setValue = { [id]: value };
    this.setState({ values: { ...values, ...setValue } });
    this.handleSearch();
  }

  handleLogout() {
    if (window.localStorage.getItem('login')) {
      window.localStorage.removeItem('login');
      window.localStorage.removeItem('auth');
    }
    if (window.sessionStorage.getItem('login')) {
      window.sessionStorage.removeItem('login');
      window.sessionStorage.removeItem('auth');
    }
    this.setState({ isLogin: false });
  }

  handleSearch(toAdd = true) {
    const { limit, values } = this.state;
    let queryParams = constructQuery(values);
    this.setState({
      isSearch: !!queryParams.length,
      limit: toAdd ? 0 : limit + this.dataLimit
    });
    this.getData(`${APIS.HOST}api/member?limit=${toAdd ? 0 : limit},${this.dataLimit}${!!queryParams.length ? `&word=${queryParams}` : ''}`, toAdd);
  }

  render() {
    const { isLoading, data, values, isSearch, isLogin } = this.state;
    return (
      <div>
        <Header />
        <SubHeader
          total_count={data.length}
          isLogin={isLogin}
          isSearch={isSearch}
          handleLogout={this.handleLogout}
        />
        {isLoading ? (
          <LoadingComponent />
        ) : !data.map ? (
          data
        ) : (
          <div style={{ overflowX: 'scroll' }}>
            <table className='table table-hover table-striped'>
              <thead id='tablehead' className='bg-dark text-light p-relative'>
                <tr>
                  <th className='text-center' style={{ minWidth: 50 }}>
                    #
                  </th>
                  <th>
                    <TextBox
                      id='member_name'
                      name='Member Name'
                      onChange={this.handleChange}
                      value={values.member_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='father_name'
                      name='Father Name'
                      onChange={this.handleChange}
                      value={values.father_name}
                    />
                  </th>
                  <th>
                    <TextBox
                      id='id'
                      name='Member ID'
                      type='number'
                      onChange={this.handleChange}
                      value={values.id}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <Table data={data} />
              </tbody>
            </table>
            {this.state.isNext ? <LoadingComponent /> : ''}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
