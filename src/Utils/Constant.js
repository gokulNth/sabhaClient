import axios from "axios";

export const secretKey = "Science is a way of life. Science is a perspective. Science is the process that takes us from confusion to understanding in a manner that's precise, predictive and reliable - a transformation, for those lucky enough to experience it, that is empowering and emotional."

export const APIS = { HOST: 'http://localhost:3001/' };
// let child = {
//   id: "",
//   member_name: "",
//   phone: null,
//   dob: '2005-09-03',
//   email_id: 'madesh35k@gmail.com',
//   marital_status: null,
//   spouse_name: null,
//   custom_field: null,
// };

export const Icons = {
  manIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB9klEQVRIicXXuWsVURTH8U/cXl6ChSbycIsELC1EQzCVuBRq4YJoZWGrBm0CWkpA0X9CLGwULbRKYeXWWYgxroiISlxxC4oKWtwZnAzznrnjRH9wYJg5v/e93OWc+/hPaovI7cA2rEUvujCBhxjBRXyvcnA1DOMTfraIe1hRFbSBW38AZuMFdgizUVqzcTUCmo3PGCoLPlgSmo19sdCZeFIB+C06Y8BrKoCmsbMIMKMJuD9mlBk9L3i3Mga8LBL4Qzhy/fiS+9ZdZJjV5IfaW0DG8RHv8Ew4bmeEPQGncCCT/7XlkHM6avI6vcd+LJ6Cd13OezgGvCtn3hLh7c55t8aAezPGcc33QpHahHVO/UtiwPA0MZ6ONeJa4n0Ua5yXmL6hrwR4QKjbY5gbYzwi7NbsNLXjAjYU5G9MvmVPQyfu4lARoNnaLcSocFxS1bEaPQX5S7EqyUk1gdsi13iPUIVqMaac6niJ3bGm+zivXG9t4BLuKDH4HtxUblefxQ0sKuEF2/EacyI8dXzA+rJQwgXvFQYjPENCDWjWB6asQWGTFHaZnBp4g71/C+X33euK1lNew3VcFm4wlWgBHuOc4pZZFwrIA8yvCppquVACx4SSmGpAqFCjQnOZFnXguHB9PYGTyfMxk6vWtGmz8LdlBJv+BbAy/QLYDrSL1CXGLwAAAABJRU5ErkJggg==`,
  womanIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACIElEQVRIic3XT4hOURzG8Y93DGIsDNMgZIeNoQxFImwpRSnZWYil1IhGSdZWSmRDDVnMAovZIUoWirIbZDKoCTUhM814Le59c+e+5/55xzvxq1+3e855nu855557zr38o5hVsl0rtmI31qAD8zCEAfThZzM71orjMaCak0PY1yxoBx4UAJM5ifPYiPnThS7Eqwag6fyGy1jUKPj2X0CTOYiVZaHdTYLW8hlayoBvNRlcxZEiaAu+zAD4cRF4wwxAayu+PQmqpMDLi3qWE6N4nlFXwfo88JJpQqs4IdpERjPaTBlUGjw2DeiYaHe7iWFczGg3J89kh/LPbQJ30JXyWIzxQPu9eeC1BbBhXMdhLM3xGQhot+SB2zKA73AIs/PEibgU8FhdJPqaEnzGiriuU/26EJd1Ju5Ppjx+ST3jkEn6XL2B97HxMHoCmp64rgafDHiOJwtCU5fuzGB8HUEv+gOaftHIRuL7jlR97oom+qqYMHWaTheJAnFX/TNelWyQHt129SfJugahc7EtUL4nT9SnvqefYrOycTDgUcWjLEG3+mmu5dEGwPczPKqiV7IuruYIBrGgBHSz6NXJ8nkaErXhFF5niK4VQCt4kqH9gAtYVtTzLtFqvoc3iVHkrfBefzaLt6IpP4tNwvtFqWjDfnyPzZI/AhWcww8cEH2hNj124iNe4EycL0Urf1cjRmV/YZLRjmOiIxQe4opoT///4zdAQTMrZ9f9qAAAAABJRU5ErkJggg==`,
  phoneIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABH0lEQVRIibXUzyqEURjH8Y8/ZUMmNsrOGpFcgY1cAnIDWFCTjRXlGqRZWLOQbKxkyQ3IzoKm/NmKjXktZiZv03k173H86unU6fT91jnPefjn9AX2ZrGBNzynFi7jAxnqGEkJ32qB83WcCr6ARkCQYSmFYL8AnuEJlVhwb2t9+OXMONb/KrjUvKKivMcK8rkQvqIXDKcQzOMrINhOAW/nKCC4wUAqwSDuApIz9KeSTGk+aqekhp5UklXhj1cTnl9RqQYEGU79vElFswl2RXbaQYHktgV+ze09ihwrOwWSojrBaFlJVfEwDFUd02UlK8LdVVR7ZQUwifsu4J+YiRHAEA6Fx0q71mLh+czhvEPUwGb+UIqfOYZFTOAK1wmY3ecbaWiPm/1WQNYAAAAASUVORK5CYII=`,
  whatsappIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABoElEQVRIia3WPWtUQRQG4Gc3QZB82OmWxm4tbGzyCwTFX6AWilVibCLWQSVYWImt+CuEaLSyUWxUIqiFKNEmQSt3CcaPtZi55DqZ7N57yYEDw5x33nfOmXMPl3rWir5v1sEVrOIrfmE7rh9jHkeaEE9hGX0MRngPtzBZlfwY3lYgTn0NM1XINxuQF74xTGSq4c1zmWTLtZwBf8KzBiI3U/KO3Q/6HtMxvlJToCfproUM6HIpfqZBFvNlgdUM4FQpPoYfNQUeQTsSdNOa4URpfVWNPo92vFi0ha8zvcFHHIyY+zVvP4ic7SL9v3uA7kaBQ3jVVAC+DQFejJjDQl2L/Qe4Lsyl3Ln1cr2eDhH4iXMR18J53MN43DuA25lzK2WBayPS/YOlEmlqFzJn5sqADrZGiAzwDpeEsVJYFx8SXE8o6X/2sIJA4X08x4uYXRq/kZK3hUlYtxVz/gYTqcDJfSLfwNH05nA6VWxga5jF51wwHcm/8Vq1h+8JNd9VlsJa+I6XuIOzwpdLGLmLeGLnjbbxRejzOZlu2UukKq7Wb8s/v4I/ruJylfUAAAAASUVORK5CYII=`,
  mobileIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABTElEQVRIid2WsU4CQRCGP4iFxmewocXC3tgaibGBF+ANfAQtxAegtLHkAeh9Aysw0YIGSOjBaKDRgtsznMPeztxyif7JFnc3s9/O/ruTgz+gS2AKfCnHBGgUAU8MUDfG2cmqCnAPeDMu+siYV0iuarXawCtwEnU5OaoD76xXPCgLegi88LNVC0XuPbBk84AtgU5I8mMm8UkBXiCf7rkvqQb0haSWAtxBrvhOCj4AboFPATpEd/WCdQWMBKAbzSRuP3A+yWPRZ1/XeQYqSdxNIHibx7989oHPk5ga8BEIljwWffaBnfqZ5ygKAWtaXxSPLeBcj3dyRYAusBLer5Jv6Wn1VZKNqWwL1GhXFQf36rI8Tu9wmR6n/sI/9DhXe4Yca/fa2ClX8TXrU2fVKXCmSXDgLnAMPAAzA7hKJO8lRf2h16hhhI+BiyLgqPoG3ZznAZ4FUYEAAAAASUVORK5CYII=`,
  emailIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABF0lEQVRIie3UrU4DQRSG4adACAkBgWpCL4YECwocDhw4DLeAQCJBgcPhUNhKMCi4gN4A/zCInibb7d9uaRFkv+RkZ+ec+d7N7MyhUqX/rDrukKYUD2jkoevxXEFzCtBmeGdZ4A3bMV7EzQSht1gO7028ZMEJn9iN93lcTQB6jYXw3MFHzHeBE75xGHOzOPsF9AJz4XWAr0yuB9yJ45iv4WQM6ClmwuOoT34guMjiQVHko4eCEy4z27Wf26585H/T+ZDakeB+B+S9T03Zg1kI3LkSS1G7gedM7hVbkSt6FQuDk+4msIYnPMaYcs2nFDhpt71VvarjvoRPaXBCC3vafbcR41ZJD7UM+C9VmxldMx1V4EqVKo2tHyQBI8f7rsAXAAAAAElFTkSuQmCC`,
  telePhoneIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABYElEQVRIie3VP0scQRzG8Y9yKB4XgogWgmkiV2m0U0wEsc1LuipC+tTBJnkdsTpJOPUFqGBr/oCFIZxiClPcLBzr7ji32aS6B37F7Pye5zvLzM4y1lj/SBOPzD/BLrbRxnPMYQpPQ8817nCFC5yjiwP8GnVBs3iHPu4rVj9kzKZCF3CWEPwz1GN9p5hPAe9HQjphYY2h/kZ41on43qeAv5eYb9GM+Jqhp8j7LQV8U2L+lOA9KPH2U8DHQ4bfOMQbLCV4l0LvYfBmOUcp4HXs4TVaBfM9fImMM7VCxl7IrKQpvDXYq7ID9DX0TFeF5LWIzxFgvk7w7G+hW7gcAZrVD+xUhW4qvrm28CoyHj7JG2XhkxHwR8yUeCYi40wz+BDJL9Sa6nd0vl4UAcreeHXUlUa0Mgp4ORL00uA3WTbOq10XOHWPU7IeqKe+Pe6lQrs1QrPq5iGxz6lO3f8nzlhj8Qc8fNVn3j9E4QAAAABJRU5ErkJggg==`,
  clsEyeIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADTUlEQVRoge3ZbaifcxjA8c92djiej8NOYTVWI81jWhIvjlZStiQzKyFCklK8shSlkOyFN0tJyMorJUmNrLSRnbBsa5uIRcZYWhwPm83txfX7u+/knPvhf//XKfe37s7//M/1ux7u39N1XYeOjo6Ojo7mzGlR1wiuwAQuwLk4AydgGD/jAD7HLmzCe9jfog99MYGXhKNZzecw3sZtOPZoO95jBSYLTv2Fj7EWq3AJxsRMDeFULMZ1eATv4PfC+G/xkKMY0GJsKDjwPR7Foga6RnEXthb0fSGCHSh3YyoZ3I/7xRtvg2uxTR7Qczi+Jd3/MIwXCkZexmltG8E8PChfcp/grDYNvJkUT2F1m4qn4UJ8lmx+g/ltKB3CPuzFZW0orMgY3sUfYl+2wihObEtZDeaIe6ijo6Me88oE5mMPnhy8L425GYdw40xCC5LQEZHJzjbGxFWQYWWZ8NokuE3c6LOJ54VvH6hQgpwibtNMJIOzhWvESjkkMutKLEuDjmD5YPyqxdn4Ubzch+sOfjwNPIDz2/WrFifj0+TLBpEy1WIuXk8KvsOSNr2ryCg+TD7sTr834jhsTIp+wKVteFeR00XFmeErLOxX4Wp5HfIr7uxXYQWuxNcFu5f3q3BCXuT03k6GV8Qba5tjsAZ/JjsH08/tGG+qdKm8M7IufbcSP6XvfsFj2it1V4h6PROn5bOiOuyVv7tEe6kWS0RNnmG92Pg9FuEt+ezsxVM4r4Hz46JzsrOgbweu+pfMdg1m5hzRmsnwhulv96uxpeBAJo7JdbhVVJMLRUE2It7uRbgeT4sG3cHC2D243X8fr7WDOVM+vRuVL5sH5LPSm8E6z2/4Mn1+scRWrWB6G3oLTipRPCKfueVi+S0Vm3U9Nhf+3ruLJvEanhDZw4hYqofF7CyoEczkTIKbkkCVVs998tNspgSuF8hMvJpknqlgdxwficSxb4bFms5wQ4lslUAuFi3XKYPpl03LPfITZm6JbJVAyNuwa/pzrTrD8g26qoJ81UCWJbl9IjUaOHckgzuVzwbVAyFPEO9t5lo9didjt1SUrxPITfJMd+C8n56qdUGdQIbE0b+1gV8Dp04gNPx3YGl/qAU2qxdIHdmOjo7/G38DDzAH/KxnPOcAAAAASUVORK5CYII=`,
  opnEyeIcon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABXElEQVRIie2UQUtCQRSFP8JdUta2HkFCj/6ERH+lWvkLWtR/cWkIbsRACCTbuMhFCzcmLdxWoFItX4s5L+fNG/W1MFp44MJwz7mHmXtnBtb479gFykADGAFfipFyZWl+jRxwCUyBaElMpc1lNd8HupZBCzgDQmBTESrXsnRd1S7EATBUwTNQyrChEjBQzVAeXuSBvoT3QMHiAqAGTBR1nSLGNtBWbV9eKVQk6DmCAHgj3ft3cfYGe+IqrvmJiE+g6HA1cQ1gD9PnpnI3jrYoj0ieP+goee052UScPcBAubFHfyWuA7DhkJGnYBF8etcTmLXoAzh0uLq4JuYUAXCrXNXRHmEeYqpFMBvyI+auxwgxA3WH/EqybVvAE3OGDMlr2sZcvRgBZqBjRdUx3wEeWHJNIfnQBmR7aKfACxkeWgzfV3EOHGtnea0vgDtLl+mriLHSz87Gyr7rNf4O31JZhMjSyXpfAAAAAElFTkSuQmCC`
};
export const GenericWords = {
  NA: '--NA--',
};

export function caculateAge(date) {
  if (date) {
    return new Date().getFullYear() - new Date(date).getFullYear();
  }
  return GenericWords.NA;
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

let timerId;
export function throttle(func, timeout = 300) {
  if (timerId) {
    return;
  }
  timerId = setTimeout(function () {
    func();
    timerId = undefined;
  }, timeout);
}

export function constructQuery(searchQuery) {
  let queryParams = '';
  Object.keys(searchQuery).forEach((key) => {
    if (searchQuery[key].trim() !== '')
      queryParams += `${searchQuery[key]}%${key},`;
  });
  queryParams = queryParams.length
    ? `${queryParams.substring(0, queryParams.length - 1)}`
    : '';
  return queryParams;
}

export function canNavigate(url) {
  let loginDetails = JSON.parse(window.localStorage.getItem('login') || window.sessionStorage.getItem('login'));
  if (url.includes('/api/member?')) return true;
  if (loginDetails) {
    if (loginDetails.profile === 1) {
      if (url.includes(`/${loginDetails.id}`) || url.includes('/api/child/')) return true;
    } else if (loginDetails.profile === 2) {
      if (url.includes('/searchall') || url.includes('/election') || url.includes('/online') || url.includes('/offline')) {
        return false;
      } else {
        return true;
      }
    } else if (loginDetails.profile === 3) {
      if (url.includes(`/update/vote`) || url.includes('/api/child/') || url.includes(`/${loginDetails.id}`) || url.includes('/searchall') || url.includes('/election') || url.includes('/online') || url.includes('/offline')) {
        return true;
      }
    } else if (loginDetails.profile === 4) {
      return true;
    }
  }
  return false;
}

function callAPI(url, method, queryParams = {}) {
  let login = window.localStorage.getItem('login') || window.sessionStorage.getItem('login');
  let auth = window.localStorage.getItem('auth') || window.sessionStorage.getItem('auth')
  const header = {
    headers: {
      Authorization: auth,
      Details: login ? JSON.parse(login) ? JSON.parse(login).id : "" : ""
    }
  }
  return new Promise((resolve) => {
    if (method === 'POST') {
      axios.post(url, queryParams, header).then((response) => {
        resolve(response);
      })
    } else {
      axios.get(url, header).then((response) => {
        resolve(response);
      })
    }
  })
}

export function RequestAPI(url, method, queryParams = {}, needAuth = false) {
  return new Promise((resolve, reject) => {
    if (needAuth) {
      if (canNavigate(url)) {
        resolve(callAPI(url, method, queryParams))
      } else {
        reject('Can\'t access the page');
      }
    } else {
      resolve(callAPI(url, method, queryParams))
    }
  })
}