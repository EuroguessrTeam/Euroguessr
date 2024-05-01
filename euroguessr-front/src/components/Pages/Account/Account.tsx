import { useState } from 'react';
import { APIHelper } from '../../../services/apiHelper';
import { useCopyToClipboard } from "usehooks-ts";


export default function Account() {

  const [, copy] = useCopyToClipboard();
  const [copyClicked, setCopyClicked] = useState<boolean>(false);

  const [accountIdRevealed, setAccountIdRevealed] = useState<boolean>(false);

  const [accountRestored, setAccountRestored] = useState<boolean | undefined>(undefined);

  function toggleAccountIdRevealed() {
    setCopyClicked(false);
    accountIdRevealed ? setAccountIdRevealed(false) : setAccountIdRevealed(true);
  }

  function restoreAccount() {
    const accountId = document.getElementById("restoreAccountInput") as HTMLInputElement
    APIHelper.accountExists(accountId.value).then((exists) => {
      if(exists) {
        APIHelper.setAccountId(accountId.value);
        setAccountRestored(true);
      } else {
        setAccountRestored(false);
      }
    });
  }

  return (
    <div className="overflow-auto h-[89.4vh] ml-4 mr-2">
      <h1>My Account</h1>

      {/* Get account ID */}
      <h2 className="underline">Account ID :</h2>
      <div id="accountId" className="flex">
        {!accountIdRevealed ? "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" : APIHelper.getAccountId()}
        {accountIdRevealed &&
        <button onClick={() => {copy(APIHelper.getAccountId() ?? "") ; setCopyClicked(true)}}>
          {!copyClicked &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
          </svg>
          }
          {copyClicked &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          }
        </button>
        }
      </div>
      <button onClick={toggleAccountIdRevealed} className="bg-blue rounded-xl p-1"> {accountIdRevealed ? "Hide" : "Show"} </button>

      <h2 className="underline">Import account :</h2>
      
      {/* Restore account */}
      <div className="flex">
        <input id="restoreAccountInput"
          className="w-full outline-none focus:ring-0 bg-white rounded-2xl text-black font-roboto"
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
            restoreAccount();
          }
        }}/>
        <button className="bg-blue rounded-xl hover:scale-110 transition ease-in-out duration-200"
              onClick={() => {restoreAccount();}}>
        <div className="w-[4vh] h-[4vh] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z" clipRule="evenodd" />
          </svg>
        </div>
      </button>
      </div>
      {accountRestored === true && <p className="text-green">Account successfully restored !</p>}
      {accountRestored === false && <p className="text-red">Account not found</p>}


      {/* Search button */}
      

    </div>
  )
}
