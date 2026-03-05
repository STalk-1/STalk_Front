import { HEADER_ACTION_TEXTS } from '../constants';

function LoginButton() {
  return (
    <button
      type="button"
      className="typo-12-medium md:typo-20-medium lg:typo-20-medium ml-auto rounded-lg bg-green-500 px-5 py-2 text-white"
    >
      {HEADER_ACTION_TEXTS.LOGIN}
    </button>
  );
}

export default LoginButton;
