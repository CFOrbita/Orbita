import React, {Component} from "react";

class App extends Component{
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <React.Fragment>
          <header className="header">
            <div className="header-menu">
              <span className="toggle-button">
                 <div className="menu-bar menu-bar-top"></div>
                 <div className="menu-bar menu-bar-middle"></div>
                 <div className="menu-bar menu-bar-bottom"></div>
              </span>
              <div className="menu-wrap">
                <div className="menu-sidebar">
                  <ul className="menu">
                    <li>
                      <a href="#">Зал</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="workout.html">
                        Тренировка
                      </a>
                      <span className="sidebar-menu-arrow">
                        <i className=" fas fa-angle-down fa-sm"></i>
                      </span>
                      <ul className="sub-menu">
                        <li><a href="#">Дневник</a></li>
                        <li><a href="#">Комплексы</a></li>
                        <li><a href="#">Питание</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Контакты</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="heading">
              <a className="header-title" href="#">Orbita</a>
            </div>

            <p>Нужно войти в личный кабинет или зарегестрироваться (справа в углу)</p>
          </header>
          <main>

          </main>
        <footer className="footer">
          <div className="footer-wrapper container">
            <ul className="footer__list">
              <li className="footer__list-item">
                <a className="footer__list-link" href="donation.html">
                  Пожертвовать
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link" href="wishes.html">
                  Пожелания
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link contacts" href="#">
                  Контакты
                </a>
              </li>
            </ul>
            <p className="footer__text">Designed by Dimasick & Maxsick</p>
            <p className="footer__text">2018г. Все права защищены. Перепечатка запрещена.</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
