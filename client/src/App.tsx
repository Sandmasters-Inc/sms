import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import JobList from './components/JobList/JobList';
import Job from './components/Job/Job';
import CreateJob from './components/Job/CreateJob';
import EditJob from './components/Job/EditJob';
import { CustomerList } from './components/CustomerList'
import { CreateCustomer } from './components/Customer';

class App extends React.Component {
  state = {
    customers: [],
    jobs: [],
    job: null,
    token: null,
    user: null
  };

  componentDidMount() {
    this.authenticateUser();
  }

  authenticateUser = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      localStorage.removeItem('user');
      this.setState({ user: null });
    }

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      axios
        .get('/api/auth', config)
        .then(response => {
          localStorage.setItem('user', response.data.firstName);
          this.setState(
            {
              user: response.data.firstName,
              token: token
            },
            () => {
              this.loadData();
            }
          );
        })
        .catch(error => {
          localStorage.removeItem('user');
          this.setState({ user: null });
          console.error(`Error logging in: ${error}`);
        });
    }
  };

  loadData = () => {
    this.loadJobs()
    this.loadCustomers()
  }

  loadJobs = () => {
    const { token } = this.state;

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      axios
        .get('/api/jobs', config)
        .then(response => {
          this.setState({
            jobs: response.data
          });
        })
        .catch(error => {
          console.error(`Error fetching jobs: ${error}`);
        });
    }
  }

  loadCustomers = () => {
    const { token } = this.state;

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      axios
        .get('/api/customers', config)
        .then(response => {
          this.setState({
            customers: response.data
          });
        })
        .catch(error => {
          console.error(`Error fetching customers: ${error}`);
        });
    }
  }

  logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null, token: null });
  };

  viewJob = job => {
    console.log(`view ${job.name}`);
    this.setState({
      job: job
    });
  };

  deleteJob = job => {
    const { token } = this.state;

    if (token) {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      axios
        .delete(`/api/jobs/${job._id}`, config)
        .then(response => {
          const newJobs = this.state.jobs.filter(p => p._id !== job._id);
          this.setState({
            jobs: [...newJobs]
          });
        })
        .catch(error => {
          console.error(`Error deleting job: ${error}`);
        });
    }
  };

  editJob = job => {
    this.setState({
      job: job
    });
  };

  onJobCreated = job => {
    const newJobs = [...this.state.jobs, job];

    this.setState({
      jobs: newJobs
    });
  };

  onJobUpdated = job => {
    console.log('updated job: ', job);
    const newJobs = [...this.state.jobs];
    const index = newJobs.findIndex(p => p._id === job._id);

    newJobs[index] = job;

    this.setState({
      jobs: newJobs
    });
  };

  onCustomerCreated = customer => {
    const newCustomers = [...this.state.customers, customer]

    this.setState({
      customers: newCustomers
    })
  }

  render() {
    let { user, jobs, job, customers, token } = this.state;
    const authProps = {
      authenticateUser: this.authenticateUser
    };

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Sandmasters</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>         
              {user && (
                <>
                <li><Link to="/new-customer">New Customer</Link></li>
                <li><Link to="/new-job">New Job</Link></li>
                </>
              )}      
              {user ? (
                <li><Link to="" onClick={this.logOut}>Log out</Link></li>
              ) : (
                <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Log in</Link></li>
                </>
              )}
            </ul>
          </header>
          <main>
            <Switch>
              <Route exact path="/">
                {user ? (
                  <>
                    <div>Hello {user}!</div>
                    <h2>Jobs</h2>
                    <JobList
                      jobs={jobs}
                      clickJob={this.viewJob}
                      deleteJob={this.deleteJob}
                      editJob={this.editJob}
                    />

                    <h2>Customers</h2>
                    <CustomerList
                      customers={customers}
                    />
                  </>
                ) : (
                  <>Please Register or Login</>
                )}
              </Route>
              <Route path="/jobs/:jobId">
                <Job job={job} />
              </Route>
              <Route path="/new-job">
                <CreateJob token={token} onJobCreated={this.onJobCreated} />
              </Route>
              <Route path="/edit-job/:jobId">
                <EditJob
                  token={token}
                  job={job}
                  onJobUpdated={this.onJobUpdated}
                />
              </Route>
              <Route path="/new-customer">
                {/* <CreateCustomerTest /> */}
                <CreateCustomer token={token} onCustomerCreated={this.onCustomerCreated} />
              </Route>
              <Route
                exact
                path="/register"
                render={() => <Register {...authProps} />}
              />
              <Route
                exact
                path="/login"
                render={() => <Login {...authProps} />}
              />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
