import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

class NavBar extends Component {
  state = {
    pageTop: true,
    navBackground: 'transparent',
    navButtonColor: 'white'
  }

  handleScroll = () => {
     let windowsScrollTop  = window.pageYOffset;
     // bc the 1/4 of the hero is 400. Hacky I know.
     if(windowsScrollTop >= 100) {
      this.setState({ pageTop: false })
     } else {
      this.setState({ pageTop: true })
     }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  render() {
    return (
      <Menu id='Nav-Bar'
        className={" " + (this.state.pageTop ? 'Top' : 'Past-Top')}
        >
        <Link route="/">
          <a className="Nav-Logo">
           <img className="Nav-Logo-Img" src={`../static/Logo.png`}/>
           <p className="Nav-Logo-Text">Myanmar Blockchain</p>
          </a>
        </Link>

        <Menu.Menu position="right">
            <a
              href="#certificates" 
              className={"Nav-Buttons " + (this.state.pageTop ? 'Top' : 'Past-Top')}>
                <font color="brown">Certificates</font></a>
          <Link route="/certificates/new">
            <a
              className={"Nav-Buttons " + (this.state.pageTop ? 'Top' : 'Past-Top')}
              >
                <font color="brown">Add Certificate</font></a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
