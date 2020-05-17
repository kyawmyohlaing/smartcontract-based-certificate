import React, { Component } from 'react';
import { Container, Form, Button, Icon, Input, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import CertificateRegistry from '../ethereum/contracts/CertificateRegistry';
import Certificate from '../ethereum/contracts/Certificate';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

// TODO: import helper.js
import { fieldsAreValid, dateToEpoch } from '../helper';

class CertificateForm extends Component {

  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    certificateId: '',
    issueDate: '',
    date: '',
    loading: false,
    errorMessage: '',
    successMessage: '',
    txnHash: 0,
    marriageContractAddress: 0,
    blockWitnessed: 0,
  }

  // Date format: dd-mm-yyyy
  onDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '', successMessage: '' });

    // Form Validation: check date validity
    const fieldErrorMsg = fieldsAreValid(this.state);
    if (!fieldErrorMsg) {
      let { firstName, middleName, lastName, certificateId, issueDate } = this.state;
      const date = dateToEpoch(this.state.date);

      // Submitting form to the blockchain
      try {
        const accounts = await web3.eth.getAccounts();
        // (1) Create new certificate contract
        let transaction = await CertificateRegistry.methods
          .createCertificate(firstName, middleName, lastName, certificateId, issueDate, date)
          .send({ from: accounts[0] });
        // Update Web app
        this.setState({
          txnHash: transaction.transactionHash, blockWitnessed: transaction.blockNumber,
          successMessage: `Your certificates have been witnessed at block: ${transaction.blockNumber} and transaction hash: ${transaction.transactionHash} REDIRECTING NOW ...`
        })
        const contractAddress = transaction.events.ContractCreated.returnValues.contractAddress;
        Router.replaceRoute(`/certificates/${contractAddress}`);

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    } else {
      // If input fields have input errors:
      this.setState({ errorMessage: fieldErrorMsg });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container className='Cert-Container'>
      <Form onSubmit={ this.handleSubmit } error={!!this.state.errorMessage} success={!!this.state.successMessage} >
      <br></br>
        <div className='Form-Input-Label'><h5>On This Date</h5></div>
        <DateInput
          name='date'
          placeholder='Date'
          value={ this.state.date }
          iconPosition='left'
          onChange={ this.onDateChange }
        />
        <div className='Line-White-Space'/>

        <Form.Group widths='equal' className='Form-Group'>
            <Form.Input
              placeholder="First Name"
              value = { this.state.firsttName }
              onChange = { event => this.setState({firstName: event.target.value}) }
            />
            
            <Form.Input
              placeholder="Middle Name"
              value = { this.state.middleName }
              onChange = { event => this.setState({middleName: event.target.value}) }
            />
           
            <Form.Input
              placeholder="Last Name"
              value = { this.state.lastName }
              onChange = { event => this.setState({lastName: event.target.value}) }
            />
        </Form.Group>
        <div className='Line-White-Space'/>

        <div className='Form-Input-Label'>has completed all courses in the learning path</div>
        <div className='Form-Input-Label'><h3>Blockchain Professional</h3></div>
        <div className='Form-Input-Label'>a learning path on learn.kbtc.com.mm</div>
        <div className='Form-Input-Label'>Powered by KBTC Developer Skills Network</div>
        
        <div className='Line-White-Space'/>

        <Form.Group widths='equal' className='Form-Group'>
          <Form.TextArea
            placeholder='Certificate ID:'
            value={ this.state.certificateId }
            onChange={ event => this.setState({certificateId: event.target.value}) }
          />
          
          <Form.TextArea
            placeholder='Issue Date:'
            value={ this.state.issueDate }
            onChange={ event => this.setState({issueDate: event.target.value}) }
          />

        </Form.Group>

        <Message error header='oops!' content={ this.state.errorMessage } />
        <Message success header='yay!' content={ this.state.successMessage } />

        <Button loading={ this.state.loading } id='CertificateBtn' icon labelPosition='left'>
        <Icon name='heart' />
          Submit
        </Button>

      </Form>
      </Container>
    );
  }
};

export default CertificateForm;
