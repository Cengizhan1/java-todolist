import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import OtherLanguageServices from "../internationalization/OtherLanguageServices";
import tr from "../img/flag/tr.png"
import en from "../img/flag/en.png"

class Header extends Component {
    static displayName = "Blog_Header";

    handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    }

    internationalizationLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        OtherLanguageServices.headerLanguageServices(language);
    }

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="project/list"> <i className={this.props.logo}></i></Link>
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
                                    <Link className="nav-link active" to="project/list" aria-current="page">
                                        Home <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <a href="#" onClick={() => this.internationalizationLanguage('tr')}>
                                        <img src={tr} alt="" className="rounded-circle" style={{width:"50px",marginRight:"10px"}}  />
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" onClick={() => this.internationalizationLanguage('en')}>
                                        <img src={en} alt=""  style={{width:"40px",marginRight:"10px"}}  />
                                    </a>
                                </li>
                                {localStorage.getItem("accessToken") ? (
                                    <li className="nav-item">
                                        <span className="nav-link">{t('welcome')} {localStorage.getItem("username")}</span>
                                    </li>
                                ) : null}
                                {localStorage.getItem("accessToken") ? (
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link" onClick={this.handleLogout}>{t('logout')}</button>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default withTranslation()(Header);
