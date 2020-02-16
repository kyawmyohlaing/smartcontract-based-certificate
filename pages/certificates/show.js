import React, { Component } from 'react';
import { Container, Grid, Button, Icon } from 'semantic-ui-react';
import Certificate from '../../ethereum/contracts/Certificate';
import Layout from '../../components/CertificateLayout';
import WitnessedByFooter from '../../components/WitnessedByFooter';
import Bell from '../../components/Bell';
import Withdraw from '../../components/Withdraw';
import web3 from '../../ethereum/web3';
import Head from 'next/head'

class CertificatesShow extends Component {
  state = {
    WithdrawVisible: false
  }
	// Retrieve the certificate contract instance to show the details
	static async getInitialProps(props) {
		const address = props.query.address;
    const certificate = Certificate(address);
		const certificateDetails = await certificate.methods.getCertificateDetails().call();
    const owner = certificateDetails[0];
    const firstName = certificateDetails[1];
    const middleName = certificateDetails[2];
    const lastName = certificateDetails[3];
    const certificateId = certificateDetails[4];
    const issueDate = certificateDetails[5];
    const date = certificateDetails[6];
    const bellCounter = certificateDetails[7];

    const weiBalance = await certificate.methods.getBalance().call();
    const balance = await web3.utils.fromWei(weiBalance, 'ether');

    return {
      address, owner, firstName, middleName, lastName, certificateId, issueDate, date, bellCounter, balance
    };
	}

  async componentDidMount() {
    const viewerAddress = await web3.eth.getAccounts();
    if (this.props.owner == viewerAddress[0]) {
      this.setState({WithdrawVisible: true});
    }
  }

  epochToDate(numString) {
    const date = new Date(parseInt(numString));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[month]} ${day}, ${year}`;
    return dateString;
  }

  trunc(text){
    return (text.length > 300) ? `${text.substr(0, 300)} ...` : text;
  }

	render() {
		return (
		  <Layout>
        <Head>
          <meta property="og:title" content={this.props.leftName + this.props.middleName + this.props.lastName}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content={'http://forevermore.io' + this.props.url.asPath}/>
          <meta property="og:image" content="http://forevermore.io/static/OGFormImg.png"/>
          <meta property="og:site_name" content="Forevermore.io"/>
          <meta property="og:description"
                content={'See ' + this.props.firstName + "'s" + this.props.middleName + "'s" + this.props.lastName + "'s recording certificates on the blockchain"}/>
        </Head>
        {(this.state.WithdrawVisible) && <Withdraw address={this.props.address} balance={this.props.balance}/> }
        <Container className='Cert-Container'>

          <div className='Large-Cursive'>On {this.epochToDate(this.props.date)}</div>
          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Large-Serif'>{ this.props.firstName }</Grid.Column>
            
            <Grid.Column className='Large-Serif'>{ this.props.middleName }</Grid.Column>
            <Grid.Column className='Large-Serif'>{ this.props.lastName }</Grid.Column>
          </Grid>

          <div className='Form-Input-Label'>Were united in eternal matrimony</div>
          <div className='Form-Input-Label'>In accordance with the following Certificates</div>

          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.certificateId) }</Grid.Column>
            <Grid.Column width={1}> </Grid.Column>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.issueDate) }</Grid.Column>
          </Grid>

          <div className='Large-Cursive'>Ring the Bell</div>
          <Bell address={this.props.address}/>

          <WitnessedByFooter address={this.props.address}/>
        </Container>
		  </Layout>
		)
	}
}

export default CertificatesShow;
