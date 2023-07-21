// import { useState } from 'react';
import scss from './App.module.scss';
// import Loader from '../Loader/Loader';
import { ReactComponent as Logo } from '../../images/base-logo_.svg';

function App() {
  // const [isLoading, setIsLoading] = useState(false);
  console.log('load APP');

  const submit = () => {
    console.log('SUBMIT');
  };
  return (
    <div className={scss.wrapper}>
      <header className={scss.header}>
        <div className={scss.container}>
          <div className={scss.headerWrapper}>
            <Logo className={scss.headerLogo} />
            <button
              type="button"
              onClick={() => {}}
              className={scss.connectButton}
            >
              Connect wallet
            </button>
          </div>
        </div>
      </header>
      <main className={scss.main}>
        <form className={scss.payingForm} onSubmit={submit}>
          <input
            className={scss.input}
            type="text"
            placeholder="Please input accout number"
          />
          <input
            className={scss.input}
            type="text"
            placeholder="Please input amount of coins"
          />
          <button>pay</button>
        </form>
      </main>
      <footer className={scss.footer}>
        <div className={scss.container}>
          <p>{'Copyright © ' + new Date().getFullYear() + '.'}</p>
          <span>
            {'Link to repository: '}
            <a href="https://github.com/BlackyHat/wallet-ethereum-app">
              My Wallet App
            </a>
          </span>
          <p>
            Life is not a destination, it&apos;s a journey, and sometimes you
            have to take the hard road to get where you need to go.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
