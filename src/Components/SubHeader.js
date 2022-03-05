import { Link } from 'react-router-dom';
import { canNavigate } from '../Utils/Constant';

function SubHeader(props) {
  const login = props.isLogin;
  return (
    <header className='navbar navbar-fixed p-2 m-2 text-large bg-gray'>
      <section className='show-sm hide-md hide-lg mt-2'>
        <div className='dropdown'>
          <button className='btn btn-link dropdown-toggle' tabIndex='0'>
            <i className='icon icon-more-vert'></i>
          </button>
          <ul className='menu' style={{ height: 'auto' }}>
            <li>
              {login
                ? <span className="btn btn-link">HI!&nbsp;&nbsp;{login.member_name}</span>
                : <Link to='/login' className='btn btn-link'>Login</Link>
              }
            </li>
            <li>
              {
                canNavigate('/election') ? <Link to='/election'>
                  <div className='btn btn-link'>Election Portal</div>
                </Link> : <></>
              }
            </li>
            {login
              ? <>
                <div className="divider text-center" data-content="Account"></div>
                <li className='btn btn-link' onClick={props.handleLogout}>Logout</li>
                <li className='btn btn-link'>Change Password</li>
              </>
              : null
            }
          </ul>
        </div>
      </section>
      <section className='navbar-section'>
        <div className='badge bg-dark show-sm hide-md hide-lg m-2 p-2' data-badge={props.total_count}>
          <span className='m-2'>448</span>
        </div>
        <div className='badge hide-sm bg-dark m-2 p-2' data-badge={props.total_count}>
          <span className='m-2'>Total Members: 448</span>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {props.isSearch && (
          <a href='/' className='btn btn-success'>
            Reset
          </a>
        )}
      </section>
      <section className='navbar-center text-primary text-large mt-2'>
        <h3>Member List</h3>
      </section>
      <section className='navbar-section hide-sm'>
        {login
          ? <div className="dropdown">
            <div className="btn btn-link dropdown-toggle" tabIndex="0">
              <span className="text-mute text-dark">HI!</span>
              &nbsp;&nbsp;
              {login.member_name} <i className="icon icon-caret"></i>
            </div>
            <ul className="menu">
              <li className='btn btn-link' onClick={props.handleLogout}>Logout</li>
              <li className='btn btn-link'>Change Password</li>
            </ul>
          </div>
          : <Link to='/login' className='btn btn-link'>Login</Link>
        }
        {
          canNavigate('/election') ? <Link to='/election'>
            <div className='btn btn-link'>Election Portal</div>
          </Link> : <></>
        }
      </section>
    </header>
  );
}

function ElectionSubHeader(props) {
  const { isFiltered, handleToggleModal, handleClear } = props;
  return (
    <header className='navbar p-2 m-2 text-large bg-gray'>
      <section className='show-sm show-md hide-lg mt-2'>
        <div className='dropdown'>
          <button className='btn btn-link dropdown-toggle' tabIndex='0'>
            <i className='icon icon-more-vert'></i>
          </button>
          <ul className='menu'>
            <li>
              <Link to='/' className="btn btn-link">
                <i className='icon icon-x icon-back'></i>
                &nbsp;&nbsp;
                Back
              </Link>
            </li>
            <li>
              <div className={`btn ${isFiltered ? 'btn-success' : 'btn-link'}`}>
                <span onClick={handleToggleModal}>Filter</span>
                {isFiltered && (
                  <span
                    className='btn btn-clear float-right'
                    onClick={handleClear}
                  ></span>
                )}
              </div>
            </li>
            <li>
              {
                canNavigate('/election/online') ? <Link to='/election/online'>
                  <div className='btn btn-link'>Online Votes</div>
                </Link> : <div className='btn btn-link'>Online Votes</div>
              }
            </li>
            <li>
              {
                canNavigate('/election/offline') ? <Link to='/election/offline'>
                  <div className='btn btn-link'>Offline Votes</div>
                </Link> : <div className='btn btn-link'>Offline Votes</div>
              }
            </li>
          </ul>
        </div>
      </section>
      <section className='navbar-section'>
        <div className='label label-rounded'>Vote Count: {props.count}</div>
      </section>
      <section className='navbar-center hide-sm hide-md text-primary text-large'>
        <h3>Vote Monitering</h3>
      </section>
      <section className='text-primary text-large show-sm show-md hide-lg'>
        <h3>Vote Monitering</h3>
      </section>
      <section className='navbar-section hide-sm hide-md'>
        <div>
          <Link to='/' className="btn btn-primary">
            <i className='icon icon-x icon-back'></i>
            &nbsp;&nbsp;
            Back
          </Link>
          <div className={`btn ${isFiltered ? 'btn-success' : 'btn-link'}`}>
            <span onClick={handleToggleModal}>Filter</span>
            {isFiltered && (
              <span
                className='btn btn-clear float-right'
                onClick={handleClear}
              ></span>
            )}
          </div>
          {
            canNavigate('/election/online') ? <Link to='/election/online'>
              <div className='btn btn-link'>Online Votes</div>
            </Link> : <div className='btn btn-link'>Online Votes</div>
          }
          {
            canNavigate('/election/offline') ? <Link to='/election/offline'>
              <div className='btn btn-link'>Offline Votes</div>
            </Link> : <div className='btn btn-link'>Offline Votes</div>
          }
        </div>
      </section>
    </header>
  );
}

function SimpleHeader(props) {
  return (
    <header className='navbar p-2 m-2 text-large bg-gray'>
      <section className='navbar-section hide-sm hide-md'>
        {props.children}
      </section>
      {props.children && (
        <section className='show-sm show-md hide-lg p-2'>
          <div className='dropdown'>
            <button className='btn btn-link dropdown-toggle' tabIndex='0'>
              <i className='icon icon-more-vert'></i>
            </button>
            <ul className='menu'>
              {props.children &&
                props.children.map((i, index) => (
                  <li className='menu-item' key={index}>
                    {i}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
      <section className='navbar-center text-capitalize text-primary p-2 text-large'>
        <h3>{props.name}</h3>
      </section>
      <section className='navbar-section'>
        <a href={props.onBack || '/'} className='btn btn-link'>
          <i className='icon icon-cross'></i>
        </a>
      </section>
    </header>
  );
}

export { ElectionSubHeader, SubHeader, SimpleHeader };
