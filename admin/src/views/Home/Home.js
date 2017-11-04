import { Component } from 'react';
import NaviHeader from '../../components/NaviHeader.js';
import { connectApp } from 'ayano-react';
import './Home.scss';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.repo.fetchRepo();
  }

  render() {
    const { repo = {} } = this.props.repo;
    const { owner = {}, html_url } = repo;
    const { url, login } = owner;
    return (
      <div id="home-page">
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    repo: state.repo
  }
}

export default connectApp(mapStateToProps)(Home);
