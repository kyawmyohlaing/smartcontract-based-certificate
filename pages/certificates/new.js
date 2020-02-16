import React, { Component } from 'react';
import Layout from '../../components/CertificateLayout'
import CertificateForm from '../../components/CertificateForm'
import { Link } from '../../routes'

class CertificatesNew extends Component {
	render () {
		return (
  		<Layout>
        <CertificateForm />
      </Layout>
    )
	}
}

export default CertificatesNew;