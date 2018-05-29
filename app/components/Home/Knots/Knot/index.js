// @flow
/*
 * Knots
 * Copyright 2018 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc. (http://data.world/).
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import moment from 'moment';

import getLogo from '../../../../logos';
import styles from './Knot.css';

type Props = {
  knot: {
    name: string,
    lastRun: string,
    tap: { name: string },
    target: { name: string }
  },
  delete: ({ name: string }) => void,
  download: ({ name: string }) => void,
  history: { push: (path: string) => void },
  loadValues: (name: string) => void,
  loadKnot: (knot: {}) => void
};

type State = {
  showDelete: boolean
};

class Knot extends Component<Props, State> {
  state = {
    showDelete: false
  };

  toggleDelete = () => {
    this.setState({
      showDelete: !this.state.showDelete
    });
  };

  download = () => {
    this.props.download(this.props.knot);
  };

  fullSync = () => {
    const { knot } = this.props;
    this.props.loadKnot(knot);

    this.props.history.push(`/sync?knot=${knot.name}&mode=full`);
  };

  partialSync = () => {
    const { knot } = this.props;
    this.props.loadKnot(knot);

    this.props.history.push(`/sync?knot=${knot.name}&mode=partial`);
  };

  edit = () => {
    const { name } = this.props.knot;
    this.props.loadValues(name);
  };

  render() {
    const { knot } = this.props;
    return (
      <tr key={knot.name}>
        <td className="align-middle text-center pr-0">
          <img
            alt={`${knot.tap.name} logo`}
            className={styles.logo}
            src={getLogo(knot.tap.name)}
          />
        </td>
        <td className="align-middle px-0 text-muted text-center">
          <span className="oi oi-chevron-right" />
        </td>
        <td className="align-middle text-center pr-0">
          <img
            alt={`${knot.target.name} logo`}
            className={styles.logo}
            src={getLogo(knot.target.name)}
          />
        </td>
        <th className="align-middle">{knot.name}</th>
        <td className="align-middle">{moment(knot.lastRun).fromNow()}</td>
        <td className="fit align-middle">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              style={{ background: 'white' }}
              type="button"
              className="btn btn-link"
              data-toggle="tooltip"
              data-placement="top"
              title="Run"
              onClick={this.partialSync}
            >
              <span className="oi oi-media-play" />
            </button>
            <button
              style={{ background: 'white' }}
              type="button"
              className="btn btn-link-secondary"
              data-toggle="tooltip"
              data-placement="top"
              title="Full sync"
              onClick={this.fullSync}
            >
              <span className="oi oi-reload" />
            </button>
            <button
              style={{ background: 'white' }}
              type="button"
              className="btn btn-link-secondary"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
              onClick={this.edit}
            >
              <span className="oi oi-pencil" />
            </button>
            <button
              style={{ background: 'white' }}
              type="button"
              className="btn btn-link-secondary"
              data-toggle="tooltip"
              data-placement="top"
              onClick={this.download}
              title="Download"
            >
              <span className="oi oi-cloud-download" />
            </button>
            <button
              style={{ background: 'white' }}
              type="button"
              className="btn btn-link-secondary"
              data-toggle="tooltip"
              data-placement="top"
              onClick={this.toggleDelete}
              title="Delete"
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </td>
        <Modal isOpen={this.state.showDelete} toggle={this.toggleDelete}>
          <ModalHeader toggle={this.toggleDelete}>
            Delete <strong>{knot.name}</strong>?
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete <strong>{knot.name}</strong>? Once
            you delete a Knot, there is no going back.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" outline onClick={this.toggleDelete}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.props.delete(this.props.knot);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </tr>
    );
  }
}

// $FlowFixMe
export default withRouter(Knot);