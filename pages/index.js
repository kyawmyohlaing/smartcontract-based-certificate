import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Link } from '../routes'
import certificateRegistry from '../ethereum/contracts/CertificateRegistry';
import CertificateContract from '../ethereum/contracts/Certificate';
import { Card, Button, Container } from 'semantic-ui-react';
import { epochToDate } from '../helper';
import { Blacklist } from '../blacklist';
import FAQs from '../components/FAQs';
import _ from 'lodash';

class CertificateIndex extends Component {

  static async getInitialProps() {
    const deployedCertificates = await certificateRegistry.methods.getDeployedCertificates().call();
    // Omits blacklisted contract addresses from list, to not be shown
    const displayCertificates = _.difference(deployedCertificates, Blacklist);

    // Now contracts are rendered in LIFO order - perfect
    const allCertificates = displayCertificates.reverse();
    const size = allCertificates.length;

    const certificateContracts = await Promise.all(
      Array(size).fill().map((item, index) => {
        return CertificateContract(allCertificates[index]);
      })
    );

    // CertificateIndex are the actual marriage details that will be rendered
    const certificateItems = await Promise.all(
      Array(size).fill().map((item, index) => {
        return certificateContracts[index].methods.getCertificateDetails().call();
      })
    )
    return { allCertificates, certificateItems };
  }

  renderItems() {
    const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    const items = this.props.certificateItems.map((certificate, index) => {
      return {
        key: this.props.allCertificates[index],
        color: colors[index % colors.length],
        header: `${certificate[1]}${certificate[2]}${certificate[3]}`,
        meta: `Certified on ${epochToDate(certificate[6])}`,
        description: (
          <Link route={`/certificates/${this.props.allCertificates[index]}`}>
            <a className='certificates-link'>{ `${certificate[1]}`}</a>
          </Link>
          ),
        fluid: true
      }
    })

    return <Card.Group items= { items } className='Index-Cards' itemsPerRow={4} stackable={true} doubling={true}/>
  }

  render() {
    return (
      <Layout>
        <Container>
          <FAQs />
            <a name="certificates"><h2 className='certificates-Title'>Certificates</h2></a>
          { this.renderItems() }
        </Container>
      </Layout>
    )
  }
}

export default CertificateIndex;
