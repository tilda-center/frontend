const styles = {
  card_container: {
    minHeight: 30,
    display: 'flex'
  },

  button: {
    position: 'fixed',
    bottom: 20,
  },

  image: {
    height: 120,
    width: 120,
    backgroundSize: '100% 100%',
    marginRight: 20,
  },

  grid: {
    padding: 20,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gridGap: 5,
  },

  hanging_element: {
    position: 'fixed',
    bottom: '0px'
  },

  content_edit: {
    width: '90%',
    margin: 'auto',
    display: 'flex'
  },

  editable_title: {
    textAlign: 'center',
    margin: 1
  },

  subtitle: {
    textAlign: 'center',
    color: 'gray',
    margin: 1,
  },

  title: {
    padding: 20,
  }
}


export default styles
