import { createButton } from '../button/Button';
import casLogo from '../../../docs/img/CAS_logo.svg'; // Adjust path as needed
import userAvatar from '../../../docs/img/construction.png';

export const createNavigation = ({ user, onLogout, onLogin, onCreateAccount }) => {
  const navigation = document.createElement('nav');
  navigation.className = 'navbar navbar-expand-md';

  const wrapper = document.createElement('div');
  wrapper.className = 'container-fluid';

  const logo = `
    <a href="#" aria-label="Link to home" class="navbar-brand bg-white p-1 shadow-none">
      <img src="${casLogo}" alt="CAS Logo" height="24" />
    </a>
  `;

  const navItems = `
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav me-auto mb-2 mb-md-0">
      <li class="nav-item">
        <a class="nav-link px-2 active" href="#">XPress</a>
      </li>
      <li class="nav-item">
        <a class="nav-link px-2" href="#">Project Costs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link px-2" href="#">Reports</a>
      </li>
      <li class="nav-item">
        <a class="nav-link px-2" href="#">Project Information</a>
      </li>
      <li class="nav-item">
        <a class="nav-link px-2" href="#">Vendor Information</a>
      </li>
    </ul>
  </div>
  `;

  wrapper.insertAdjacentHTML('afterbegin', logo);
  wrapper.insertAdjacentHTML('beforeend', navItems);

  const actionButtons = `
    <div class="mx-2">
      <button class="btn btn-sm btn-icon" type="button">
        <i class="fa-solid fa-print"></i>
      </button>
    </div>
  `;

  wrapper.insertAdjacentHTML('beforeend', actionButtons);

  const account = document.createElement('div');
  if (user) {
    const userDropdown = `
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div data-status="Online" style="padding: 4px 8px 0 8px; justify-content: center; align-items: center; gap: 4px; display: inline-flex">
              <div data-size="16px" style="width: 16px; height: 16px; position: relative; background: var(--Background-primary, #20252C); box-shadow: 0px 0px 0px 3px #B9E4FE; overflow: hidden; border-radius: 10000px">
                <div data-identity="Man w/sweatshirt" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute; overflow: hidden">
                  <img style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute;" src="${userAvatar}" />
                </div>
              </div>
            </div>
            Username
            <i class="fa-solid fa-caret-down ms-1"></i>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg-end">
            <li>
              <h6 class="dropdown-header">Role</h6>
            </li>
            <li>
              <a class="dropdown-item" type="button">
                <i class="fa-solid fa-print"></i> Access Level A
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item" type="a">
                <i class="fa-solid fa-print"></i> Change Password
              </a>
            </li>
            <li>
              <a class="dropdown-item" type="button">
                <i class="fa-solid fa-print"></i> My Configuration
              </a>
            </li>
            <li>
              <a class="dropdown-item" type="a">
                <i class="fa-solid fa-print"></i> Email Administrator
              </a>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <a class="dropdown-item" type="a"><i class="fa-solid fa-print"></i> Log Out</a>
            </li>
          </ul>
        </li>
      </ul>
    `;
    account.innerHTML = userDropdown;
  } else {
    account.appendChild(createButton({ size: 'sm', outline: true, label: 'Log in', onClick: onLogin }));
    account.appendChild(
      createButton({
        size: 'small',
        label: 'Sign up',
        onClick: onCreateAccount,
        primary: true,
        outline: false
      })
    );
  }
  wrapper.appendChild(account);
  navigation.appendChild(wrapper);

  return navigation;
};
