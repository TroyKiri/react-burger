import React from 'react';
import headerStyles from './app-header.module.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    return (
      <header className={headerStyles.header}>
        <div className={headerStyles.container}>
          <div className={headerStyles.container + ' pl-5 pr-5 pb-4 pt-4 mb-4 mt-4 mr-2'}>
            <BurgerIcon />
            <p className='text text_type_main-default pl-2'>Конструктор</p>
          </div>
          <div className={headerStyles.container + ' pl-5 pr-5 pb-4 pt-4 mb-4 mt-4'}>
            <ListIcon type="secondary" />
            <p className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</p>
          </div>
        </div>
        <div className={headerStyles.container + ' pl-5 pr-5 pb-4 pt-4 mb-4 mt-4'}>
          <ProfileIcon type="secondary" />
          <p className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</p>
        </div>
        <div className={headerStyles.logo}>
          <Logo />
        </div>
      </header>
    )
  }
}

export default AppHeader;
