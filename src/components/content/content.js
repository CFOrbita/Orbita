import React, {Component} from "react";

class Content extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main style={{marginTop: '64px'}}>
        <p>Нужно войти в личный кабинет или зарегестрироваться (справа в углу)</p>
      </main>
    );
  }
}

export default Content;
