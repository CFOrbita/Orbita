import React from "react";

const Footer = props => {
  return (
    <React.Fragment>
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
          <p className="footer__text">2018-2019г. Все права защищены. Перепечатка запрещена.</p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
