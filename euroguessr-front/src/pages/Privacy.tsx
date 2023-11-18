import React from 'react';

export const Privacy = () => {
    return (
        <fieldset className='pr-[10%] pl-[10%] w-full border-t-2 border-black'>
            <legend className='pl-[1vw] pr-[1vw] mb-[2vh] text-4xl font-bold'>Privacy</legend>

            <p className='pb-2 text-justify'>
                At Euroguessr, accessible from <a target='_blank' className='underline text-blue-500' href="https://euroguessr.com">https://euroguessr.com</a>,
                one of our main priorities is the privacy of our visitors.
                This Privacy Policy document contains types of information that is collected
                and recorded by Euroguessr and how we use it.
            </p>

            <p className='pb-2 text-justify'>
                If you have additional questions or require more information about our Privacy Policy,
                do not hesitate to contact us.
            </p>

            <p className='pb-2 text-justify'>
                This Privacy Policy applies only to our online activities and is valid
                for visitors to our website with regards to
                the information that they shared and/or collect in Euroguessr.
                This policy is not applicable to any information
                collected offline or via channels other than this website.
            </p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>Consent</h1>

            <p className='pb-2 text-justify'>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>Information we collect</h1>

            <p className='pb-2 text-justify'>Euroguessr do not collect any personal information about you, but only data related to your progression and
                scores
                you make.</p>

            <p className='pb-2 text-justify'>
                The data we store are 100% anonymous, as we only store a unique account id to save your progressions. From this
                account id, it is not possible to get personal information about you, like your name, or your location.
            </p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>How we use the data we collect</h1>

            <p className='pb-2 text-justify'>The data we store does not contain any personal information about you.</p>

            <p className='pb-2 text-justify'>The anonymous data about scores and progress that we store is used to :</p>

            <ul className='pb-2 text-justify list-disc ml-5'>
                <li className='text-justify'>Save your progress to improve your user experience on our website</li>
                <li className='text-justify'>See how many daily user are using our website to improve, personalize, and expand our website</li>
                <li className='text-justify'>Find and delete inactive accounts</li>
            </ul>


            <h1 className='text-3xl pb-4 pt-4 font-bold'>Log Files</h1>

            <p className='pb-2 text-justify'>Euroguessr follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>Cookies and Web Beacons</h1>

            <p className='pb-2 text-justify'>When you go for the first time on "Euroguessr.com", a unique account id is generated, and will be stored in a
                cookie
                on your browser.</p>

            <p className='pb-2 text-justify'>This cookie do not collect any personal information about you and only store your unique account id, which is
                used to
                save your progress and scores.</p>

            <p className='pb-2 text-justify'>This cookie is essential for the proper operation of the site, and serves as a 100% anonymous unique identifier
                for
                logging in to your account.</p>

            <p className='pb-2 text-justify'>Like any other website, Euroguessr uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>GDPR Data Protection Rights</h1>

            <p className='pb-2 text-justify'>As mentioned above, Euroguessr does not store any personal data about you but only your score data. The GDPR does
                not
                apply to our activities.</p>
            <p>However, if you still wish to delete all your progress data and scores, including your account, you can send an
                e-mail containing your unique account ID to <a className='underline text-blue-500' href="mailto:contact@Euroguessr.com">contact@euroguessr.com</a>,
                and
                we will delete all the data related to your account (scores, attempts...), including you account.</p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>Changes to This Privacy Policy</h1>

            <p className='pb-2 text-justify'>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any
                changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are
                effective immediately, after they are posted on this page.</p>

            <h1 className='text-3xl pb-4 pt-4 font-bold'>Contact Us</h1>

            <p className='pb-2 text-justify'>If you have any questions or suggestions about our website or our Privacy Policy, do not hesitate to contact us
                at <a className='underline text-blue-500' href="mailto:contact@Euroguessr.com">contact@euroguessr.com</a></p>


        </fieldset>
    );
}