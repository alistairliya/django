import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => { // destructuring props 
    const onClick = () =>{
        console.log('Click')
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color='steelBlue' text='New' onClick={onClick} />
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