function TextBox(props) {
  const { id, name, onChange, value, type = 'text' } = props;
  return (
    <input
      className='form-input'
      style={{ width: '10rem' }}
      name={name}
      placeholder={name}
      id={id}
      onChange={onChange}
      value={value}
      type={type}
    />
  );
}

function ToastComp(props) {
  const {
    toastImage,
    toastMessage,
    mode = 'primary',
    hideToastFn,
    additionalIfo,
  } = props;
  const icon = mode === 'error' ? 'stop' : 'check';
  return (
    <div
      className={`toast toast-${mode} p-fixed`}
      style={{
        width: toastImage ? 265 : 400,
        right: '5%',
        top: 10,
        boxShadow: 'rgb(100, 100, 100) 15px 15px 30px',
        zIndex: 1,
      }}
    >
      {(mode === 'error' || mode === 'success') && (
        <i className={`icon icon-${icon} float-left m-1`}></i>
      )}
      {toastMessage}
      {toastImage && (
        <>
          <img src={`${toastImage}`} alt='profileImage' />
          <br />
        </>
      )}
      {mode === 'error' && (
        <button
          onClick={hideToastFn}
          className='btn btn-clear float-right'
        ></button>
      )}
      {additionalIfo && (
        <>
          <br />
          <br />
          {additionalIfo}
        </>
      )}
    </div>
  );
}

function LoadingComponent() {
  return (
    <h1 className='text-center'>
      Page Loading...
      <div className='loading loading-lg'></div>
    </h1>
  );
}

export { TextBox, LoadingComponent, ToastComp };
