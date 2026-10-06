import { Link } from 'expo-router';
import { Icon } from '../Icon';
import { RouterAnchor } from '../RouterAnchor';
import { accountNotice, authContent, type AuthFormProps } from './content';
import './styles.scss';

const AuthForm = ({ mode }: AuthFormProps) => {
  const copy = authContent[mode];
  const signup = mode === `signup`;

  return (
    <section
      id={`${mode}-page`}
      className={`page-container auth-page`}
      aria-labelledby={`${mode}-title`}
    >
      <div id={`${mode}-heading`} className={`page-heading auth-heading`}>
        <div id={`${mode}-heading-copy`} className={`auth-heading-copy`}>
          <p data-reveal id={`${mode}-eyebrow`} className={`eyebrow`}>{copy.eyebrow}</p>
          <h1 key={mode} data-split-text={`words`} id={`${mode}-title`}>{copy.title}</h1>
          <p data-reveal id={`${mode}-subtitle`}>{copy.subtitle}</p>
        </div>
      </div>
      <div id={`${mode}-card`} className={`auth-card`}>
        <nav data-reveal id={`${mode}-navigation`} className={`auth-navigation`} aria-label={`Account access`}>
          {([`signin`, `signup`] as const).map(option => (
            <Link key={option} href={`/${option}`} asChild>
              <RouterAnchor
                id={`${mode}-tab-${option}`}
                className={`auth-mode-link ${mode === option ? `is-active` : ``}`}
                aria-current={mode === option ? `page` : undefined}
              >
                <Icon name={option === `signin` ? `right` : `add`} />
                {authContent[option].action}
              </RouterAnchor>
            </Link>
          ))}
        </nav>
        <form
          data-reveal={`0.06`}
          id={`${mode}-form`}
          className={`auth-form`}
          aria-describedby={`${mode}-availability`}
          onSubmit={event => event.preventDefault()}
        >
          {signup ? (
            <label id={`${mode}-name-field`} className={`form-field`} htmlFor={`${mode}-name`}>
              <span id={`${mode}-name-label`}>Name</span>
              <input
                id={`${mode}-name`}
                name={`name`}
                type={`text`}
                maxLength={100}
                autoComplete={`name`}
                placeholder={`What should we call you?`}
              />
            </label>
          ) : null}
          <label id={`${mode}-email-field`} className={`form-field`} htmlFor={`${mode}-email`}>
            <span id={`${mode}-email-label`}>Email</span>
            <input
              id={`${mode}-email`}
              name={`email`}
              type={`email`}
              autoComplete={`email`}
              placeholder={`you@example.com`}
            />
          </label>
          <label id={`${mode}-password-field`} className={`form-field`} htmlFor={`${mode}-password`}>
            <span id={`${mode}-password-label`}>Password</span>
            <input
              id={`${mode}-password`}
              name={`password`}
              type={`password`}
              placeholder={signup ? `Choose a password` : `Your password`}
              autoComplete={signup ? `new-password` : `current-password`}
            />
          </label>
          <p id={`${mode}-availability`} className={`auth-availability`}>
            <Icon name={`info`} />
            <span id={`${mode}-availability-text`}>{accountNotice}</span>
          </p>
          <button
            disabled
            type={`submit`}
            id={`${mode}-submit`}
            className={`button button-primary auth-submit`}
            aria-describedby={`${mode}-availability`}
          >
            <Icon name={signup ? `add` : `right`} />
            {copy.action}
          </button>
        </form>
      </div>
      <Link href={`/discover`} asChild>
        <RouterAnchor data-reveal id={`${mode}-browse`} className={`text-link auth-browse`}>
          <Icon name={`grid`} />
          Keep Browsing Memes
        </RouterAnchor>
      </Link>
    </section>
  );
};

export default AuthForm;
