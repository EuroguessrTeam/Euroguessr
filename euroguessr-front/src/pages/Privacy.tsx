import React from 'react';
import { Fade } from 'react-awesome-reveal';
import '../styles/privacy/privacy.scss';

export const Privacy = () => {
    return (
        <fieldset>
            <legend>Privacy</legend>

            <Fade cascade direction='down' damping={0.005} triggerOnce>
                <p>
                    At Euroguessr, accessible from <a target='_blank' className='link' href="https://euroguessr.com">https://euroguessr.com</a>,
                    one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected
                    and recorded by Euroguessr and how we use it.
                </p>

                <p>
                    If you have additional questions or require more information about our Privacy Policy,
                    do not hesitate to contact us.
                </p>

                <p>
                    This Privacy Policy applies only to our online activities and is valid
                    for visitors to our website with regards to
                    the information that they shared and/or collect in Euroguessr.
                    This policy is not applicable to any information
                    collected offline or via channels other than this website.
                </p>

                <h1>Consent</h1>

                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                <h1>Information we collect</h1>

                <p>Euroguessr do not collect any personal information about you, but only data related to your progression and
                    scores
                    you make.</p>

                <p>
                    The data we store are 100% anonymous, as we only store a unique account id to save your progressions. From this
                    account id, it is not possible to get personal information about you, like your name, or your location.
                </p>

                <h1>How we use the data we collect</h1>

                <p>The data we store does not contain any personal information about you.</p>

                <p>The anonymous data about scores and progress that we store is used to :</p>

                <ul>
                    <li>Save your progress to improve your user experience on our website</li>
                    <li>See how many daily user are using our website to improve, personalize, and expand our website</li>
                    <li>Find and delete inactive accounts</li>
                </ul>


                <h1>Log Files</h1>

                <p>Euroguessr follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

                <h1>Cookies and Web Beacons</h1>

                <p>When you go for the first time on "Euroguessr.com", a unique account id is generated, and will be stored in a
                    cookie
                    on your browser.</p>

                <p>This cookie do not collect any personal information about you and only store your unique account id, which is
                    used to
                    save your progress and scores.</p>

                <p>This cookie is essential for the proper operation of the site, and serves as a 100% anonymous unique identifier
                    for
                    logging in to your account.</p>

                <p>Like any other website, Euroguessr uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

                <h1>GDPR Data Protection Rights</h1>

                <p>As mentioned above, Euroguessr does not store any personal data about you but only your score data. The GDPR does
                    not
                    apply to our activities.</p>
                <p>However, if you still wish to delete all your progress data and scores, including your account, you can send an
                    e-mail containing your unique account ID to <a className='link' href="mailto:contact@Euroguessr.com">contact@euroguessr.com</a>,
                    and
                    we will delete all the data related to your account (scores, attempts...), including you account.</p>

                <h1>Changes to This Privacy Policy</h1>

                <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
                    changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are
                    effective immediately, after they are posted on this page.</p>

                <h1>Contact Us</h1>

                <p>If you have any questions or suggestions about our website or our Privacy Policy, do not hesitate to contact us
                    at <a className='link' href="mailto:contact@Euroguessr.com">contact@euroguessr.com</a></p>

            </Fade>
                
        </fieldset>
    );
}