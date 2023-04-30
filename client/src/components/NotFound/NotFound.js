import './NotFound.css';

import twilightText from './images/text.png'

function NotFound() {
  return (
    <div>

      <img src={twilightText} className='twilight-text-image' alt='Decorative 404 page not found text.'/>

      <div className='non-image-content'>

        <p>
          You unlock this page with the key of imagination. It exists within another dimension — a dimension of sight, a dimension of mind. You've entered into the internet of both shadow and substance, of things and ideas. You've just crossed over into...the Twilight Zone.
        </p>

        <b>
          The page you're looking for does not exist in this dimension; perhaps it exists only in your imagination? It cannot be explained how one ends up in the Twilight Zone, but you can find your way back to reality below...
        </b>

        <div className='return-button'>

          <a
            href="https://htfpurdue.org/"
            rel="noopener noreferrer"
          >
            Return to Reality
          </a>

        </div>

        <p className='htf-promo'>Hack the Future is a club at Purdue University that develops software for local non-profits.</p>

        <a
          href="https://htfpurdue.org/"
          rel="noopener noreferrer"
          className='htf-link'
        >
          Learn more about or contact Hack the Future ➚
        </a>

      </div>

    </div>
  );
}

export default NotFound;
