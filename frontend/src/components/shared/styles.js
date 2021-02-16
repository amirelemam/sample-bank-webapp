export const button = {
  color: '#00030e',
  borderColor: '#00030e',
  backgroundColor: '#d4af37',
  border: '1px solid',
  '&:hover': {
    color: '#00030e',
    borderColor: '#00030e',
    backgroundColor: '#b08f26',
    boxShadow: 'none',
  },
};

export const root = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: 'calc(100vh - 90px)',
  justifyContent: 'flex-start',
  bottom: 0,
  padding: '15px',
};

export const link = {
  color: '#fff',
  textDecoration: 'none',
  '&:hover': { color: '#d4af37', textDecoration: 'underline' },
};
