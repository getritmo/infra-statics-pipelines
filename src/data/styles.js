export const customStylesLanguage = {
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? null
      : isSelected
      ? '#FFFFFF'
      : isFocused
      ? '#f0f0f0'
      : null,
    color: isDisabled
      ? null
      : isSelected
      ? '#104E89'
      : isFocused
      ? '#000000'
      : null,
    cursor: 'pointer',
    fontSize: 14,
  }),
  input: (provided) => ({
    ...provided,
    border: 'transparent',
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    '&:hover': { borderColor: 'gray' }, // border style on hover
    borderColor: 'orange',
    cursor: 'pointer',
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '0px solid #ccc',
    color: state.isSelected ? 'black' : '#ccc',
    padding: 0,
    fontFamily: 'Gilroy Semi Bold',
    fontSize: '12px',
    width: '120px',
  }),
}

export const customStylesLanguageHeader = {
  container: (provided) => {
    return {
      ...provided,
      position: 'relative',
    }
  },
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? null
      : isSelected
      ? '#000000'
      : isFocused
      ? '#f0f0f0'
      : null,
    color: isDisabled
      ? null
      : isSelected
      ? '#FFFFFF'
      : isFocused
      ? '#000000'
      : null,
    cursor: 'pointer',
    fontSize: 14,
    display: 'flex',
    '& .desktop': {
      display: 'none',
    },
    '@media only screen and (min-width: 767px)': {
      '& .mobile': {
        display: 'none',
      },
      '& .desktop': {
        display: 'block',
      },
    },
  }),
  input: (provided) => ({
    ...provided,
    border: 'transparent',
    color: 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    '&:hover': { borderColor: 'gray' },
    borderColor: 'orange',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '0px solid #ccc',
    color: state.isSelected ? 'black' : '#ccc',
    padding: 0,
    fontFamily: 'Brown Std SemiBold',
    fontSize: '12px',
    width: '160px',
    height: '40px',
    marginBottom: '10px',
    lineHeight: '40px',
    minHeight: '40px',

    '@media only screen and (max-width: 767px)': {
      ...provided['@media only screen and (max-width: 767px)'],
      maxWidth: '75px',
      height: '53px',
      minHeight: '53px',
      lineHeight: '53px',
      marginBottom: 0,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'black',
    textAlign: 'right',
    width: '100%',
    paddingRight: '20px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: 'white',
    textAlign: 'right',
    height: '50px',
    lineHeight: '50px',
    caretColor: 'transparent',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'black',
    opacity: 0.6,
    transition: 'all 0.4s',
    transform: state.selectProps.menuIsOpen
      ? 'rotate(180deg)'
      : 'rotate(360deg)',

    '&:hover': {
      opacity: 1,
      color: 'black',
    },
    '@media only screen and (max-width: 767px)': {
      ...provided['@media only screen and (max-width: 767px)'],
      display: 'none',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: 'black',

    '@media only screen and (max-width: 767px)': {
      ...provided['@media only screen and (max-width: 767px)'],
      display: 'none',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    paddingRight: '20px',
    textAlign: 'right',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .desktop': {
      display: 'none',
    },
    '@media only screen and (min-width: 767px)': {
      '& .mobile': {
        display: 'none',
      },
      '& .desktop': {
        display: 'block',
      },
    },
  }),
  menu: (provided) => ({
    ...provided,
    animation: 'fadein 0.6s',
  }),
}

export const customStylesLanguageFooter = {
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? null
      : isSelected
      ? '#FFFFFF'
      : isFocused
      ? '#f0f0f0'
      : null,
    color: isDisabled
      ? null
      : isSelected
      ? '#104E89'
      : isFocused
      ? '#000000'
      : null,
    cursor: 'pointer',
    fontSize: 14,
    display: 'flex',
    '& .mobile': {
      display: 'none',
    },
  }),
  input: (provided) => ({
    ...provided,
    border: 'transparent',
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    '&:hover': { borderColor: 'gray' }, // border style on hover
    borderColor: 'orange',
    cursor: 'pointer',
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '0px solid #ccc',
    color: state.isSelected ? 'black' : 'black',
    padding: 0,
    fontFamily: 'Gilroy Semi Bold',
    fontSize: '12px',
    width: '100%',
  }),
  placeholder: (provided) => ({
    ...provided,
    boxShadow: 'none',
    '&:hover': { borderColor: 'gray' }, // border style on hover
    color: 'black',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    '& .mobile': {
      display: 'none',
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'black',
    opacity: 0.6,
    transition: 'all 0.4s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    '&:hover': {
      opacity: 1,
      color: 'white',
    },
  }),
  menu: (provided) => ({
    ...provided,
    animation: 'fadein 0.6s',
  }),
  valueContainer: (provided) => ({
    ...provided,
    caretColor: 'transparent',
  }),
}
