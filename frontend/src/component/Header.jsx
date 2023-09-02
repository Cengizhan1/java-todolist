
// rcc
import React, { Component } from 'react'

// I18N
import { withTranslation } from 'react-i18next';

// ROUTER
import { Link } from 'react-router-dom';

// Language
import OtherLanguageServices from "../internationalization/OtherLanguageServices";

// Flag (Dil)
import tr from "../img/flag/tr.png"
import en from "../img/flag/en.png"


// CLASS COMPONENT
class Header extends Component {

    // Component görünen ismi
    static displayName = "Blog_Header";

    // Constructor
    constructor(props) {
        super(props);

        // STATE
        this.state = {}

        // BIND
    } //end constructor

    internationalizationLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        OtherLanguageServices.headerLanguageServices(language);
    }

    //RENDER
    render() {

        //RETURN
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="task/list"> <i className={this.props.logo}></i></Link>
                        <button
                            className="navbar-toggler d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId"
                            aria-controls="collapsibleNavId"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#" aria-current="page">
                                        Home <span className="visually-hidden">(current)</span>
                                    </a>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                <a  href="#" onClick={() => this.internationalizationLanguage('tr')}>
                                           <img src={tr} alt="" className="rounded-circle" style={{width:"50px",marginRight:"10px"}}  />
                                        </a>
                                </li>
                                <li className="nav-item">
                                <a  href="#" onClick={() => this.internationalizationLanguage('en')}>
                                <img src={en} alt=""  style={{width:"40px",marginRight:"10px"}}  />
                                        </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </React.Fragment>
        ) //end return
    } //end render
} //end class

// Higher Order Component
export default withTranslation()(Header);