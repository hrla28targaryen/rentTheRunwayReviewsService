import React from 'react';
import style from './Footer.scss';

const Footer = () => (
    <div className={style.footerContainer}>
        <div className={style.footerWrapper}>
            <div className={style.footerTop}>
                <div className={`${style.footerContent} ${style.getHelpFooter}`}>
                    <span className={style.label}>Get Help</span>
                    <ul>
                        <li><a href="">How it Works</a></li>
                        <li><a href="">FAQs</a></li>
                        <li><a href="">Getting Started</a></li>
                        <li><a href="">Style & Fit</a></li>
                        <li><a href="">My Order</a></li>
                        <li><a href="">Subscription</a></li>
                        <li><a href="">Get $30</a></li>
                        <li><a href="">Gift Cards</a></li>
                    </ul>
                </div>
                <div className={`${style.footerContent} ${style.companyFooter}`}>
                    <span className={style.label}>Company</span>
                    <ul>
                        <li><a href="">Vision</a></li>
                        <li><a href="">Story</a></li>
                        <li><a href="">Community</a></li>
                        <li><a href="">The Shift</a></li>
                        <li><a href="">Giving Back</a></li>
                        <li><a href="">Sustainability</a></li>
                        <li><a href="">Press</a></li>
                        <li><a href="">Careers</a></li>
                    </ul>
                </div>
                <div className={`${style.footerContent} ${style.storesFooter}`}>
                    <span className={style.label}>Stores</span>
                    <ul>
                        <li><a href="">Chicago</a></li>
                        <li><a href="">NYC Flagship</a></li>
                        <li><a href="">San Francisco</a></li>
                        <li><a href="">Topanga</a></li>
                        <li><a href="">Washington, DC</a></li>
                    </ul>
                </div>
                <div className={`${style.footerContent} ${style.connectWithFooter}`}>
                    <div className={style.appPromoFooter}>
                        <div className={style.appFooterIcon}></div>
                        <div className={style.label}>Rent on the Run</div>
                        <a href="https://rtr.app.link/dsabSPp3GB" class="standalone">Download</a>
                    </div>
                    <div className={style.socialLinks}>
                        <div className={style.socialLinksTitle}>
                            <span className={style.label}>Be Social</span>
                        </div>
                        <div className={style.socialLinksTags}>
                            <a href=""><i class="fab fa-facebook-f fa-lg"></i></a>
                            <a href=""><i class="fab fa-instagram fa-lg"></i></a>
                            <a href=""><i class="fab fa-pinterest-p fa-lg"></i></a>
                            <a href=""><i class="fab fa-twitter fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.footerBottom}>
                <div className={style.footerCopyRight}>
                    <span>© 2019 Rent the Runway. All Rights Reserved.</span>
                </div>
                <div className={style.footerLegalRights}>
                    <div className={style.socialLinks}>
                        <a href="">Terms of Service</a>
                        <a href="">Privacy Policy</a>
                        <a href="">Accessibility Statement</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;