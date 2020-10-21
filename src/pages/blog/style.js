export default {
  root: {
    display: 'flex',
    minHeight: 'calc(100vh - 65px - 40px)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card_img: {
    maxWidth: '100%',
    maxHeight: '250px',
  },
  card_container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: '10px',
  },
  button: {
    position: 'fixed',
    bottom: 0,
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },

  talk: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    previous: {
      marginRight: 20,
    },
  },

  description: {
    marginBottom: 20,
  },

  title: {
    textAlign: 'center',
    margin: 0,
    marginBottom: 20,
  },

  content: {
    padding: 20,
  },

  subtitle: {
    marginBottom: 20,
  },

  register: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  login: {
    display: 'flex',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  auth: {
    marginTop: 20,
    button: {
      marginLeft: 5,
      marginRight: 5,
    },
  },
}
