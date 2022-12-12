import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => { // destructuring props 
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button color='steelBlue' text='New' />
    </header>
  )
}

Header.defaultProps = {
    title : 'My Businesses'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header