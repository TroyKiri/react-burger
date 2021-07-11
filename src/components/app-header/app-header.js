import headerStyles from './app-header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav className={headerStyles.nav}>
        <ul className={headerStyles.list}>
          <li className={headerStyles.container}>
            <a href='##' className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 mr-2`}>
              <BurgerIcon />
              <p className='text text_type_main-default pl-2'>Конструктор</p>
            </a>
            <a href='##' className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4`}>
              <ListIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
            </a>
          </li>
          <li className={headerStyles.container}>
            <a href='##' className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4 mb-4 mt-4`}>
              <ProfileIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
    </header>
  )
}

export default AppHeader;
