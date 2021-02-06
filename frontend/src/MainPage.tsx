import PropTypes from 'prop-types';
import React from 'react';
import './App.css';
import './index.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLatestContests } from './share-func/HttpRequest';

// URL: /
function ContestCard(props: any) {
  const contest = props.contest;
  return (
    <Card>
      <Link to={`/contest/${contest.shortName}`}>
        <Card.Header>{contest.name}</Card.Header>
      </Link>
      <Card.Text>{`Type: ${contest.contestType} ${contest.startTime} ~ ${contest.endTime}`}</Card.Text>
    </Card>
  );
}

ContestCard.propTypes = {
  contest: PropTypes.object,
};

class ContestList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      contests: null,
    };
  }
  componentDidMount() {
    getLatestContests().then((contests) => {
      this.setState({
        contests: contests,
      });
    });
  }

  render() {
    let contestCards = <div />;
    if (this.state.contests !== null) {
      contestCards = this.state.contests.map((contest: any) => {
        return <ContestCard contest={contest} key={contest.name} />;
      });
    }
    return (
      <div>{contestCards ? <div>{contestCards}</div> : <p>loading...</p>}</div>
    );
  }
}

export class MainPage extends React.Component {
  render() {
    return <ContestList />;
  }
}